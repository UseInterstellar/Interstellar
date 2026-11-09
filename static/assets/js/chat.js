const authPanel = document.getElementById("chat-auth");
const chatRoom = document.getElementById("chat-room");
const profilePanel = document.getElementById("profile-panel");
const authForm = document.getElementById("auth-form");
const authStatus = document.getElementById("auth-status");
const roomStatus = document.getElementById("room-status");
const authToggle = document.getElementById("auth-toggle");
const authTitle = document.getElementById("auth-title");
const authDescription = document.getElementById("auth-description");
const authSubmit = document.getElementById("auth-submit");
const messageList = document.getElementById("chat-messages");
const searchInput = document.getElementById("chat-search");
const CHANNELS = ["general", "games", "help"];
const REACTIONS = ["👍", "❤️", "😂", "🎮", "👀", "✨"];
let registering = false;
let activeChannel = "general";
let currentUser = null;
let channels = [];
const messagesByChannel = new Map();
let replyTo = null;
let refreshTimer;
let presenceTimer;
let searchTimer;
const unread = readUnread();
const unreadCounts = {};
const lastNotified = {};
let originalTitle = document.title;

function readUnread() {
  try {
    return JSON.parse(localStorage.getItem("sklite-chat-unread") || "{}");
  } catch {
    return {};
  }
}

function saveUnread() {
  try {
    localStorage.setItem("sklite-chat-unread", JSON.stringify(unread));
  } catch {}
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (response.status === 204) return null;
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "The request could not be completed.");
  return body;
}

function showAuth(message = "", isError = false) {
  clearTimeout(refreshTimer);
  clearTimeout(presenceTimer);
  chatRoom.hidden = true;
  profilePanel.hidden = true;
  authPanel.hidden = false;
  authStatus.textContent = message;
  authStatus.dataset.error = String(isError);
}

function showRoom(user) {
  currentUser = user;
  const firstSeenAt = Date.now() - 1;
  for (const channel of CHANNELS) {
    if (!Object.hasOwn(unread, channel)) unread[channel] = firstSeenAt;
  }
  saveUnread();
  authPanel.hidden = true;
  chatRoom.hidden = false;
  profilePanel.hidden = true;
  document.getElementById("chat-current-user").textContent = user.profile?.displayName || user.username;
  document.getElementById("account-avatar").textContent = initials(user.profile?.displayName || user.username);
  document.getElementById("account-avatar").style.backgroundColor = user.profile?.color || "#5899e4";
  loadChannels()
    .then(() => switchChannel(activeChannel))
    .catch(showRoomError);
  loadPresence();
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase();
}

function escapeHtml(text) {
  const element = document.createElement("span");
  element.textContent = text;
  return element.innerHTML;
}

function showRoomError(error) {
  roomStatus.textContent = error.message;
  roomStatus.dataset.error = "true";
}

async function loadChannels() {
  channels = await request("/api/chat/channels");
  const navigation = document.getElementById("chat-channels");
  navigation.replaceChildren();
  for (const channel of channels) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "channel-button";
    button.dataset.channel = channel.id;
    button.innerHTML = `<span class="channel-name"><span aria-hidden="true">#</span>${escapeHtml(channel.name)}</span><span class="channel-unread" aria-label="unread messages"></span>`;
    button.title = channel.description;
    button.addEventListener("click", () => switchChannel(channel.id));
    navigation.append(button);
  }
  updateUnreadBadges();
}

function switchChannel(channel) {
  if (!CHANNELS.includes(channel)) return;
  activeChannel = channel;
  document.querySelectorAll(".channel-button").forEach(button => {
    button.classList.toggle("active", button.dataset.channel === channel);
  });
  const details = channels.find(item => item.id === channel);
  document.getElementById("active-channel-title").textContent = details?.name ?? channel;
  document.getElementById("active-channel-description").textContent = details?.description ?? "";
  document.getElementById("chat-message").placeholder = `Message #${details?.name ?? channel}`;
  document.getElementById("chat-search").value = "";
  document.getElementById("chat-search-note").hidden = true;
  replyTo = null;
  updateReplyPreview();
  renderMessages(messagesByChannel.get(channel) ?? []);
  loadMessages();
}

function updateUnreadBadges() {
  let totalUnread = 0;
  for (const button of document.querySelectorAll(".channel-button")) {
    const isVisibleActiveChannel = activeChannel === button.dataset.channel && !document.hidden;
    const count = isVisibleActiveChannel ? 0 : Number(unreadCounts[button.dataset.channel] || 0);
    const badge = button.querySelector(".channel-unread");
    badge.textContent = count > 99 ? "99+" : count ? String(count) : "";
    badge.hidden = count === 0;
    totalUnread += count;
  }
  document.title = totalUnread ? `(${totalUnread}) ${originalTitle}` : originalTitle;
  if (totalUnread) {
    document.title = `(${totalUnread}) Community chat · Sklite`;
  }
}

