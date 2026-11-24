/* LOST AND FOUND MANAGEMENT */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Lost and Found JavaScript Loaded!");

    // Shob form theke "itemName" input ache emon form ta khuje ber kora
    const forms = document.querySelectorAll("form.stack-form");

    const form = Array.from(forms).find(function (item) {
        return item.querySelector("#itemName");
    });

    // Report history table er body
    const tableBody = document.querySelector(".table-wrap tbody");

    if (!form) return;

    // Status onujayi badge er rong class
    function statusClass(status) {

        if (status === "Found") return "status confirmed";

        if (status === "Not Found") return "status cancelled";

        return "status pending";

    }

    // Table e shob report dekhay
    function displayReports() {

        if (!tableBody) return;

        const reports = getLostFound();

        // Ager row muche dao
        tableBody.innerHTML = "";

        // Kono report na thakle message
        if (reports.length === 0) {

            tableBody.innerHTML =
                '<tr><td colspan="5">No reports found.</td></tr>';

            return;

        }

        reports.forEach(function (report) {

            const row = document.createElement("tr");

            // Ek row er 5 ta column er value
            const values = [
                report.id,
                report.itemName,
                report.location,
                report.date,
                report.status
            ];

            values.forEach(function (value, index) {

                const cell = document.createElement("td");

                // Shesh column (status) e badge dekhabo
                if (index === 4) {

                    const badge = document.createElement("span");

                    badge.className = statusClass(value);

                    badge.textContent = value;

                    cell.appendChild(badge);

                } else {

                    cell.textContent = value;

                }

                row.appendChild(cell);

            });

            tableBody.appendChild(row);

        });

    }

    // Browser er nijer validation bondho, JS diye check korbo
    form.noValidate = true;

    // "Submit Report" click korle ei code chalu hoy
    form.addEventListener("submit", function (event) {

        // Page reload bondho
        event.preventDefault();

        // Form er value gulo nao
        const itemName = document.getElementById("itemName").value.trim();

        const location = document.getElementById("lostLocation");

        const lostDate = document.getElementById("lostDate").value;

        const description =
            document.getElementById("itemDescription").value.trim();

        const contact =
            document.getElementById("contactNumber").value.trim();

        // Kono field khali thakle error
        if (
            !itemName ||
            !location.value ||
            !lostDate ||
            !description ||
            !contact
        ) {

            alert("Please fill in all information.");

            return;

        }

        const reports = getLostFound();

        // Notun report list e jog kora (status shuru te Pending)
        reports.push({

            id: generateID(reports, "LF-"),

            itemName: itemName,

            location: location.options[location.selectedIndex].text,

            date: lostDate,

            description: description,

            contact: contact,

            status: "Pending"

        });

        if (saveLostFound(reports)) {

            alert("Lost Item Report Submitted Successfully!");

            form.reset();

            displayReports();

        }

    });

    // Page khulle prothome report gulo dekhao
    displayReports();

});
