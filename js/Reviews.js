let editInvestigationIndex = -1;
const reviewFields = ["investigationId", "reviewStaffId", "staffName", "investigationDetails"];

function renderReviews() {
  let keyword = document.getElementById("reviewSearch").value;
  let typeFilter = document.getElementById("reviewTypeFilter").value;

  let rows = "";
  let shown = 0;
  let positive = 0;
  let negative = 0;
  let totalScore = 0;

  for (const r of reviewsList) {
    totalScore += r.rating;
    if (r.type === "Positive") positive++;
    if (r.type === "Negative") negative++;

    let matchesType = (typeFilter === "All" || r.type === typeFilter);

    if (matchesType) {
      let badgeClass = r.type === "Positive" ? "green" : "red";
      rows += "<tr>" +
                "<td>" + r.id + "</td>" +
                "<td>" + r.staffId + "</td>" +
                "<td>" + r.name + "</td>" +
                "<td>" + r.feedback + "</td>" +
                "<td>" + r.rating + " / 5</td>" +
                "<td><span class='badge " + badgeClass + "'>" + r.type + "</span></td>" +
              "</tr>";
      shown++;
    }
  }

  document.getElementById("statTotalReviews").innerHTML = reviewsList.length;
  document.getElementById("statPositive").innerHTML = positive;
  document.getElementById("statNegative").innerHTML = negative;
  document.getElementById("statOverallRating").innerHTML = (totalScore / reviewsList.length).toFixed(1) + " / 5";

  document.getElementById("reviewTableBody").innerHTML = rows;
  document.getElementById("reviewCount").innerHTML = "Showing " + shown + " of " + reviewsList.length + " reviews";

  let invRows = "";
  for (let i = 0; i < investigationsList.length; i++) {
    let inv = investigationsList[i];
    let badgeClass = inv.status === "Resolved" ? "green" : (inv.status === "Under Review" ? "blue" : "orange");
    invRows += "<tr>" +
                 "<td>" + inv.id + "</td>" +
                 "<td>" + inv.staffId + "</td>" +
                 "<td>" + inv.name + "</td>" +
                 "<td>" + inv.issue + "</td>" +
                 "<td><span class='badge " + badgeClass + "'>" + inv.status + "</span></td>" +
                 "<td><a href='#staffAction' class='btn btn-small' onclick='editInvestigation(" + i + ")'>Review Case</a></td>" +
               "</tr>";
  }
  document.getElementById("investigationTableBody").innerHTML = invRows;
  document.getElementById("investigationCount").innerHTML = "Showing " + investigationsList.length + " investigation case(s)";
}

function editInvestigation(index) {
  let inv = investigationsList[index];
  editInvestigationIndex = index;
  clearErrors(reviewFields);

  document.getElementById("investigationId").value = inv.id;
  document.getElementById("reviewStaffId").value = inv.staffId;
  document.getElementById("staffName").value = inv.name;
  document.getElementById("investigationDetails").value = inv.issue;
  document.getElementById("investigationStatus").value = inv.status;
  showMessage("reviewMessage", "Reviewing investigation case <strong>" + inv.id + "</strong>.", "info");
}

function saveReviewAction() {
  let invId = document.getElementById("investigationId").value.trim();
  let staffId = document.getElementById("reviewStaffId").value.trim();
  let staffName = document.getElementById("staffName").value.trim();
  let details = document.getElementById("investigationDetails").value.trim();
  let status = document.getElementById("investigationStatus").value;

  let isValid = true;
  clearErrors(reviewFields);

  if (isEmpty(invId)) { showError("investigationId", "Investigation ID is required."); isValid = false; }
  if (isEmpty(staffId)) { showError("reviewStaffId", "Staff ID is required."); isValid = false; }
  if (staffName.length < 3) { showError("staffName", "Staff name must be at least 3 characters."); isValid = false; }
  if (details.length < 5) { showError("investigationDetails", "Please enter investigation details."); isValid = false; }

  if (isValid === false) {
    showMessage("reviewMessage", "Please fix the fields marked in red.", "error");
    return false;
  }

  if (editInvestigationIndex !== -1) {
    investigationsList[editInvestigationIndex].status = status;
    investigationsList[editInvestigationIndex].issue = details;
  }

  showMessage("reviewMessage", "Decision saved for investigation <strong>" + invId + "</strong>.", "success");
  resetReviewForm();
  renderReviews();
  return false;
}

function resetReviewForm() {
  editInvestigationIndex = -1;
  document.getElementById("reviewForm").reset();
  clearErrors(reviewFields);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderReviews);
} else {
  renderReviews();
}