function markRead(channel, messages) {
  if (channel !== activeChannel) return;
  const lastMessage = messages.at(-1);
  if (lastMessage) unread[channel] = lastMessage.createdAt;
  else unread[channel] = 0;
  saveUnread();
  updateUnreadBadges();
}

function updateUnread(channel, messages) {
  const latest = messages.at(-1);
  if (!latest) return;
  const seenAt = Number(unread[channel] || 0);
  const newMessages = messages.filter(message => message.createdAt > seenAt && message.username !== currentUser.username);
  const count = newMessages.length;
  if (channel === activeChannel && !document.hidden) {
    markRead(channel, messages);
    return;
  }
  unreadCounts[channel] = count;
  updateUnreadBadges();
  const newestUnread = newMessages.at(-1);
  if (newestUnread && document.hidden && "Notification" in window && Notification.permission === "granted" && lastNotified[channel] !== newestUnread.id) {
    const description = channels.find(item => item.id === channel)?.name || channel;
    new Notification(`#${description} · ${newestUnread.username}`, { body: newestUnread.text, tag: `sklite-chat-${channel}` });
    lastNotified[channel] = newestUnread.id;
  }
}

function renderMessages(messages) {
  const shouldScroll = messageList.scrollHeight - messageList.scrollTop - messageList.clientHeight < 100;
  const previous = messagesByChannel.get(activeChannel) ?? [];
  messagesByChannel.set(activeChannel, messages);
  const fragment = document.createDocumentFragment();
  for (const message of messages) {
    const item = document.createElement("li");
    item.className = `chat-message${message.username === currentUser.username ? " own-message" : ""}`;
    item.dataset.messageId = message.id;
    const author = message.author ?? { username: message.username, profile: { displayName: message.username, color: "#5899e4", bio: "" } };
    const head = document.createElement("div");
    head.className = "message-heading";
    const avatar = document.createElement("span");
    avatar.className = "message-avatar";
    avatar.textContent = initials(author.profile.displayName || author.username);
    avatar.style.backgroundColor = author.profile.color;
    const meta = document.createElement("div");
    meta.className = "message-meta";
    const displayName = document.createElement("strong");
    displayName.textContent = author.profile.displayName || author.username;
    displayName.title = `@${author.username}${author.profile.bio ? ` · ${author.profile.bio}` : ""}`;
    const time = document.createElement("time");
    time.dateTime = new Date(message.createdAt).toISOString();
    time.textContent = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    meta.append(displayName, time);
    head.append(avatar, meta);

    const body = document.createElement("div");
    body.className = "message-body";
    if (message.replyTo) {
      const parent = previous.find(candidate => candidate.id === message.replyTo);
      if (parent) {
        const reply = document.createElement("button");
        reply.type = "button";
        reply.className = "message-reply-context";
        reply.textContent = `↳ @${parent.username}: ${parent.text}`;
        reply.addEventListener("click", () => document.querySelector(`[data-message-id="${CSS.escape(parent.id)}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
        body.append(reply);
      }
    }
    const text = document.createElement("p");
    text.className = "chat-message-text";
    text.textContent = message.text;
    body.append(text);
    if (message.editedAt) {
      const edited = document.createElement("span");
      edited.className = "edited-label";
      edited.textContent = "edited";
      body.append(edited);
    }
    const actions = document.createElement("div");
    actions.className = "message-actions";
    for (const emoji of REACTIONS) {
      const users = message.reactions?.[emoji] ?? [];
      const reaction = document.createElement("button");
      reaction.type = "button";
      reaction.className = `reaction-button${users.includes(currentUser.username) ? " reacted" : ""}`;
      reaction.textContent = users.length ? `${emoji} ${users.length}` : emoji;
      reaction.title = users.length ? users.map(user => `@${user}`).join(", ") : `React ${emoji}`;
      reaction.addEventListener("click", () => toggleReaction(message.id, emoji));
      actions.append(reaction);
    }
    const replyButton = actionButton("↩", "Reply", () => setReply(message));
    actions.append(replyButton);
    if (message.username === currentUser.username) {
      actions.append(actionButton("Edit", "Edit message", () => editMessage(message)));
      actions.append(actionButton("Delete", "Delete message", () => deleteMessage(message)));
    }
    item.append(head, body, actions);
    fragment.append(item);
  }
  messageList.replaceChildren(fragment);
  if (shouldScroll) messageList.scrollTop = messageList.scrollHeight;
}

function actionButton(label, title, action) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "message-action";
  button.textContent = label;
  button.title = title;
  button.addEventListener("click", action);
  return button;
}

function setReply(message) {
  replyTo = message;
  updateReplyPreview();
  document.getElementById("chat-message").focus();
}

function updateReplyPreview() {
  const preview = document.getElementById("reply-preview");
  preview.hidden = !replyTo;
  if (replyTo) preview.querySelector("span").textContent = `Replying to @${replyTo.username}: ${replyTo.text}`;
}

async function loadMessages() {
  clearTimeout(refreshTimer);
  if (!currentUser || chatRoom.hidden) return;
  const query = document.hidden ? "" : searchInput.value.trim();
  try {
    const messages = await request(`/api/chat/messages?channel=${encodeURIComponent(activeChannel)}${query ? `&q=${encodeURIComponent(query)}` : ""}`);
    const wasActive = document.activeElement === messageList || messageList.contains(document.activeElement);
    renderMessages(messages);
    messagesByChannel.set(activeChannel, messages);
    if (!query) updateUnread(activeChannel, messages);
    loadOtherChannels();
    const note = document.getElementById("chat-search-note");
    note.hidden = !query;
    note.textContent = query ? `${messages.length} result${messages.length === 1 ? "" : "s"} for “${query}”` : "";
    roomStatus.textContent = "";
    if (wasActive) messageList.focus();
  } catch (error) {
    if (error.message === "Please sign in to chat.") {
      showAuth("Your session expired. Please sign in again.", true);
      return;
    }
    showRoomError(error);
  } finally {
    if (currentUser && !chatRoom.hidden) refreshTimer = setTimeout(loadMessages, query ? 7000 : 3000);
  }
}

async function loadOtherChannels() {
  for (const channel of CHANNELS) {
    if (channel === activeChannel) continue;
    try {
      const messages = await request(`/api/chat/messages?channel=${channel}`);
      messagesByChannel.set(channel, messages);
      updateUnread(channel, messages);
    } catch (error) {
      if (error.message === "Please sign in to chat.") showAuth("Your session expired. Please sign in again.", true);
      else showRoomError(error);
    }
  }
}

function loadPresence() {
  clearTimeout(presenceTimer);
  if (!currentUser || chatRoom.hidden) return;
  request("/api/chat/presence")
    .then(users => {
      const list = document.getElementById("online-members");
      list.replaceChildren();
      for (const user of users) {
        const item = document.createElement("li");
        const avatar = document.createElement("span");
        avatar.className = "member-avatar";
        avatar.textContent = initials(user.profile?.displayName || user.username);
        avatar.style.backgroundColor = user.profile?.color || "#5899e4";
        const name = document.createElement("span");
        name.textContent = user.profile?.displayName || user.username;
        name.title = `${user.profile?.bio || `@${user.username}`}`;
        item.append(avatar, name);
        list.append(item);
      }
      document.getElementById("online-count").textContent = String(users.length);
      if (!chatRoom.hidden) presenceTimer = setTimeout(loadPresence, 15000);
    })
    .catch(error => {
      showRoomError(error);
      presenceTimer = setTimeout(loadPresence, 15000);
    });
}

async function toggleReaction(messageId, emoji) {
  try {
    await request(`/api/chat/messages/${encodeURIComponent(messageId)}/reactions`, {
      method: "PUT",
      body: JSON.stringify({ emoji }),
    });
    await loadMessages();
  } catch (error) {
    showRoomError(error);
  }
}

async function editMessage(message) {
  const text = prompt("Edit your message:", message.text);
  if (text === null || text.trim() === message.text) return;
  try {
    await request(`/api/chat/messages/${encodeURIComponent(message.id)}`, {
      method: "PATCH",
      body: JSON.stringify({ text }),
    });
    await loadMessages();
  } catch (error) {
    showRoomError(error);
  }
}

async function deleteMessage(message) {
  if (!confirm("Delete this message?")) return;
  try {
    await request(`/api/chat/messages/${encodeURIComponent(message.id)}`, { method: "DELETE" });
    await loadMessages();
  } catch (error) {
    showRoomError(error);
  }
}

authToggle.addEventListener("click", () => {
  registering = !registering;
  authTitle.textContent = registering ? "Create an account" : "Sign in to chat";
  authDescription.textContent = registering ? "Choose a username and a password with at least 8 characters." : "Use your account or create one to join the conversation.";
  authSubmit.textContent = registering ? "Create account" : "Sign in";
  authToggle.textContent = registering ? "Already have an account? Sign in" : "Create an account";
  document.getElementById("chat-password").autocomplete = registering ? "new-password" : "current-password";
  authStatus.textContent = "";
});

authForm.addEventListener("submit", async event => {
  event.preventDefault();
  const form = new FormData(authForm);
  authSubmit.disabled = true;
  authStatus.textContent = "";
  authStatus.dataset.error = "false";
  try {
    const result = await request(registering ? "/api/chat/register" : "/api/chat/login", {
      method: "POST",
      body: JSON.stringify({ username: form.get("username"), password: form.get("password") }),
    });
    authForm.reset();
    showRoom(result);
  } catch (error) {
    authStatus.textContent = error.message;
    authStatus.dataset.error = "true";
  } finally {
    authSubmit.disabled = false;
  }
});

document.getElementById("chat-message-form").addEventListener("submit", async event => {
  event.preventDefault();
  const input = document.getElementById("chat-message");
  const sendButton = event.currentTarget.querySelector("button[type=submit]");
  const text = input.value.trim();
  if (!text) return;
  sendButton.disabled = true;
  roomStatus.textContent = "";
  roomStatus.dataset.error = "false";
  try {
    await request("/api/chat/messages", {
      method: "POST",
      body: JSON.stringify({ text, channel: activeChannel, replyTo: replyTo?.id ?? null }),
    });
    input.value = "";
    input.style.height = "auto";
    replyTo = null;
    updateReplyPreview();
    await loadMessages();
    await loadOtherChannels();
  } catch (error) {
    showRoomError(error);
  } finally {
    sendButton.disabled = false;
    input.focus();
  }
});

document.getElementById("chat-message").addEventListener("input", event => {
  const input = event.currentTarget;
  document.getElementById("message-length").textContent = `${input.value.length} / 500`;
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
});

document.getElementById("chat-message").addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    event.currentTarget.form.requestSubmit();
  }
});

document.getElementById("reply-cancel").addEventListener("click", () => {
  replyTo = null;
  updateReplyPreview();
});

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadMessages, 250);
});

searchInput.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    searchInput.value = "";
    loadMessages();
    searchInput.blur();
  }
});

document.getElementById("chat-logout").addEventListener("click", async () => {
  try {
    await request("/api/chat/logout", { method: "POST" });
    currentUser = null;
    showAuth("You are signed out.");
  } catch (error) {
    showRoomError(error);
  }
});

document.getElementById("notify-toggle").addEventListener("click", async event => {
  if (!("Notification" in window)) {
    roomStatus.textContent = "This browser does not support desktop notifications.";
    roomStatus.dataset.error = "true";
    return;
  }
  const permission = await Notification.requestPermission();
  const button = event.currentTarget;
  if (permission === "granted") {
    button.querySelector("span").textContent = "Alerts enabled";
    button.classList.add("notifications-enabled");
  } else {
    roomStatus.textContent = permission === "denied" ? "Notifications are blocked in your browser settings." : "Notification permission was not granted.";
    roomStatus.dataset.error = "true";
  }
});

document.getElementById("profile-open").addEventListener("click", () => {
  document.getElementById("profile-display-name").value = currentUser.profile?.displayName || currentUser.username;
  document.getElementById("profile-bio").value = currentUser.profile?.bio || "";
  document.getElementById("profile-color").value = currentUser.profile?.color || "#5899e4";
  chatRoom.hidden = true;
  profilePanel.hidden = false;
});

function closeProfile() {
  profilePanel.hidden = true;
  chatRoom.hidden = false;
}

document.getElementById("profile-close").addEventListener("click", closeProfile);

document.getElementById("profile-form").addEventListener("submit", async event => {
  event.preventDefault();
  const status = document.getElementById("profile-status");
  const button = event.currentTarget.querySelector("button[type=submit]");
  button.disabled = true;
  try {
    currentUser = await request("/api/chat/profile", {
      method: "PUT",
      body: JSON.stringify({
        displayName: document.getElementById("profile-display-name").value,
        bio: document.getElementById("profile-bio").value,
        color: document.getElementById("profile-color").value,
      }),
    });
    closeProfile();
    showRoom(currentUser);
  } catch (error) {
    status.textContent = error.message;
    status.dataset.error = "true";
  } finally {
    button.disabled = false;
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearTimeout(presenceTimer);
    return;
  }
  if (currentUser) {
    originalTitle = "Community chat · Sklite";
    loadMessages();
    loadPresence();
    loadOtherChannels();
  }
});

request("/api/chat/session")
  .then(user => showRoom(user))
  .catch(() => showAuth());
