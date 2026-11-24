/* ==========================================
   HOTEL MANAGEMENT SYSTEM
   FEEDBACK & COMPLAINTS JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Feedback & Complaints JavaScript Loaded!");

    // ---------- HTML element gulo khuje ber kora ----------
    // Page e 2 ta form ache: prothom ta Feedback, dwitiyo ta Complaint
    const forms = document.querySelectorAll(
        ".two-column .panel form.stack-form"
    );

    const tableBody = document.querySelector(
        ".table-wrap table tbody"
    );

    // Form ba table na pele kaj bondho
    if (forms.length !== 2 || !tableBody) {

        console.error("Feedback HTML elements not found!");

        alert("Feedback page connection error!");

        return;
    }

    const feedbackForm = forms[0];
    const complaintForm = forms[1];

    // Data memory (RAM) te rakha hoy, localStorage use hoy ni.
    // Tai page reload dile notun submit kora data haray jay.
    // null mane ekhono data load kora hoy ni.
    let memoryRecords = null;

    // Ajker date (YYYY-MM-DD)
    function getToday() {

        const date = new Date();

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, "0");

        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }

    // Record gulo ana
    function getRecords() {

        // Ager thekei memory te thakle seta-i dao
        if (memoryRecords !== null) {

            return memoryRecords;

        }

        // Prothom bar: HTML table e ja sample row ache seta theke record banano
        const oldRows = Array.from(
            tableBody.querySelectorAll("tr")
        );

        const records = oldRows.map(function (row, index) {

            const cells = row.querySelectorAll("td");

            // 4 ta column na thakle skip
            if (cells.length < 4) return null;

            return {

                id: "OLD-" + index,

                date: cells[0].textContent.trim(),

                type: cells[1].textContent.trim(),

                details: cells[2].textContent.trim(),

                status: cells[3].textContent.trim(),

                rating: ""

            };

        }).filter(Boolean);

        saveRecords(records);

        return records;

    }

    // Record gulo memory te save kora
    function saveRecords(records) {

        memoryRecords = records;

        return true;

    }

    // Previous Feedback / Complaints table e shob record dekhay
    function displayRecords() {

        const records = getRecords();

        // Ager row muche dao
        tableBody.innerHTML = "";

        // Kono record na thakle message
        if (records.length === 0) {

            const row = document.createElement("tr");

            const cell = document.createElement("td");

            cell.colSpan = 4;

            cell.textContent = "No feedback or complaints found.";

            row.appendChild(cell);

            tableBody.appendChild(row);

            return;

        }

        records.forEach(function (record) {

            const row = document.createElement("tr");

            // Date column
            const dateCell = document.createElement("td");

            dateCell.textContent = record.date;

            // Type column
            const typeCell = document.createElement("td");

            typeCell.textContent = record.type;

            // Details column
            const detailsCell = document.createElement("td");

            detailsCell.textContent = record.details;

            // Status column: Closed hole shobuj, nahole holud badge
            const statusCell = document.createElement("td");

            const statusBadge = document.createElement("span");

            statusBadge.textContent = record.status;

            statusBadge.className =
                record.status === "Closed"
                    ? "status confirmed"
                    : "status pending";

            statusCell.appendChild(statusBadge);

            row.appendChild(dateCell);

            row.appendChild(typeCell);

            row.appendChild(detailsCell);

            row.appendChild(statusCell);

            tableBody.appendChild(row);

        });

    }

    // ==================================
    // CREATE - FEEDBACK submit
    // ==================================

    feedbackForm.addEventListener("submit", function (event) {

        // Page reload bondho
        event.preventDefault();

        // Je star rating select kora ache seta
        const ratingInput = feedbackForm.querySelector(
            'input[name="rating"]:checked'
        );

        const feedbackInput = feedbackForm.querySelector(
            "#feedback"
        );

        // Rating na dile error
        if (!ratingInput) {

            alert("Please select a rating!");

            return;

        }

        const rating = ratingInput.value;

        const feedback = feedbackInput.value.trim();

        // Feedback khali hole error
        if (feedback === "") {

            alert("Please write your feedback!");

            return;

        }

        const records = getRecords();

        // Notun feedback record
        const newFeedback = {

            id: "FB-" + Date.now(),

            date: getToday(),

            type: "Feedback (" + rating + "/5)",

            details: feedback,

            rating: rating,

            status: "Closed"

        };

        records.push(newFeedback);

        if (saveRecords(records)) {

            alert("Feedback Submitted Successfully!");

            feedbackForm.reset();

            displayRecords();

            console.log("Feedback saved successfully!");

        }

    });

    // ==================================
    // CREATE - COMPLAINT submit
    // ==================================

    complaintForm.addEventListener("submit", function (event) {

        // Page reload bondho
        event.preventDefault();

        const complaintType = complaintForm.querySelector(
            "#complaint-type"
        );

        const complaintInput = complaintForm.querySelector(
            "#complaint"
        );

        // Dropdown theke select kora option er lekha
        const selectedOption =
            complaintType.options[complaintType.selectedIndex];

        const type = selectedOption.textContent.trim();

        const details = complaintInput.value.trim();

        // Type select na korle error
        if (!complaintType.value) {

            alert("Please select a complaint type!");

            return;

        }

        // Details khali hole error
        if (details === "") {

            alert("Please describe your complaint!");

            return;

        }

        const records = getRecords();

        // Notun complaint record (status shuru te In Progress)
        const newComplaint = {

            id: "CP-" + Date.now(),

            date: getToday(),

            type: "Complaint - " + type,

            details: details,

            rating: "",

            status: "In Progress"

        };

        records.push(newComplaint);

        if (saveRecords(records)) {

            alert("Complaint Submitted Successfully!");

            complaintForm.reset();

            displayRecords();

            console.log("Complaint saved successfully!");

        }

    });

    // Page khulle prothome table dekhao
    displayRecords();

    // Address bar e jodi ?query thake (form GET hoye gele hoy) seta muche dao
    if (window.location.search) {

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

    }

    console.log("Feedback & Complaints System Ready!");

});
