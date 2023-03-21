import createBareServer from '@tomphttp/bare-server-node';
import { fileURLToPath } from "url";
import { createServer as createHttpsServer } from "node:https";
import { createServer as createHttpServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { hostname } from "node:os";
import serveStatic from "serve-static";

// The following message MAY NOT be removed
console.log("Interstellar\nThis program comes with ABSOLUTELY NO WARRANTY.\nThis is free software, and you are welcome to redistribute it\nunder the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nYou should have received a copy of the GNU General Public License\nalong with this program. If not, see <https://www.gnu.org/licenses/>.\n");

const bare = createBareServer("/bare/");
const serve = serveStatic(fileURLToPath(new URL("../public/", import.meta.url)), { fallthrough: false });
var server, PORT = process.env.PORT;
const ssl = existsSync("../ssl/key.pem") && existsSync("../ssl/cert.pem");
if(ssl) {
  server = createHttpsServer({
    key: readFileSync("../ssl/key.pem"),
    cert: readFileSync("../ssl/cert.pem")
  });
  PORT = (PORT || 443);
} else { server = createHttpServer(); PORT = (PORT || 8080);}

server.on("request", (req, res) => {
  if(bare.shouldRoute(req)) return bare.routeRequest(req, res);
    serve(req, res, (err) => {
      res.writeHead(err?.statusCode || 500, null, {
        "Content-Type": "text/plain",
      });
      res.end('Error')
    })
});

server.on("upgrade", (req, socket, head) => {
  if(bare.shouldRoute(req, socket, head)) bare.routeUpgrade(req, socket, head); else socket.end();
});

server.on('listening', () => {
  const addr = server.address();

  console.log(`Server running on port ${addr.port}`)
  console.log('');
  console.log('You can now view it in your browser.')
  /* Code for listing IPS from website-aio */
  console.log(`Local: ${ssl ? 'https' : 'http'}://${addr.family === 'IPv6' ? `[${addr.address}]` : addr.address}${(addr.port === 80 || ssl && addr.port === 443)? '' : ':' + addr.port}`);
  console.log(`Local: ${ssl ? 'https' : 'http'}://localhost${(addr.port === 80 || ssl && addr.port === 443)? '' : ':' + addr.port}`);
  try { console.log(`On Your Network: ${ssl ? 'https' : 'http'}://${hostname()}${(addr.port === 80 || ssl && addr.port === 443)? '' : ':' + addr.port}`); } catch (err) {/* Can't find LAN interface */};
  if(process.env.REPL_SLUG && process.env.REPL_OWNER) console.log(`Replit: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});

server.listen({ port: PORT })