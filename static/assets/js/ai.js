const form = document.getElementById("ai-form");
const input = document.getElementById("ai-input");
const messageList = document.getElementById("ai-messages");
const status = document.getElementById("ai-status");
const sendButton = document.getElementById("ai-send");
const nameInput = document.getElementById("ai-name");
const instructionsInput = document.getElementById("ai-instructions");
const teachForm = document.getElementById("ai-teach-form");
const lessonsList = document.getElementById("ai-lessons");
const messages = [];
const BRAIN_KEY = "sklite-local-ai-brain-v1";
const MAX_LESSONS = 20;

function createDefaultBrain() {
  return { name: "Sklite AI", instructions: "", lessons: [] };
}

function loadBrain() {
  const saved = localStorage.getItem(BRAIN_KEY);
  if (!saved) return createDefaultBrain();
  const brain = JSON.parse(saved);
  if (!brain || typeof brain !== "object" || typeof brain.name !== "string" || typeof brain.instructions !== "string" || !Array.isArray(brain.lessons) || brain.lessons.some(lesson => typeof lesson?.question !== "string" || typeof lesson?.answer !== "string")) {
    throw new Error("Saved AI preferences are not valid. Clear this browser's saved site data to reset them.");
  }
  return {
    name: brain.name.slice(0, 40),
    instructions: brain.instructions.slice(0, 1000),
    lessons: brain.lessons.slice(0, MAX_LESSONS).map(lesson => ({
      question: lesson.question.slice(0, 180),
      answer: lesson.answer.slice(0, 600),
    })),
  };
}

let brain;
try {
  brain = loadBrain();
} catch (error) {
  brain = createDefaultBrain();
  setStatus(error.message, true);
}

function saveBrain() {
  try {
    localStorage.setItem(BRAIN_KEY, JSON.stringify(brain));
    return true;
  } catch (error) {
    console.error("Could not save AI preferences in this browser.", error);
    setStatus("Could not save preferences in this browser. Check available storage.", true);
    return false;
  }
}

function updateBrainLabels() {
  const name = brain.name.trim() || "Your AI";
  document.getElementById("ai-title").textContent = name;
  document.querySelectorAll(".ai-speaker").forEach(element => {
    element.textContent = name;
  });
}

function renderLessons() {
  lessonsList.replaceChildren();
  brain.lessons.forEach((lesson, index) => {
    const item = document.createElement("li");
    const copy = document.createElement("span");
    copy.textContent = `${lesson.question} → ${lesson.answer}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove learned example ${index + 1}`);
    remove.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    remove.addEventListener("click", () => {
      const [removed] = brain.lessons.splice(index, 1);
      if (!saveBrain()) brain.lessons.splice(index, 0, removed);
      renderLessons();
    });
    item.append(copy, remove);
    lessonsList.append(item);
  });
}

nameInput.value = brain.name;
instructionsInput.value = brain.instructions;
updateBrainLabels();
renderLessons();

nameInput.addEventListener("input", () => {
  brain.name = nameInput.value.slice(0, 40);
  updateBrainLabels();
  saveBrain();
});

instructionsInput.addEventListener("input", () => {
  brain.instructions = instructionsInput.value.slice(0, 1000);
  saveBrain();
});

teachForm.addEventListener("submit", event => {
  event.preventDefault();
  const question = document.getElementById("ai-teach-question").value.trim();
  const answer = document.getElementById("ai-teach-answer").value.trim();
  if (!question || !answer) return;
  if (brain.lessons.length >= MAX_LESSONS) {
    setStatus(`This AI can keep up to ${MAX_LESSONS} examples. Remove one before adding another.`, true);
    return;
  }
  brain.lessons.push({ question, answer });
  if (!saveBrain()) {
    brain.lessons.pop();
    return;
  }
  renderLessons();
  teachForm.reset();
  setStatus("Example saved. It will be included as context in your chats.");
});

function addMessage(role, text) {
  const item = document.createElement("li");
  item.className = `ai-message ${role === "user" ? "ai-message-user" : "ai-message-model"}`;

  const avatar = document.createElement("span");
  avatar.className = "ai-avatar";
  avatar.setAttribute("aria-hidden", "true");
  const icon = document.createElement("i");
  icon.className = role === "user" ? "fa-solid fa-user" : "fa-solid fa-sparkles";
  avatar.append(icon);

  const bubble = document.createElement("div");
  bubble.className = "ai-bubble";
  const name = document.createElement("strong");
  name.className = role === "assistant" ? "ai-speaker" : "";
  name.textContent = role === "user" ? "You" : brain.name || "Your AI";
  const content = document.createElement("p");
  content.textContent = text;
  bubble.append(name, content);
  item.append(avatar, bubble);
  messageList.append(item);
  messageList.scrollTop = messageList.scrollHeight;
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.dataset.error = String(isError);
}

async function checkAiStatus() {
  try {
    const response = await fetch("/api/ai/status", { headers: { Accept: "application/json" } });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not check the AI server.");
    setStatus(result.message, !result.available);
  } catch (error) {
    setStatus(error.message || "Could not connect to the AI server.", true);
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text || sendButton.disabled) return;

  messages.push({ role: "user", text });
  addMessage("user", text);
  input.value = "";
  sendButton.disabled = true;
  setStatus("Waiting for the site's AI...");

  const history = messages.slice(-12);
  if (history[0]?.role === "assistant") history.shift();
  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history,
        name: brain.name,
        instructions: brain.instructions,
        lessons: brain.lessons,
      }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The AI request could not be completed.");
    if (typeof result.reply !== "string" || !result.reply.trim()) throw new Error("The AI returned an empty reply. Please try again.");
    messages.push({ role: "assistant", text: result.reply });
    addMessage("assistant", result.reply);
    setStatus("Connected to the site's private AI server.");
  } catch (error) {
    messages.pop();
    setStatus(error.message, true);
  } finally {
    sendButton.disabled = false;
    input.focus();
  }
});

input.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

document.getElementById("ai-clear").addEventListener("click", () => {
  messages.length = 0;
  messageList.replaceChildren();
  addMessage("assistant", `Hi! I'm ${brain.name || "your AI"}. What can I help with?`);
  checkAiStatus();
  input.focus();
});

checkAiStatus();
