import { randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;
const MESSAGE_LIMIT = 100;
const MAX_MESSAGES = 500;
const MAX_MESSAGE_LENGTH = 500;
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,20}$/;
const CHANNELS = [
  { id: "general", name: "general", description: "The main community room" },
  { id: "games", name: "games", description: "Talk games and share recommendations" },
  { id: "help", name: "help", description: "Ask questions and help each other" },
];
const REACTIONS = new Set(["👍", "❤️", "😂", "🎮", "👀", "✨"]);
const PRESENCE_MS = 45_000;

async function hashPassword(password, salt) {
  return scrypt(password, salt, 64);
}

async function loadStore(filePath) {
  try {
    const stored = JSON.parse(await readFile(filePath, "utf8"));
    if (!Array.isArray(stored.users) || !Array.isArray(stored.messages)) {
      throw new Error("Chat store must contain users and messages arrays.");
    }
    for (const message of stored.messages) {
      message.channel ??= "general";
      message.reactions ??= {};
    }
    for (const user of stored.users) {
      user.profile ??= { displayName: user.username, bio: "", color: "#5899e4" };
    }
    return stored;
  } catch (error) {
    if (error.code === "ENOENT") return { users: [], messages: [] };
    throw error;
  }
}

export async function mountChat(app, dataDirectory) {
  const directory = path.resolve(dataDirectory);
  const filePath = path.join(directory, "chat.json");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const store = await loadStore(filePath);
  const sessions = new Map();
  const authAttempts = new Map();
  const lastMessageByUser = new Map();
  const presence = new Map();
  let writes = Promise.resolve();

  app.use("/api/chat", (_req, res, next) => {
    res.set("Cache-Control", "no-store").set("X-Content-Type-Options", "nosniff");
    next();
  });

  function saveStore() {
    writes = writes.then(async () => {
      const temporaryPath = `${filePath}.${randomBytes(6).toString("hex")}.tmp`;
      await writeFile(temporaryPath, JSON.stringify(store), { mode: 0o600 });
      await rename(temporaryPath, filePath);
    });
    return writes;
  }

  function authenticatedUser(req, res) {
    const token = req.cookies?.sklite_chat_session;
    const session = token && sessions.get(token);
    if (!session || session.expiresAt <= Date.now()) {
      if (token) sessions.delete(token);
      res.clearCookie("sklite_chat_session", { path: "/api/chat", sameSite: "strict", httpOnly: true });
      res.status(401).json({ error: "Please sign in to chat." });
      return null;
    }
    return store.users.find(user => user.username === session.username) ?? null;
  }

  function checkAuthLimit(req, res) {
    const ip = req.socket.remoteAddress ?? "unknown";
    const now = Date.now();
    const attempt = authAttempts.get(ip);
    if (attempt && attempt.expiresAt > now && attempt.count >= 10) {
      res.status(429).json({ error: "Too many attempts. Please try again later." });
      return false;
    }
    if (!attempt || attempt.expiresAt <= now) authAttempts.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    else attempt.count += 1;
    return true;
  }

  function clearAuthLimit(req) {
    authAttempts.delete(req.socket.remoteAddress ?? "unknown");
  }

  function setSession(res, req, username) {
    const token = randomBytes(32).toString("hex");
    sessions.set(token, { username, expiresAt: Date.now() + SESSION_MS });
    res.cookie("sklite_chat_session", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: req.secure || req.get("x-forwarded-proto") === "https",
      maxAge: SESSION_MS,
      path: "/api/chat",
    });
  }

  function sessionUsername(req, res) {
    const user = authenticatedUser(req, res);
    if (!user) return null;
    presence.set(user.username, Date.now());
    return user.username;
  }

  function getChannel(value) {
    const channel = CHANNELS.find(item => item.id === value);
    return channel ?? null;
  }

  function publicUser(username) {
    const user = store.users.find(candidate => candidate.username === username);
    return {
      username,
      profile: user?.profile ?? { displayName: username, bio: "", color: "#5899e4" },
    };
  }

  app.post("/api/chat/register", async (req, res, next) => {
    try {
      if (!checkAuthLimit(req, res)) return;
      const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
      const password = typeof req.body?.password === "string" ? req.body.password : "";
      if (!USERNAME_PATTERN.test(username)) {
        return res.status(400).json({ error: "Username must be 3-20 characters using letters, numbers, _ or -." });
      }
      if (password.length < 8 || password.length > 128) {
        return res.status(400).json({ error: "Password must be between 8 and 128 characters." });
      }
      const normalized = username.toLowerCase();
      if (store.users.some(user => user.username === normalized)) {
        return res.status(409).json({ error: "That username is already taken." });
      }
      const salt = randomBytes(16).toString("hex");
      const passwordHash = (await hashPassword(password, salt)).toString("hex");
      if (store.users.some(user => user.username === normalized)) {
        return res.status(409).json({ error: "That username is already taken." });
      }
      store.users.push({ username: normalized, salt, passwordHash });
      await saveStore();
      clearAuthLimit(req);
      presence.set(normalized, Date.now());
      setSession(res, req, normalized);
      return res.status(201).json({ username: normalized, profile: store.users.at(-1).profile });
    } catch (error) {
      return next(error);
    }
  });

  app.post("/api/chat/login", async (req, res, next) => {
    try {
      if (!checkAuthLimit(req, res)) return;
      const username = typeof req.body?.username === "string" ? req.body.username.trim().toLowerCase() : "";
      const password = typeof req.body?.password === "string" ? req.body.password : "";
      const user = store.users.find(candidate => candidate.username === username);
      if (!user || password.length > 128) return res.status(401).json({ error: "Username or password is incorrect." });
      const passwordHash = await hashPassword(password, user.salt);
      if (!timingSafeEqual(passwordHash, Buffer.from(user.passwordHash, "hex"))) {
        return res.status(401).json({ error: "Username or password is incorrect." });
      }
      clearAuthLimit(req);
      presence.set(user.username, Date.now());
      setSession(res, req, user.username);
      return res.json({ username: user.username, profile: user.profile });
    } catch (error) {
      return next(error);
    }
  });

  app.get("/api/chat/session", (req, res) => {
    const username = sessionUsername(req, res);
    if (username) res.json(publicUser(username));
  });

  app.get("/api/chat/channels", (req, res) => {
    if (!sessionUsername(req, res)) return;
    res.json(CHANNELS);
  });

  app.get("/api/chat/presence", (req, res) => {
    if (!sessionUsername(req, res)) return;
    const now = Date.now();
    for (const [username, seenAt] of presence) {
      if (now - seenAt > PRESENCE_MS) presence.delete(username);
    }
    res.json([...presence.keys()].sort((a, b) => a.localeCompare(b)).map(publicUser));
  });

  app.put("/api/chat/profile", async (req, res, next) => {
    try {
      const username = sessionUsername(req, res);
      if (!username) return;
      const displayName = typeof req.body?.displayName === "string" ? req.body.displayName.trim() : "";
      const bio = typeof req.body?.bio === "string" ? req.body.bio.trim() : "";
      const color = typeof req.body?.color === "string" ? req.body.color : "";
      if (displayName.length < 1 || displayName.length > 24) {
        return res.status(400).json({ error: "Display name must be 1-24 characters." });
      }
      if (bio.length > 100) return res.status(400).json({ error: "Bio must be 100 characters or fewer." });
      if (!/^#[0-9a-f]{6}$/i.test(color)) return res.status(400).json({ error: "Choose a valid profile color." });
      const user = store.users.find(candidate => candidate.username === username);
      user.profile = { displayName, bio, color };
      await saveStore();
      return res.json(publicUser(username));
    } catch (error) {
      return next(error);
    }
  });

  app.post("/api/chat/logout", (req, res) => {
    const token = req.cookies?.sklite_chat_session;
    if (token) {
      const session = sessions.get(token);
      if (session) presence.delete(session.username);
      sessions.delete(token);
    }
    res.clearCookie("sklite_chat_session", { path: "/api/chat", sameSite: "strict", httpOnly: true });
    res.sendStatus(204);
  });

  app.get("/api/chat/messages", (req, res) => {
    if (!sessionUsername(req, res)) return;
    const channel = getChannel(typeof req.query.channel === "string" ? req.query.channel : "general");
    if (!channel) return res.status(400).json({ error: "Unknown chat room." });
    const query = typeof req.query.q === "string" ? req.query.q.trim().slice(0, 100).toLowerCase() : "";
    const messages = store.messages.filter(message => message.channel === channel.id);
    const filtered = query ? messages.filter(message => message.text.toLowerCase().includes(query) || message.username.includes(query)) : messages;
    return res.json(filtered.slice(-MESSAGE_LIMIT).map(message => ({ ...message, author: publicUser(message.username) })));
  });

  app.post("/api/chat/messages", async (req, res, next) => {
    try {
      const username = sessionUsername(req, res);
      if (!username) return;
      const channel = getChannel(typeof req.body?.channel === "string" ? req.body.channel : "general");
      if (!channel) return res.status(400).json({ error: "Unknown chat room." });
      const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
      if (!text || text.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({ error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` });
      }
      const now = Date.now();
      const replyTo = typeof req.body?.replyTo === "string" ? req.body.replyTo : null;
      const parent = replyTo ? store.messages.find(message => message.id === replyTo && message.channel === channel.id) : null;
      if (replyTo && !parent) return res.status(400).json({ error: "The message you are replying to could not be found." });
      const lastMessage = lastMessageByUser.get(username) ?? 0;
      if (now - lastMessage < 1000) return res.status(429).json({ error: "Please wait a moment before sending another message." });
      lastMessageByUser.set(username, now);
      const message = { id: randomUUID(), username, text, channel: channel.id, replyTo, reactions: {}, createdAt: now, editedAt: null };
      store.messages.push(message);
      if (store.messages.length > MAX_MESSAGES) store.messages.splice(0, store.messages.length - MAX_MESSAGES);
      await saveStore();
      return res.status(201).json(message);
    } catch (error) {
      return next(error);
    }
  });

  app.patch("/api/chat/messages/:id", async (req, res, next) => {
    try {
      const username = sessionUsername(req, res);
      if (!username) return;
      const message = store.messages.find(item => item.id === req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found." });
      if (message.username !== username) return res.status(403).json({ error: "You can only edit your own messages." });
      const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
      if (!text || text.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({ error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` });
      }
      message.text = text;
      message.editedAt = Date.now();
      await saveStore();
      return res.json({ ...message, author: publicUser(username) });
    } catch (error) {
      return next(error);
    }
  });

  app.delete("/api/chat/messages/:id", async (req, res, next) => {
    try {
      const username = sessionUsername(req, res);
      if (!username) return;
      const index = store.messages.findIndex(item => item.id === req.params.id);
      if (index < 0) return res.status(404).json({ error: "Message not found." });
      if (store.messages[index].username !== username) return res.status(403).json({ error: "You can only delete your own messages." });
      const [deleted] = store.messages.splice(index, 1);
      for (const message of store.messages) {
        if (message.replyTo === deleted.id) message.replyTo = null;
      }
      await saveStore();
      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  });

  app.put("/api/chat/messages/:id/reactions", async (req, res, next) => {
    try {
      const username = sessionUsername(req, res);
      if (!username) return;
      const message = store.messages.find(item => item.id === req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found." });
      const emoji = typeof req.body?.emoji === "string" ? req.body.emoji : "";
      if (!REACTIONS.has(emoji)) return res.status(400).json({ error: "That reaction is not available." });
      message.reactions ??= {};
      const users = new Set(message.reactions[emoji] ?? []);
      if (users.has(username)) users.delete(username);
      else users.add(username);
      if (users.size) message.reactions[emoji] = [...users];
      else delete message.reactions[emoji];
      await saveStore();
      return res.json({ ...message, author: publicUser(message.username) });
    } catch (error) {
      return next(error);
    }
  });

  console.log("Community chat accounts, profiles, and messages are stored in data/chat.json.");
}
