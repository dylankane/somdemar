document.addEventListener('DOMContentLoaded', function() {
    const fabMenu = document.getElementById('fabMenu');
    const fabDropdown = document.getElementById('fabDropdown');

    // Toggle dropdown menu
    function toggleMenu() {
        fabMenu.classList.toggle('active');
        fabDropdown.classList.toggle('active');
    }

    // Toggle menu on button click
    fabMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!fabMenu.contains(e.target) && !fabDropdown.contains(e.target)) {
            fabMenu.classList.remove('active');
            fabDropdown.classList.remove('active');
        }
    });

    // Close menu after clicking a link
    const dropdownLinks = fabDropdown.querySelectorAll('a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            fabMenu.classList.remove('active');
            fabDropdown.classList.remove('active');
        });
    });

    // Close menu when scrolling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        if (fabMenu.classList.contains('active')) {
            scrollTimeout = setTimeout(() => {
                fabMenu.classList.remove('active');
                fabDropdown.classList.remove('active');
            }, 200);
        }
    }, { passive: true });
});
