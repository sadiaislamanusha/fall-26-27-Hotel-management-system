/* CUSTOMER DASHBOARD - booking summary ar discount dekhay */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Dashboard JavaScript Loaded!");

    // 4 ta stat card er number (h2) gulo ber kora
    const stats = document.querySelectorAll(
        ".stats-grid .stat-info h2"
    );

    // 4 ta card na thakle kaj bondho
    if (stats.length < 4) return;

    // Shob booking memory theke ana
    const bookings = getBookings();

    // Mot booking koyta
    const totalBookings = bookings.length;

    // Active = Pending othoba Confirmed booking
    const activeBookings = bookings.filter(function (booking) {
        return booking.status === "Pending" ||
            booking.status === "Confirmed";
    }).length;

    // Completed booking koyta
    const completedBookings = bookings.filter(function (booking) {
        return booking.status === "Completed";
    }).length;

    // Number gulo page e boshano
    stats[0].textContent = totalBookings;
    stats[1].textContent = activeBookings;
    stats[2].textContent = completedBookings;

    // Available room er shonkha demo hishebe fixed 8
    stats[3].textContent = "8";

    // Regular Customer Discount: cancelled bade baki booking gulo gona hoy
    const validBookings = bookings.filter(function (booking) {
        return booking.status !== "Cancelled";
    });

    const quickGrid = document.querySelector(".quick-grid");

    if (quickGrid) {

        // 3 ba tar beshi valid booking thakle 10% discount
        const discount = validBookings.length >= 3 ? 10 : 0;

        // Discount er jonno notun ekta card baniye quick access e jog kora
        const discountCard = document.createElement("div");

        discountCard.className = "quick-card";

        discountCard.innerHTML = `
            <h3>Regular Customer Discount</h3>
            <p>
                ${discount > 0
                    ? "You qualify for " + discount + "% discount."
                    : "Complete 3 bookings to qualify for 10% discount."
                }
            </p>
        `;

        quickGrid.appendChild(discountCard);

    }

});
