function showError(fieldId, message) {
  let errSpan = document.getElementById(fieldId + "Error");
  if (errSpan != null) {
    errSpan.innerHTML = message;
  }

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = "2px solid red";
  }
}

function clearError(fieldId) {
  let errSpan = document.getElementById(fieldId + "Error");
  if (errSpan != null) {
    errSpan.innerHTML = "";
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

function containsText(text, keyword) {
  return String(text).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
}

function removeAt(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

function nextId(prefix, list) {
  let biggest = 0;
  let digits = 3;
  for (let i = 0; i < list.length; i++) {
    let numberText = list[i].id.slice(prefix.length + 1);
    digits = numberText.length;
    if (Number(numberText) > biggest) {
      biggest = Number(numberText);
    }
  }

  let newNumber = String(biggest + 1);
  while (newNumber.length < digits) {
    newNumber = "0" + newNumber;
  }
  return prefix + "-" + newNumber;
}

function todayString() {
  let now = new Date();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  if (month < 10) { month = "0" + month; }
  if (day < 10) { day = "0" + day; }
  return now.getFullYear() + "-" + month + "-" + day;
}

function nowString() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  return todayString() + " " + hours + ":" + minutes;
}
