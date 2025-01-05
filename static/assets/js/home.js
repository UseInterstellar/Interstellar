let inFrame;

try {
  inFrame = window !== top;
} catch (e) {
  inFrame = true;
}

if (!localStorage.getItem("ab")) localStorage.setItem("ab", true);

if (
  !inFrame &&
  !navigator.userAgent.includes("Firefox") &&
  localStorage.getItem("ab") === "true"
) {
  // Removed popup creation logic
  const name = localStorage.getItem("name") || "My Drive - Google Drive";
  const icon =
    localStorage.getItem("icon") ||
    "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

  const docTitle = document.title;
  document.title = name;

  const link = document.createElement("link");
  link.rel = "icon";
  link.href = icon;
  document.head.appendChild(link);
}

// Removed the redirect code and popup logic entirely

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
