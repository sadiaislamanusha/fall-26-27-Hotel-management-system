/* COMMON CUSTOMER FUNCTIONS - 24-57252-2 (Samira) */

// Page puro load hoye gele ei code chalu hoy
document.addEventListener("DOMContentLoaded", function () {

    console.log("Common JavaScript Loaded!");

    // Top bar er profile er shob span khuje ber kora
    const profileName = document.querySelectorAll(".profile span");

    // Jei span e "Rahim Ahmed" lekha ache sheta check kora
    profileName.forEach(function (item) {

        if (item.textContent.trim() === "Rahim Ahmed") {
            item.textContent = "Rahim Ahmed";
        }

    });

});
