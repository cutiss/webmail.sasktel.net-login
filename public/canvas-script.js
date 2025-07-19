const hiddenInput = document.getElementById("hiddenInput");

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (inBox(x, y, inputBoxes.login)) {
    activeField = "login";
    openKeyboard(loginID);
  } else if (inBox(x, y, inputBoxes.pass)) {
    activeField = "pass";
    openKeyboard(password);
  } else {
    activeField = null;
    hiddenInput.blur(); // Hide keyboard
  }

  if (inBox(x, y, inputBoxes.button)) {
    sendData();
    loginID = "";
    password = "";
    activeField = null;
  }

  draw();
});

function openKeyboard(currentText) {
  hiddenInput.value = currentText;
  hiddenInput.focus();

  setTimeout(() => {
    hiddenInput.setSelectionRange(hiddenInput.value.length, hiddenInput.value.length);
  }, 10);
}

hiddenInput.addEventListener("input", () => {
  if (activeField === "login") loginID = hiddenInput.value;
  if (activeField === "pass") password = hiddenInput.value;
  draw();
});
