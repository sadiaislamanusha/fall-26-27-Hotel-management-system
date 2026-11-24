/* CUSTOMER PAYMENT MANAGEMENT */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Payment JavaScript Loaded!");

    // Page er shob stack-form theke payment form ta khuje ber kora
    // (jeta te booking-id ar payment-amount duto input ache)
    const forms = document.querySelectorAll("form.stack-form");

    const form = Array.from(forms).find(function (item) {
        return item.querySelector("#booking-id") &&
            item.querySelector("#payment-amount");
    });

    // Payment history table er body
    const tableBody = document.querySelector(
        ".subpanel .table-wrap tbody"
    );

    if (!form) return;

    // Payment history table e shob payment dekhay
    function displayPayments() {

        if (!tableBody) return;

        const payments = getPayments();

        // Ager row muche dao
        tableBody.innerHTML = "";

        // Kono payment na thakle message
        if (payments.length === 0) {

            tableBody.innerHTML =
                '<tr><td colspan="5">No payment records found.</td></tr>';

            return;

        }

        payments.forEach(function (payment) {

            const row = document.createElement("tr");

            // Ek row er 5 ta column er value
            const values = [
                payment.id,
                payment.bookingId,
                "$" + payment.amount,
                payment.method,
                payment.status
            ];

            values.forEach(function (value, index) {

                const cell = document.createElement("td");

                if (index === 4) {

                    // Status column e rongin badge: Paid hole shobuj, onno hole holud
                    const badge = document.createElement("span");

                    badge.className = value === "Paid"
                        ? "status confirmed"
                        : "status pending";

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

    // "Confirm Payment Method" click korle ei code chalu hoy
    form.addEventListener("submit", function (event) {

        // Page reload bondho
        event.preventDefault();

        // Form er value gulo nao
        const bookingId =
            document.getElementById("booking-id").value.trim();

        const amount =
            Number(document.getElementById("payment-amount").value);

        // Tip optional, khali thakle 0 dhora hoy
        const tip =
            Number(document.getElementById("tip-amount").value || 0);

        // Radio button theke jeta select kora ache
        const method =
            form.querySelector('input[name="payment-method"]:checked');

        // Booking ID ta asholei ache kina check (boro/choto hater lekha ignore)
        const bookings = getBookings();

        const booking = bookings.find(function (item) {

            return item.id.toLowerCase() === bookingId.toLowerCase();

        });

        if (!booking) {

            alert("Invalid Booking ID!");

            return;

        }

        // Amount, tip ar method thik kina check
        if (!amount || amount <= 0 || tip < 0 || !method) {

            alert("Please enter valid payment information.");

            return;

        }

        // Radio er value theke sundor nam banano
        const methodNames = {

            cash: "Cash on Arrival",

            card: "Credit/Debit Card",

            "mobile-banking": "Mobile Banking"

        };

        const payments = getPayments();

        // Notun payment record jog kora (amount + tip mot taka)
        payments.push({

            id: generateID(payments, "P"),

            bookingId: booking.id,

            amount: amount + tip,

            method: methodNames[method.value],

            // Cash hole Pending, onno method hole "Payment Method Selected"
            status: method.value === "cash"
                ? "Pending"
                : "Payment Method Selected"

        });

        if (savePayments(payments)) {

            alert(
                "Payment Method Saved Successfully!\n" +
                "Booking ID: " + booking.id +
                "\nNo real payment has been processed."
            );

            form.reset();

            displayPayments();

        }

    });

    // Page khulle prothome payment history dekhao
    displayPayments();

});
