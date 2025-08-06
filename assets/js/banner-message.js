document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const successBanner = document.getElementById("success-banner");
    const errorBanner = document.getElementById("error-banner");

    if (params.get("success") === "1" && successBanner) {
        successBanner.style.display = "block";
    }
    if (params.get("error") === "1" && errorBanner) {
        errorBanner.style.display = "block";
    }
});
