let editStaffIndex = -1;
const staffFields = ["staffId", "staffName", "staffEmail", "staffPhone", "staffPosition", "staffSalary"];

function renderStaff() {
  let keyword = document.getElementById("staffSearch").value;
  let posFilter = document.getElementById("staffPositionFilter").value;
  let statusFilter = document.getElementById("staffStatusFilter").value;

  let rows = "";
  let shown = 0;

  for (let i = 0; i < staffList.length; i++) {
    let staff = staffList[i];

    let matchesPos = (posFilter === "All" || staff.position === posFilter);
    let matchesStatus = (statusFilter === "All" || staff.status === statusFilter);

    if (matchesPos && matchesStatus) {
      let statusColor;
      switch (staff.status) {
        case "Active":
          statusColor = "green";
          break;
        case "On Leave":
          statusColor = "orange";
          break;
        default:
          statusColor = "red";
      }

      rows += "<tr>" +
        "<td>" + staff.id + "</td>" +
        "<td><strong>" + staff.name + "</strong><br><span class='hint'>" + staff.email + "</span></td>" +
        "<td>" + staff.position + "</td>" +
        "<td>" + staff.phone + "</td>" +
        "<td>" + staff.salary + "</td>" +
        "<td><span class='badge " + statusColor + "'>" + staff.status + "</span></td>" +
        "<td>" +
        "<button type='button' class='btn btn-small' onclick='editStaff(" + i + ")'>Edit</button>" +
        "<button type='button' class='btn btn-small btn-danger' onclick='deleteStaff(" + i + ")'>Delete</button>" +
        "</td>" +
        "</tr>";
      shown++;
    }
  }

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No staff match your search.</td></tr>";
  }

  document.getElementById("staffTableBody").innerHTML = rows;
  document.getElementById("staffCount").innerHTML = "Showing " + shown + " of " + staffList.length + " staff members";
}

function saveStaff() {
  let staffId = document.getElementById("staffId").value.trim().toUpperCase();
  let name = document.getElementById("staffName").value.trim();
  let email = document.getElementById("staffEmail").value.trim();
  let phone = document.getElementById("staffPhone").value.trim();
  let position = document.getElementById("staffPosition").value;
  let salaryText = document.getElementById("staffSalary").value;
  let status = document.getElementById("staffStatus").value;

  let salary = Number(salaryText);

  let isValid = true;
  clearErrors(staffFields);

  if (isEmpty(staffId)) {
    showError("staffId", "Staff ID is required.");
    isValid = false;
  }

  if (name.length < 3) {
    showError("staffName", "Name must be at least 3 characters.");
    isValid = false;
  }

  if (isValidEmail(email) === false) {
    showError("staffEmail", "Please enter a valid email address.");
    isValid = false;
  }

  if (isDigitsOnly(phone) === false || phone.length !== 11 || phone.slice(0, 2) !== "01") {
    showError("staffPhone", "Phone must be 11 digits and start with 01.");
    isValid = false;
  }

  if (position === "") {
    showError("staffPosition", "Please choose a position.");
    isValid = false;
  }

  if (salaryText === "" || salary < 5000 || salary > 200000) {
    showError("staffSalary", "Salary must be between 5000 and 200000 Tk.");
    isValid = false;
  }

  if (isValid === false) {
    showMessage("staffMessage", "Please fix the fields marked in red.", "error");
    return false;
  }

  if (editStaffIndex === -1) {
    let newStaff = { id: staffId, name: name, email: email, phone: phone, position: position, salary: salary, status: status };
    staffList.push(newStaff);
    showMessage("staffMessage", "Staff <strong>" + name + "</strong> was added with id " + newStaff.id + ".", "success");
  } else {
    let staff = staffList[editStaffIndex];
    staff.id = staffId;
    staff.name = name;
    staff.email = email;
    staff.phone = phone;
    staff.position = position;
    staff.salary = salary;
    staff.status = status;
    showMessage("staffMessage", "Staff <strong>" + name + "</strong> was updated.", "success");
  }

  resetStaffForm();
  renderStaff();
  return false;
}

function editStaff(index) {
  let staff = staffList[index];
  editStaffIndex = index;

  document.getElementById("staffId").value = staff.id;
  document.getElementById("staffName").value = staff.name;
  document.getElementById("staffEmail").value = staff.email;
  document.getElementById("staffPhone").value = staff.phone;
  document.getElementById("staffPosition").value = staff.position;
  document.getElementById("staffSalary").value = staff.salary;
  document.getElementById("staffStatus").value = staff.status;

  document.getElementById("staffFormTitle").innerHTML = "Edit Staff " + staff.id;
  document.getElementById("staffSaveButton").value = "Update Staff";
  hideMessage("staffMessage");
}

function deleteStaff(index) {
  let staff = staffList[index];

  if (staff.id === "S-001") {
    showMessage("staffMessage", "You cannot delete your own admin account.", "error");
    return;
  }

  staffList = removeAt(staffList, index);
  showMessage("staffMessage", "Staff <strong>" + staff.name + "</strong> was deleted.", "info");
  resetStaffForm();
  renderStaff();
}

function resetStaffForm() {
  editStaffIndex = -1;
  document.getElementById("staffForm").reset();
  clearErrors(staffFields);
  document.getElementById("staffFormTitle").innerHTML = "Add New Staff";
  document.getElementById("staffSaveButton").value = "Add Staff";
}

renderStaff();
