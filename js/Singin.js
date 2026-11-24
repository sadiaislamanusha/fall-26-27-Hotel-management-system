const registerFields = ["fullName", "email", "phone", "username", "role", "password", "confirmPassword", "terms"];

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
  box.innerHTML = text;
  box.className = "message " + type;
  box.style.display = "block";
}

function hideMessage(boxId) {
  document.getElementById(boxId).style.display = "none";
}

function isEmpty(value) {
  return value.trim() === "";
}

function isValidEmail(email) {
  let atPosition = email.indexOf("@");
  let dotPosition = email.indexOf(".", atPosition);
  if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition === email.length - 1) {
    return false;
  }
  return true;
}

function isDigitsOnly(text) {
  if (text.length === 0) {
    return false;
  }
  let digits = "0123456789";
  for (let i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) === -1) {
      return false;
    }
  }
  return true;
}

function hasDigit(text) {
  let digits = "0123456789";
  for (let i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function showPasswordStrength() {
  let password = document.getElementById("password").value;
  let text = document.getElementById("strengthText");
  let score = 0;

  if (password.length >= 8) { score++; }
  if (password.length >= 12) { score++; }
  if (hasDigit(password)) { score++; }
  if (password.toLowerCase() !== password) { score++; }

  if (password === "") {
    text.innerHTML = "";
  } else if (score <= 1) {
    text.innerHTML = "Strength: weak";
    text.style.color = "#C62828";
  } else if (score <= 2) {
    text.innerHTML = "Strength: fair";
    text.style.color = "#EF6C00";
  } else {
    text.innerHTML = "Strength: strong";
    text.style.color = "#2E7D32";
  }
}

function toggleRegisterButton() {
  document.getElementById("registerButton").disabled = !document.getElementById("terms").checked;
}

function validateRegister() {
  clearErrors(registerFields);
  hideMessage("registerMessage");

  let fullName = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let username = document.getElementById("username").value.trim();
  let role = document.getElementById("role").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;
  let errorMsg = "";

  if (fullName.length < 3) {
    showError("fullName", "Full name must be at least 3 characters.");
    if (errorMsg === "") errorMsg = "Full name must be at least 3 characters.";
    isValid = false;
  }

  if (isEmpty(email)) {
    showError("email", "Email is required.");
    if (errorMsg === "") errorMsg = "Email is required.";
    isValid = false;
  } else if (isValidEmail(email) === false) {
    showError("email", "Please enter a valid email address.");
    if (errorMsg === "") errorMsg = "Please enter a valid email address.";
    isValid = false;
  }

  if (isDigitsOnly(phone) === false || phone.length !== 11 || phone.slice(0, 2) !== "01") {
    showError("phone", "Phone must be 11 digits and start with 01.");
    if (errorMsg === "") errorMsg = "Phone must be 11 digits and start with 01.";
    isValid = false;
  }

  if (username.length < 4) {
    showError("username", "Username must be at least 4 characters.");
    if (errorMsg === "") errorMsg = "Username must be at least 4 characters.";
    isValid = false;
  } else if (username.indexOf(" ") !== -1) {
    showError("username", "Username cannot contain spaces.");
    if (errorMsg === "") errorMsg = "Username cannot contain spaces.";
    isValid = false;
  }

  if (role === "") {
    showError("role", "Please select your user role.");
    if (errorMsg === "") errorMsg = "Please select your user role.";
    isValid = false;
  }

  if (password.length < 8) {
    showError("password", "Password must be at least 8 characters.");
    if (errorMsg === "") errorMsg = "Password must be at least 8 characters.";
    isValid = false;
  } else if (hasDigit(password) === false) {
    showError("password", "Password must contain at least one digit.");
    if (errorMsg === "") errorMsg = "Password must contain at least one digit.";
    isValid = false;
  }

  if (confirmPassword === "" || confirmPassword !== password) {
    showError("confirmPassword", "Password and Confirm Password must match.");
    if (errorMsg === "") errorMsg = "Password and Confirm Password must match.";
    isValid = false;
  }

  if (document.getElementById("terms").checked === false) {
    showError("terms", "Please agree to the Terms and Conditions.");
    if (errorMsg === "") errorMsg = "Please agree to the Terms and Conditions.";
    isValid = false;
  }

  if (isValid === false) {
    showMessage("registerMessage", errorMsg, "error");
    return false;
  }

  showMessage("registerMessage", "Welcome, <strong>" + fullName + "</strong>! Your " + role.toLowerCase() +
              " account was created. <a href='login.html'>Log in now</a>.", "success");

  document.getElementById("registerForm").reset();
  resetRegisterForm(false);
  return false;
}

function resetRegisterForm(hideMsg) {
  if (hideMsg !== false) {
    document.getElementById("registerForm").reset();
    hideMessage("registerMessage");
  }
  clearErrors(registerFields);
  document.getElementById("registerButton").disabled = true;
  document.getElementById("strengthText").innerHTML = "";
}
