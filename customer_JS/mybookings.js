/* =====================================
   MY BOOKINGS - CUSTOMER PORTAL
   CRUD: View (Read), Update, Cancel
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("My Bookings JavaScript Loaded Successfully!");

    // ---------- HTML element gulo khuje ber kora ----------
    const tableBody = document.querySelector(
        ".panel .table-wrap table tbody"
    );

    const searchInput = document.querySelector(
        'input[name="search-booking"]'
    );

    const searchButton = document.querySelector(
        ".toolbar button.button"
    );

    const dateFilter = document.querySelector(
        'select[name="date-filter"]'
    );

    const tabs = document.querySelectorAll(".tabs button");

    // Table na pele kaj bondho
    if (!tableBody) {
        console.error("Booking Table Not Found!");
        return;
    }

    // data.js connect ache kina check
    if (typeof getBookings !== "function" ||
        typeof saveBookings !== "function") {

        console.error("data.js is not connected!");
        alert("Booking data file is not connected properly!");
        return;
    }

    // Ekhon kon tab select kora ar search e ki lekha ache seta mone rakhar variable
    let selectedStatus = "All Bookings";
    let searchText = "";

    // Ajker date (YYYY-MM-DD)
    function getToday() {

        const date = new Date();

        return date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0");

    }

    // Memory theke booking list nao
    let bookings = getBookings();

    // Action button (View / Update / Cancel) banay
    // data-action ar data-id te button er kaj ar booking ID rakha hoy
    function createButton(text, action, id) {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = text;
        button.dataset.action = action;
        button.dataset.id = id;

        // Cancel button ke alada style dewar jonno "danger" class
        if (action === "cancel") {
            button.className = "danger";
        }

        return button;

    }

    // Table e booking gulo dekhay (filter shoho)
    function displayBookings() {

        bookings = getBookings();

        // Ager row gulo muche dao
        tableBody.innerHTML = "";

        // Tab, search ar date filter er shorto milaye booking bachai kora
        let filteredBookings = bookings.filter(function (booking) {

            // 1) Status filter (tab)
            const status = String(booking.status || "").toLowerCase();

            let statusMatch = true;

            if (selectedStatus !== "All Bookings") {

                statusMatch =
                    status === selectedStatus.toLowerCase();

            }

            // 2) Search filter (booking ID ba room category diye)
            const id = String(booking.id || "").toLowerCase();

            const room = String(
                booking.roomCategory || ""
            ).toLowerCase();

            const searchMatch =
                id.includes(searchText) ||
                room.includes(searchText);

            // 3) Date filter
            let dateMatch = true;

            const filterValue = dateFilter
                ? dateFilter.value
                : "all";

            if (filterValue === "today") {

                // Ajke check-in hobe emon booking
                dateMatch = booking.checkIn === getToday();

            }

            else if (filterValue === "upcoming") {

                // Check-in ajker por, ar cancel hoy ni
                dateMatch =
                    booking.checkIn >= getToday() &&
                    status !== "cancelled";

            }

            else if (filterValue === "completed") {

                // Check-out hoye gese ba status Completed
                dateMatch =
                    booking.checkOut < getToday() ||
                    status === "completed";

            }

            // Shob shorto mille booking ta dekhano hobe
            return statusMatch && searchMatch && dateMatch;

        });

        // Kono booking na pele message dekhao
        if (filteredBookings.length === 0) {

            const row = document.createElement("tr");

            const cell = document.createElement("td");

            cell.colSpan = 6;
            cell.textContent = "No bookings found.";

            row.appendChild(cell);

            tableBody.appendChild(row);

            return;

        }

        // Protita booking er jonno ekta table row banao
        filteredBookings.forEach(function (booking) {

            const row = document.createElement("tr");

            // Booking ID
            const idCell = document.createElement("td");
            idCell.textContent = booking.id;

            // Room category
            const roomCell = document.createElement("td");
            roomCell.textContent = booking.roomCategory;

            // Check-in
            const checkInCell = document.createElement("td");
            checkInCell.textContent = booking.checkIn;

            // Check-out
            const checkOutCell = document.createElement("td");
            checkOutCell.textContent = booking.checkOut;

            // Status badge (rong status onujayi change hoy)
            const statusCell = document.createElement("td");

            const statusBadge = document.createElement("span");

            const currentStatus = booking.status || "Pending";

            statusBadge.textContent = currentStatus;

            if (currentStatus === "Cancelled") {
                statusBadge.className = "status cancelled";
            }

            else if (currentStatus === "Pending") {
                statusBadge.className = "status pending";
            }

            else {
                statusBadge.className = "status confirmed";
            }

            statusCell.appendChild(statusBadge);

            // Action button gulo
            const actionCell = document.createElement("td");

            actionCell.appendChild(
                createButton("View", "view", booking.id)
            );

            // Cancel hoye gele Update ar Cancel button dekhano hobe na
            if (currentStatus !== "Cancelled") {

                actionCell.appendChild(
                    createButton("Update", "update", booking.id)
                );

                actionCell.appendChild(
                    createButton("Cancel", "cancel", booking.id)
                );

            }

            // Cell gulo row te boshano, tarpor row table e boshano
            row.appendChild(idCell);
            row.appendChild(roomCell);
            row.appendChild(checkInCell);
            row.appendChild(checkOutCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);

            tableBody.appendChild(row);

        });

    }

    // ---------- SEARCH ----------
    // Search box er lekha nie table abar dekhay
    function searchBookings() {

        searchText = searchInput.value.trim().toLowerCase();

        displayBookings();

    }

    if (searchButton) {

        searchButton.addEventListener("click", searchBookings);

    }

    if (searchInput) {

        // Lekhar shathe shathe search hobe
        searchInput.addEventListener("input", searchBookings);

        // Enter chaple form submit na hoye search hobe
        searchInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchBookings();

            }

        });

    }

    // ---------- DATE FILTER ----------
    // Dropdown change hole table abar dekhano
    if (dateFilter) {

        dateFilter.addEventListener("change", function () {

            displayBookings();

        });

    }

    // ---------- STATUS TABS ----------
    // Tab e click korle oi tab "active" hoy ar filter kaj kore
    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            tabs.forEach(function (item) {

                item.classList.remove("active");

            });

            tab.classList.add("active");

            selectedStatus = tab.textContent.trim();

            displayBookings();

        });

    });

    // ---------- VIEW / UPDATE / CANCEL ----------
    // Table er moddhe kono button e click korle ei ek ta listener shob handle kore
    tableBody.addEventListener("click", function (event) {

        // Click kora jinish ta data-action wala button kina check
        const button = event.target.closest("button[data-action]");

        if (!button) return;

        const action = button.dataset.action;

        const bookingID = button.dataset.id;

        bookings = getBookings();

        // ID diye oi booking ta khuje ber kora
        const booking = bookings.find(function (item) {

            return item.id === bookingID;

        });

        if (!booking) {

            alert("Booking not found!");

            return;

        }

        // READ - booking er details alert e dekhano
        if (action === "view") {

            alert(

                "BOOKING DETAILS\n\n" +

                "Booking ID: " + booking.id +

                "\nRoom Category: " + booking.roomCategory +

                "\nCheck-in Date: " + booking.checkIn +

                "\nCheck-out Date: " + booking.checkOut +

                "\nNumber of Guests: " + booking.guests +

                "\nBooking Status: " + booking.status

            );

        }

        // UPDATE - room category ar date change kora
        else if (action === "update") {

            if (booking.status === "Cancelled") {

                alert("Cancelled booking cannot be updated!");

                return;

            }

            // Notun room category jiggesh kora
            const newRoom = prompt(

                "Enter New Room Category:\n" +

                "Single Room, Double Room, Deluxe Room, Suite Room",

                booking.roomCategory

            );

            // Cancel chaple ekhanei shesh
            if (newRoom === null) return;

            const roomList = [

                "Single Room",
                "Double Room",
                "Deluxe Room",
                "Suite Room"

            ];

            // User je nam lekhse seta list e ache kina (boro/choto hater lekha ignore kore)
            const selectedRoom = roomList.find(function (room) {

                return room.toLowerCase() === newRoom.trim().toLowerCase();

            });

            if (!selectedRoom) {

                alert("Invalid Room Category!");

                return;

            }

            // Notun check-in date
            const newCheckIn = prompt(

                "Enter New Check-in Date (YYYY-MM-DD):",

                booking.checkIn

            );

            if (newCheckIn === null) return;

            // Notun check-out date
            const newCheckOut = prompt(

                "Enter New Check-out Date (YYYY-MM-DD):",

                booking.checkOut

            );

            if (newCheckOut === null) return;

            // Date ta sothik kina check kore (format ar real date duto-i)
            function validDate(value) {

                // Format YYYY-MM-DD hote hobe
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    return false;
                }

                const date = new Date(value + "T00:00:00");

                // 2026-02-31 er moto vul date dhora porbe
                return !isNaN(date.getTime()) &&
                    date.toISOString().slice(0, 10) === value;

            }

            if (!validDate(newCheckIn) ||
                !validDate(newCheckOut)) {

                alert("Please enter valid dates in YYYY-MM-DD format!");

                return;

            }

            if (newCheckOut <= newCheckIn) {

                alert("Check-out date must be after check-in date!");

                return;

            }

            // Shob thik thakle booking er data update kora
            booking.roomCategory = selectedRoom;

            booking.checkIn = newCheckIn;

            booking.checkOut = newCheckOut;

            if (saveBookings(bookings)) {

                alert("Booking Updated Successfully!");

                displayBookings();

            }

        }

        // CANCEL - booking delete na kore status "Cancelled" kora hoy
        else if (action === "cancel") {

            if (booking.status === "Cancelled") return;

            // Confirm korte bola
            const confirmation = confirm(

                "Are you sure you want to cancel Booking " +

                booking.id + "?"

            );

            if (!confirmation) return;

            booking.status = "Cancelled";

            if (saveBookings(bookings)) {

                alert("Booking Cancelled Successfully!");

                displayBookings();

            }

        }

    });

    // Page khulle prothome booking gulo dekhao
    displayBookings();

    console.log("My Bookings CRUD Operations Ready!");

});
