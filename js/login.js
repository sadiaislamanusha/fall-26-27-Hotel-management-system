function showError(fieldId, message) {
  let errEl = document.getElementById(fieldId + "Error");
  if (errEl != null) {
    errEl.innerHTML = message;
  }
  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "2px solid red";
  }
}

function clearError(fieldId) {
  let errEl = document.getElementById(fieldId + "Error");
  if (errEl != null) {
    errEl.innerHTML = "";
  }
  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "";
  }
}

function clearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    clearError(fieldIds[i]);
  }
}

function showMessage(boxId, text, type) {
  let box = document.getElementById(boxId);
  if (box != null) {
    box.innerHTML = text;
    box.className = "message " + type;
    box.style.display = "block";
  }
}

function hideMessage(boxId) {
  let box = document.getElementById(boxId);
  if (box != null) {
    box.style.display = "none";
  }
}

function isEmpty(value) {
  return value.trim() === "";
}

function isValidEmail(email) {
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);

  if (atPosition < 1) {
    return false;
  }
  if (dotPosition < atPosition + 2) {
    return false;
  }
  if (dotPosition === email.length - 1) {
    return false;
  }
  return true;
}

function validateLogin() {
  let username = document.getElementById("username").value.trim();
  let role = document.getElementById("role").value;
  let password = document.getElementById("password").value;

  let isValid = true;
  let errorMsg = "";
  clearLoginErrors();

  if (isEmpty(username)) {
    showError("username", "Please enter your username or email.");
    if (errorMsg === "") errorMsg = "Please enter your username or email.";
    isValid = false;
  }

  if (role === "") {
    showError("role", "Please select your user role.");
    if (errorMsg === "") errorMsg = "Please select your user role.";
    isValid = false;
  }

  if (isEmpty(password)) {
    showError("password", "Please enter your password.");
    if (errorMsg === "") errorMsg = "Please enter your password.";
    isValid = false;
  } else if (password.length < 5) {
    showError("password", "Password must be at least 5 characters.");
    if (errorMsg === "") errorMsg = "Password must be at least 5 characters.";
    isValid = false;
  }

  if (isValid === false) {
    showMessage("loginMessage", errorMsg, "error");
    return false;
  }

  let form = document.getElementById("loginForm");

  if (username.toLowerCase() === "admin" && (password === "Admin" || password === "Admin123") && role.toLowerCase() === "admin") {
    form.action = "Admin.html";
    return true;
  }
  else if (username.toLowerCase() === "customer" && (password === "Customer" || password === "customer") && role.toLowerCase() === "customer") {
    form.action = "Dashboard_Customar.html";
    return true;
  }
  else if (username.toLowerCase() === "staff" && (password === "Staff" || password === "staff") && role.toLowerCase() === "room service") {
    form.action = "dashboard_rafi.html";
    return true;
  }
  else if ((username.toLowerCase() === "reciptionist" || username.toLowerCase() === "receptionist") &&
           (password.toLowerCase() === "reciptionist" || password.toLowerCase() === "receptionist") &&
           (role.toLowerCase() === "receptionist" || role.toLowerCase() === "reciptionist")) {
    form.action = "Reciptionist Dashboard.html";
    return true;
  }
  else {
    showMessage("loginMessage", "Invalid username or password for the selected role.", "error");
    return false;
  }
}

function clearLoginErrors() {
  clearErrors(["username", "role", "password"]);
  hideMessage("loginMessage");
}

function resetLoginForm() {
  document.getElementById("loginForm").reset();
  clearLoginErrors();
}

function showForgotPasswordStrength() {
  let password = document.getElementById("newPassword").value;
  let text = document.getElementById("forgotStrengthText");

  if (password === "") {
    text.innerHTML = "";
  } else if (password.length < 8) {
    text.innerHTML = "Strength: weak";
    text.style.color = "#C62828";
  } else {
    text.innerHTML = "Strength: strong";
    text.style.color = "#2E7D32";
  }
}

function validateForgotPassword() {
  let email = document.getElementById("resetEmail").value.trim();
  let newPassword = document.getElementById("newPassword").value;
  let confirmPassword = document.getElementById("confirmNewPassword").value;

  let isValid = true;
  let errorMsg = "";
  clearErrors(["resetEmail", "newPassword", "confirmNewPassword"]);
  hideMessage("forgotMessage");

  if (isEmpty(email)) {
    showError("resetEmail", "Email is required.");
    if (errorMsg === "") errorMsg = "Email is required.";
    isValid = false;
  } else if (isValidEmail(email) === false) {
    showError("resetEmail", "Please enter a valid email address.");
    if (errorMsg === "") errorMsg = "Please enter a valid email address.";
    isValid = false;
  }

  if (newPassword.length < 8) {
    showError("newPassword", "Password must be at least 8 characters.");
    if (errorMsg === "") errorMsg = "Password must be at least 8 characters.";
    isValid = false;
  }

  if (confirmPassword === "" || confirmPassword !== newPassword) {
    showError("confirmNewPassword", "Password and Confirm Password must match.");
    if (errorMsg === "") errorMsg = "Password and Confirm Password must match.";
    isValid = false;
  }

  if (isValid === false) {
    showMessage("forgotMessage", errorMsg, "error");
    return false;
  }

  showMessage("forgotMessage", "Password was reset successfully. <a href='login.html'>Log in now</a>.", "success");
  document.getElementById("forgotForm").reset();
  document.getElementById("forgotStrengthText").innerHTML = "";
  return false;
}

function resetForgotForm() {
  document.getElementById("forgotForm").reset();
  clearErrors(["resetEmail", "newPassword", "confirmNewPassword"]);
  hideMessage("forgotMessage");
  document.getElementById("forgotStrengthText").innerHTML = "";
}
