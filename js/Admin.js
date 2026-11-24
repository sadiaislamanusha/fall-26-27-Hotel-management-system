function generateAdminReport() {
  let availableRooms = 0;
  for (const room of rooms) {
    if (room.status === "Available") {
      availableRooms++;
    }
  }

  let activeStaff = 0;
  for (const staff of staffList) {
    if (staff.status === "Active") {
      activeStaff++;
    }
  }

  let pendingComplaints = 0;
  for (const comp of complaintsList) {
    if (comp.status === "Pending") {
      pendingComplaints++;
    }
  }

  let latestSale = monthlySalesData[monthlySalesData.length - 1];
  let totalRev = latestSale.roomRev + latestSale.otherRev;

  document.getElementById("statRooms").innerHTML = rooms.length + " <span class='hint'>(" + availableRooms + " free)</span>";
  document.getElementById("statStaff").innerHTML = activeStaff;
  document.getElementById("statRevenue").innerHTML = totalRev.toLocaleString();
  document.getElementById("statComplaints").innerHTML = complaintsList.length;

  let timeEl = document.getElementById("reportTime");
  if (timeEl != null) {
    timeEl.innerHTML = "(Generated at " + nowString() + ")";
  }

  let complaintRows = "";
  for (const item of complaintsList) {
    let badgeClass;
    switch (item.status) {
      case "Resolved":
        badgeClass = "green";
        break;
      case "In Progress":
        badgeClass = "blue";
        break;
      default:
        badgeClass = "orange";
    }

    complaintRows += "<tr>" +
                       "<td>" + item.id + "</td>" +
                       "<td>" + item.room + "</td>" +
                       "<td>" + item.issue + "</td>" +
                       "<td><span class='badge " + badgeClass + "'>" + item.status + "</span></td>" +
                     "</tr>";
  }
  document.getElementById("complaintTableBody").innerHTML = complaintRows;

  let maintenanceRows = "";
  for (const req of maintenanceList) {
    let badgeClass;
    switch (req.status) {
      case "Completed":
        badgeClass = "green";
        break;
      case "In Progress":
        badgeClass = "blue";
        break;
      default:
        badgeClass = "orange";
    }

    maintenanceRows += "<tr>" +
                         "<td>" + req.id + "</td>" +
                         "<td>" + req.item + "</td>" +
                         "<td>" + req.room + "</td>" +
                         "<td><span class='badge " + badgeClass + "'>" + req.status + "</span></td>" +
                       "</tr>";
  }
  document.getElementById("maintenanceTableBody").innerHTML = maintenanceRows;

  let positiveCount = 0;
  let negativeCount = 0;
  for (const rev of reviewsList) {
    if (rev.type === "Positive") {
      positiveCount++;
    } else {
      negativeCount++;
    }
  }
  let positivePercent = Math.round((positiveCount / reviewsList.length) * 100);
  document.getElementById("staffRating").innerHTML = positivePercent + "%";
  document.getElementById("negativeReviews").innerHTML = negativeCount;
}

function openRoomManagement()  { window.location.href = "Room.html"; }
function openStaffManagement() { window.location.href = "Staff.html"; }
function openMonthlySales()    { window.location.href = "Sales.html"; }
function openComplaints()      { window.location.href = "Complaints.html"; }
function openMaintenance()     { window.location.href = "Maintenance.html"; }
function openStaffReviews()    { window.location.href = "Reviews.html"; }
function logoutAdmin()         { window.location.href = "login.html"; }

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", generateAdminReport);
} else {
  generateAdminReport();
}
