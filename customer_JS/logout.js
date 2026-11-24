/* LOGOUT - sidebar er Logout link er kaj */

document.addEventListener("DOMContentLoaded", function () {

    // Sidebar theke Logout link ta khuje ber kora
    const logoutLink = document.querySelector('a[href="logout.html"]');

    if (logoutLink) {

        logoutLink.addEventListener("click", function (event) {

            // logout.html page open hoye jaoa bondho kora
            event.preventDefault();

            // User ke jiggesh kora she sure kina
            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {

                // Logout shofol hoyeche sheta dekhano
                alert("Logout Successful! Thank you for using Hotel Management System.");

            }

        });

    }

});
