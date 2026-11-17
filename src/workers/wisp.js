// Wisp over Cloudflare Workers sockets, used by src/server.js when it runs as a Worker.

const WISP_BUFFER_SIZE = 128;

const WISP_PACKET_CONNECT = 0x01;
const WISP_PACKET_DATA = 0x02;
const WISP_PACKET_CONTINUE = 0x03;
const WISP_PACKET_CLOSE = 0x04;

const WISP_CLOSE_UNKNOWN = 0x01;
const WISP_CLOSE_VOLUNTARY = 0x02;
const WISP_CLOSE_NETWORK = 0x03;
const WISP_CLOSE_INVALID = 0x41;
const WISP_CLOSE_UNREACHABLE = 0x42;

function wispPacket(type, streamId, payload = new Uint8Array()) {
  const out = new Uint8Array(5 + payload.length);
  const view = new DataView(out.buffer);
  out[0] = type;
  view.setUint32(1, streamId, true);
  out.set(payload, 5);
  return out;
}

function wispContinue(streamId, amount) {
  const payload = new Uint8Array(4);
  new DataView(payload.buffer).setUint32(0, amount, true);
  return wispPacket(WISP_PACKET_CONTINUE, streamId, payload);
}

function wispClose(streamId, reason) {
  return wispPacket(WISP_PACKET_CLOSE, streamId, new Uint8Array([reason]));
}

function wispParse(data) {
  const bytes = new Uint8Array(data);
  if (bytes.length < 5) throw new Error("Wisp packet too short");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { type: bytes[0], streamId: view.getUint32(1, true), payload: bytes.slice(5) };
}

export function makeWispServer({ DurableObject, connect, isBlockedHost }) {
  return class WispServer extends DurableObject {
    constructor(ctx, env) {
      super(ctx, env);
      this.streams = new Map();
    }

    async fetch(request) {
      if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
        return new Response("Expected WebSocket", { status: 426, headers: { Upgrade: "websocket" } });
      }

      const [client, server] = Object.values(new WebSocketPair());
      server.accept();
      server.binaryType = "arraybuffer";

      server.addEventListener("message", event => {
        this.handleMessage(server, event.data).catch(error => {
          console.error("Wisp message error:", error);
          try {
            server.close(1011, "Wisp server error");
          } catch {}
        });
      });
      server.addEventListener("close", () => this.closeAllStreams());
      server.addEventListener("error", () => this.closeAllStreams());

      server.send(wispContinue(0, WISP_BUFFER_SIZE));

      return new Response(null, { status: 101, webSocket: client });
    }

    async handleMessage(ws, data) {
      if (typeof data === "string") return;
      const packetData = data instanceof ArrayBuffer ? data : await data.arrayBuffer();
      const p = wispParse(packetData);

      switch (p.type) {
        case WISP_PACKET_CONNECT:
          await this.handleConnect(ws, p);
          break;
        case WISP_PACKET_DATA:
          await this.handleData(ws, p);
          break;
        case WISP_PACKET_CLOSE:
          this.destroyStream(null, p.streamId, WISP_CLOSE_VOLUNTARY);
          break;
        default:
          break;
      }
    }

    async handleConnect(ws, p) {
      if (p.streamId === 0 || this.streams.has(p.streamId) || p.payload.length < 3) {
        ws.send(wispClose(p.streamId, WISP_CLOSE_INVALID));
        return;
      }

      if (p.payload[0] !== 0x01) {
        ws.send(wispClose(p.streamId, WISP_CLOSE_INVALID));
        return;
      }

      const view = new DataView(p.payload.buffer, p.payload.byteOffset, p.payload.byteLength);
      const port = view.getUint16(1, true);
      const hostname = new TextDecoder().decode(p.payload.slice(3));

      if (port < 1 || port > 65535 || !hostname || hostname.length > 253 || isBlockedHost(hostname.toLowerCase())) {
        ws.send(wispClose(p.streamId, WISP_CLOSE_INVALID));
        return;
      }

      let socket;
      try {
        socket = connect({ hostname, port });
      } catch (error) {
        console.error(`Wisp connect failed: ${hostname}:${port}`, error);
        ws.send(wispClose(p.streamId, WISP_CLOSE_UNREACHABLE));
        return;
      }

      const stream = { socket, writer: socket.writable.getWriter(), closed: false, writeChain: Promise.resolve() };
      this.streams.set(p.streamId, stream);

      ws.send(wispContinue(p.streamId, WISP_BUFFER_SIZE));

      this.readFromSocket(ws, p.streamId, stream).catch(error => {
        console.error(`Wisp read failed for ${hostname}:${port}:`, error);
        this.destroyStream(ws, p.streamId, WISP_CLOSE_NETWORK);
      });
    }

    async handleData(ws, p) {
      const stream = this.streams.get(p.streamId);
      if (!stream || stream.closed) {
        ws.send(wispClose(p.streamId, WISP_CLOSE_UNKNOWN));
        return;
      }

      stream.writeChain = stream.writeChain
        .then(() => stream.writer.write(p.payload))
        .then(() => {
          if (!stream.closed && ws.readyState === WebSocket.OPEN) ws.send(wispContinue(p.streamId, 1));
        })
        .catch(error => {
          console.error("Wisp TCP write failed:", error);
          this.destroyStream(ws, p.streamId, WISP_CLOSE_NETWORK);
        });

      await stream.writeChain;
    }

    async readFromSocket(ws, streamId, stream) {
      const reader = stream.socket.readable.getReader();
      try {
        while (!stream.closed) {
          const { value, done } = await reader.read();
          if (done) {
            this.destroyStream(ws, streamId, WISP_CLOSE_NETWORK);
            break;
          }
          if (!value || value.byteLength === 0) continue;
          if (ws.readyState !== WebSocket.OPEN) break;
          ws.send(wispPacket(WISP_PACKET_DATA, streamId, value));
        }
      } finally {
        reader.releaseLock();
      }
    }

    destroyStream(ws, streamId, reason) {
      const stream = this.streams.get(streamId);
      if (!stream) return;

      stream.closed = true;
      this.streams.delete(streamId);
      try {
        stream.writer.close();
      } catch {}
      try {
        stream.socket.close();
      } catch {}
      if (ws && ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(wispClose(streamId, reason));
        } catch {}
      }
    }

    closeAllStreams() {
      for (const [streamId, stream] of this.streams) {
        stream.closed = true;
        try {
          stream.writer.close();
        } catch {}
        try {
          stream.socket.close();
        } catch {}
        this.streams.delete(streamId);
      }
    }
  };
}
