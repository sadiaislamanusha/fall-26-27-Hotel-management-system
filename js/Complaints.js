let editComplaintIndex = -1;
const complaintFields = ["complaintId", "customerName", "roomNumber", "complaintType", "complaintDetailsText", "adminAction"];

function renderComplaints() {
  let keyword = document.getElementById("complaintSearch").value;
  let statusFilter = document.getElementById("complaintStatusFilter").value;

  let rows = "";
  let shown = 0;
  let pending = 0;
  let inProgress = 0;
  let resolved = 0;

  for (let i = 0; i < complaintsList.length; i++) {
    let c = complaintsList[i];
    if (c.status === "Pending") pending++;
    if (c.status === "In Progress") inProgress++;
    if (c.status === "Resolved") resolved++;

    let matchesStatus = (statusFilter === "All" || c.status === statusFilter);

    if (matchesStatus) {
      let badgeClass = c.status === "Resolved" ? "green" : (c.status === "In Progress" ? "blue" : "orange");
      rows += "<tr>" +
        "<td>" + c.id + "</td>" +
        "<td>" + c.customer + "</td>" +
        "<td>" + c.room + "</td>" +
        "<td>" + c.issue + "</td>" +
        "<td>" + c.date + "</td>" +
        "<td><span class='badge " + badgeClass + "'>" + c.status + "</span></td>" +
        "<td><a href='#complaintDetails' class='btn btn-small' onclick='editComplaint(" + i + ")'>View Details</a></td>" +
        "</tr>";
      shown++;
    }
  }

  document.getElementById("statTotal").innerHTML = complaintsList.length;
  document.getElementById("statPending").innerHTML = pending;
  document.getElementById("statInProgress").innerHTML = inProgress;
  document.getElementById("statResolved").innerHTML = resolved;

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No complaints match your search.</td></tr>";
  }

  document.getElementById("complaintTableBody").innerHTML = rows;
  document.getElementById("complaintCount").innerHTML = "Showing " + shown + " of " + complaintsList.length + " complaints";
}

function editComplaint(index) {
  let c = complaintsList[index];
  editComplaintIndex = index;
  clearErrors(complaintFields);

  document.getElementById("complaintId").value = c.id;
  document.getElementById("customerName").value = c.customer;
  document.getElementById("roomNumber").value = c.room;
  document.getElementById("complaintDate").value = c.date;
  document.getElementById("complaintType").value = c.type;
  document.getElementById("complaintDetailsText").value = c.issue;
  document.getElementById("complaintStatus").value = c.status;
  document.getElementById("adminAction").value = c.action;
  showMessage("complaintMessage", "Viewing complaint <strong>" + c.id + "</strong>.", "info");
}

function saveComplaint() {
  let id = document.getElementById("complaintId").value.trim();
  let customer = document.getElementById("customerName").value.trim();
  let room = document.getElementById("roomNumber").value.trim();
  let type = document.getElementById("complaintType").value;
  let details = document.getElementById("complaintDetailsText").value.trim();
  let status = document.getElementById("complaintStatus").value;
  let action = document.getElementById("adminAction").value.trim();

  let isValid = true;
  clearErrors(complaintFields);

  if (isEmpty(id)) { showError("complaintId", "Complaint ID is required."); isValid = false; }
  if (customer.length < 3) { showError("customerName", "Customer name must be at least 3 characters."); isValid = false; }
  if (isEmpty(room)) { showError("roomNumber", "Room number is required."); isValid = false; }
  if (type === "") { showError("complaintType", "Please choose a complaint type."); isValid = false; }
  if (details.length < 5) { showError("complaintDetailsText", "Please enter complaint details."); isValid = false; }
  if (action.length < 5) { showError("adminAction", "Admin action must be at least 5 characters."); isValid = false; }

  if (isValid === false) {
    showMessage("complaintMessage", "Please fix the fields marked in red.", "error");
    return false;
  }

  if (editComplaintIndex !== -1) {
    let c = complaintsList[editComplaintIndex];
    c.status = status;
    c.action = action;
    showMessage("complaintMessage", "Complaint <strong>" + c.id + "</strong> was updated to " + status + ".", "success");
  } else {
    complaintsList.push({ id: id, customer: customer, room: room, issue: details, date: todayString(), type: type, status: status, action: action });
    showMessage("complaintMessage", "Complaint <strong>" + id + "</strong> was recorded.", "success");
  }

  resetComplaintForm();
  renderComplaints();
  return false;
}

function resetComplaintForm() {
  editComplaintIndex = -1;
  document.getElementById("complaintForm").reset();
  clearErrors(complaintFields);
}

renderComplaints();
