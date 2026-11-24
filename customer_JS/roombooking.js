/* ROOM BOOKING - CREATE OPERATION (notun booking toiri kora) */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Room Booking JavaScript Loaded!");

    // Booking form ta khuje ber kora
    const form = document.querySelector(".form-grid");

    if (!form) {
        console.error("Booking form not found!");
        return;
    }

    // Browser er nijer validation bondho, amra nijera JS diye check korbo
    form.noValidate = true;

    // Form er input gulo ber kora
    const category = document.getElementById("room-category");
    const checkIn = document.getElementById("check-in");
    const checkOut = document.getElementById("check-out");
    const guests = document.getElementById("guests");

    // Ajker age er date select kora jabe na
    checkIn.min = todayDate();
    checkOut.min = todayDate();

    // Check-in date change hole check-out er minimum date o change hobe
    checkIn.addEventListener("change", function () {

        checkOut.min = checkIn.value;

        // Check-out jodi check-in er age ba shoman hoy tahole muche dao
        if (checkOut.value && checkOut.value <= checkIn.value) {
            checkOut.value = "";
        }

    });

    // Booking shofol hole je message dekhabo tar jonno ekta khali box
    const message = document.createElement("div");

    message.id = "booking-message";

    message.style.marginTop = "15px";
    message.style.padding = "15px";
    message.style.borderRadius = "8px";
    message.style.display = "none";

    form.appendChild(message);

    // "Book Now" click korle ei code chalu hoy
    form.addEventListener("submit", function (event) {

        // Page reload hoye jaoa bondho kora
        event.preventDefault();

        console.log("Booking Form Submitted!");

        // Form er value gulo nao
        const room = category.value;
        const inDate = checkIn.value;
        const outDate = checkOut.value;
        const guestNumber = guests.value;

        // Kono field khali thakle error
        if (!room || !inDate || !outDate || !guestNumber) {

            alert("Please fill in all booking information.");

            return;
        }

        // Check-in date ajker age hole error
        if (inDate < todayDate()) {

            alert("Check-in date cannot be in the past.");

            return;
        }

        // Check-out date check-in er por hote hobe
        if (outDate <= inDate) {

            alert("Check-out date must be after check-in date.");

            return;
        }

        // data.js thikmoto connect ache kina check
        if (typeof getBookings !== "function" ||
            typeof saveBookings !== "function") {

            alert("Error: data.js is not connected properly!");

            return;
        }

        // Ager booking gulo ana
        const bookings = getBookings();

        // Notun booking object toiri
        const newBooking = {

            id: generateID(bookings, "B"),

            roomCategory:
                category.options[category.selectedIndex].text,

            checkIn: inDate,

            checkOut: outDate,

            guests: Number(guestNumber),

            status: "Pending",

            createdAt: todayDate()

        };

        // List e notun booking jog kore memory te save
        bookings.push(newBooking);

        const saved = saveBookings(bookings);

        if (!saved) {
            return;
        }

        // Shofol message dekhano
        message.style.display = "block";

        message.style.background = "#e7f6ee";
        message.style.color = "#287653";

        message.innerHTML = `
            <h3>Booking Successful!</h3>
            <p>Booking ID: ${newBooking.id}</p>
            <p>Room: ${newBooking.roomCategory}</p>
            <p>Check-in: ${newBooking.checkIn}</p>
            <p>Check-out: ${newBooking.checkOut}</p>
            <p>Status: Pending</p>
        `;

        alert(
            "Booking Successful!\n" +
            "Your Booking ID: " + newBooking.id
        );

        // Form khali kore dao
        form.reset();

        checkIn.min = todayDate();
        checkOut.min = todayDate();

        console.log("Booking Saved:", newBooking);

    });

});
