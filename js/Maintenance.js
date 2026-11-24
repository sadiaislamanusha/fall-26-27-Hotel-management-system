let editMaintenanceIndex = -1;
const maintenanceFields = ["reportId", "damagedItem", "roomNumber", "problemDescription", "repairAction"];

function renderMaintenance() {
  let keyword = document.getElementById("maintenanceSearch").value;
  let statusFilter = document.getElementById("maintenanceStatusFilter").value;

  let rows = "";
  let shown = 0;
  let pending = 0;
  let inProgress = 0;
  let completed = 0;

  for (let i = 0; i < maintenanceList.length; i++) {
    let m = maintenanceList[i];
    if (m.status === "Pending") pending++;
    if (m.status === "In Progress") inProgress++;
    if (m.status === "Completed") completed++;

    let matchesStatus = (statusFilter === "All" || m.status === statusFilter);

    if (matchesStatus) {
      let badgeClass = m.status === "Completed" ? "green" : (m.status === "In Progress" ? "blue" : "orange");
      rows += "<tr>" +
        "<td>" + m.id + "</td>" +
        "<td>" + m.item + "</td>" +
        "<td>" + m.room + "</td>" +
        "<td>" + m.reportedBy + "</td>" +
        "<td>" + m.date + "</td>" +
        "<td><span class='badge " + badgeClass + "'>" + m.status + "</span></td>" +
        "<td><a href='#maintenanceAction' class='btn btn-small' onclick='editMaintenance(" + i + ")'>View Details</a></td>" +
        "</tr>";
      shown++;
    }
  }

  document.getElementById("statTotal").innerHTML = maintenanceList.length;
  document.getElementById("statPending").innerHTML = pending;
  document.getElementById("statInProgress").innerHTML = inProgress;
  document.getElementById("statCompleted").innerHTML = completed;

  if (shown === 0) {
    rows = "<tr><td colspan='7' class='empty-row'>No requests match your search.</td></tr>";
  }

  document.getElementById("maintenanceTableBody").innerHTML = rows;
  document.getElementById("maintenanceCount").innerHTML = "Showing " + shown + " of " + maintenanceList.length + " requests";
}

function editMaintenance(index) {
  let m = maintenanceList[index];
  editMaintenanceIndex = index;
  clearErrors(maintenanceFields);

  document.getElementById("reportId").value = m.id;
  document.getElementById("damagedItem").value = m.item;
  document.getElementById("roomNumber").value = m.room;
  document.getElementById("reportedBy").value = m.reportedBy;
  document.getElementById("reportDate").value = m.date;
  document.getElementById("problemDescription").value = m.desc;
  document.getElementById("repairStatus").value = m.status;
  document.getElementById("repairAction").value = m.action;
  showMessage("maintenanceMessage", "Viewing maintenance request <strong>" + m.id + "</strong>.", "info");
}

function saveMaintenance() {
  let id = document.getElementById("reportId").value.trim();
  let item = document.getElementById("damagedItem").value.trim();
  let room = document.getElementById("roomNumber").value.trim();
  let desc = document.getElementById("problemDescription").value.trim();
  let status = document.getElementById("repairStatus").value;
  let action = document.getElementById("repairAction").value.trim();

  let isValid = true;
  clearErrors(maintenanceFields);

  if (isEmpty(id)) { showError("reportId", "Report ID is required."); isValid = false; }
  if (item.length < 2) { showError("damagedItem", "Damaged item name is required."); isValid = false; }
  if (isEmpty(room)) { showError("roomNumber", "Room number is required."); isValid = false; }
  if (desc.length < 5) { showError("problemDescription", "Please describe the problem."); isValid = false; }
  if (action.length < 5) { showError("repairAction", "Repair action must be at least 5 characters."); isValid = false; }

  if (isValid === false) {
    showMessage("maintenanceMessage", "Please fix the fields marked in red.", "error");
    return false;
  }

  if (editMaintenanceIndex !== -1) {
    let m = maintenanceList[editMaintenanceIndex];
    m.status = status;
    m.action = action;
    showMessage("maintenanceMessage", "Maintenance request <strong>" + m.id + "</strong> was updated.", "success");
  } else {
    maintenanceList.push({ id: id, item: item, room: room, reportedBy: "Admin", date: todayString(), desc: desc, status: status, action: action });
    showMessage("maintenanceMessage", "Maintenance request <strong>" + id + "</strong> was added.", "success");
  }

  resetMaintenanceForm();
  renderMaintenance();
  return false;
}

function resetMaintenanceForm() {
  editMaintenanceIndex = -1;
  document.getElementById("maintenanceForm").reset();
  clearErrors(maintenanceFields);
}

renderMaintenance();
