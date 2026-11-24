function renderSalesTable() {
  let rows = "";
  let totalRevAll = 0;
  let totalExpAll = 0;
  let totalBookingsAll = 0;

  for (const item of monthlySalesData) {
    let totalRev = item.roomRev + item.otherRev;
    let netProfit = totalRev - item.expense;

    totalRevAll += totalRev;
    totalExpAll += item.expense;
    totalBookingsAll += item.bookings;

    rows += "<tr>" +
              "<td>" + item.label + "</td>" +
              "<td>" + item.roomRev.toLocaleString() + "</td>" +
              "<td>" + item.otherRev.toLocaleString() + "</td>" +
              "<td><strong>" + totalRev.toLocaleString() + "</strong></td>" +
              "<td>" + item.expense.toLocaleString() + "</td>" +
              "<td><span class='badge green'>" + netProfit.toLocaleString() + "</span></td>" +
            "</tr>";
  }

  document.getElementById("salesTableBody").innerHTML = rows;
  document.getElementById("salesCount").innerHTML = "Showing " + monthlySalesData.length + " monthly records";

  document.getElementById("statRevenue").innerHTML = totalRevAll.toLocaleString();
  document.getElementById("statExpenses").innerHTML = totalExpAll.toLocaleString();
  document.getElementById("statProfit").innerHTML = (totalRevAll - totalExpAll).toLocaleString();
  document.getElementById("statBookings").innerHTML = totalBookingsAll;

  document.getElementById("summaryMonth").innerHTML = "All Months";
  document.getElementById("summaryRevenue").innerHTML = "৳ " + totalRevAll.toLocaleString();
  document.getElementById("summaryExpenses").innerHTML = "৳ " + totalExpAll.toLocaleString();
  document.getElementById("summaryProfit").innerHTML = "৳ " + (totalRevAll - totalExpAll).toLocaleString();
}

function generateSalesReport() {
  let selectedMonth = document.getElementById("salesMonth").value;
  clearError("salesMonth");
  hideMessage("salesMessage");

  if (selectedMonth === "") {
    showError("salesMonth", "Please choose a month.");
    showMessage("salesMessage", "Please select a month first.", "error");
    return false;
  }

  let found = null;
  for (const item of monthlySalesData) {
    if (item.month === selectedMonth) {
      found = item;
    }
  }

  if (found === null) {
    showMessage("salesMessage", "No sales record found for " + selectedMonth + ".", "info");
    return false;
  }

  let totalRev = found.roomRev + found.otherRev;
  let profit = totalRev - found.expense;

  document.getElementById("summaryMonth").innerHTML = found.label;
  document.getElementById("summaryRevenue").innerHTML = "৳ " + totalRev.toLocaleString();
  document.getElementById("summaryExpenses").innerHTML = "৳ " + found.expense.toLocaleString();
  document.getElementById("summaryProfit").innerHTML = "৳ " + profit.toLocaleString();
  showMessage("salesMessage", "Sales report generated for <strong>" + found.label + "</strong>.", "success");
  return false;
}

function resetSalesFilter() {
  document.getElementById("salesFilterForm").reset();
  clearError("salesMonth");
  hideMessage("salesMessage");
  renderSalesTable();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderSalesTable);
} else {
  renderSalesTable();
}
