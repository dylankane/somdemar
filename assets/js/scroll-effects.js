// ScrollReveal configuration
const sr = ScrollReveal({
    distance: '60px',
    duration: 2000,
    delay: 400,
    reset: false
});

// Animate elements on scroll
//hero section
sr.reveal('.hero-content h1', { delay: 200 });
sr.reveal('.hero-content p', { delay: 400 });
sr.reveal('.hero-content .cta-button', { delay: 600 });

//about section
sr.reveal('.about-text', { origin: 'left', delay: 200 });
sr.reveal('.about-image', { origin: 'right', delay: 200 });

//quote banner section
sr.reveal('.quote-text', { 
    origin: 'top', 
    delay: 200 
});
sr.reveal('.quote-logo', { 
    origin: 'bottom', 
    delay: 200 
});

//food gallery section
sr.reveal('.gallery-grid', { 
    origin: 'left', 
    delay: 300, 
    distance: '200px' 
});
sr.reveal('.gallery-text', { 
    origin: 'right', 
    delay: 300, 
    distance: '200px' 
});

//ingredients gallery section
sr.reveal('.ingredients-grid', { 
    origin: 'right', 
    delay: 300, 
    distance: '200px' 
});
sr.reveal('.ingredients-text', { 
    origin: 'left', 
    delay: 300, 
    distance: '200px' 
});

//video gallery section
sr.reveal('.top-row', { 
    origin: 'right', 
    delay: 300, 
    distance: '200px' 
});
sr.reveal('.video-row', { 
    origin: 'left', 
    delay: 300, 
    distance: '200px' 
});

sr.reveal('.bottom-row', { 
    origin: 'right', 
    delay: 300, 
    distance: '200px' 
});

// Location section animations
sr.reveal('.location .location-pin', { origin: 'top', distance: '100px', delay: 300,});

sr.reveal('.location .section-title', { origin: 'top', distance: '75px', delay: 600,});

// First row - Images and text
sr.reveal('.location-row-images .location-images', { origin: 'right', distance: '60px' });
sr.reveal('.location-row-images .location-text', { origin: 'left', distance: '60px' });

// Second row - Map and text
sr.reveal('.location-map', { origin: 'left', distance: '60px' })
sr.reveal('.location-row-map .location-text', { origin: 'right', distance: '60px' });



// Dish Cards Carousel Section
sr.reveal('.dish-cards-section .section-title', { 
    origin: 'top', 
    delay: 300, 
    distance: '60px' 
});
sr.reveal('.cards-container', { 
    origin: 'right', 
    delay: 400, 
    distance: '150px',
    duration: 1500
});

// Menu List Section
sr.reveal('.menu-header', { origin: 'bottom', distance: '300px', delay: 300,});

sr.reveal('.menu-content', { origin: 'left', distance: '300px', delay: 300,});

//Origin Section
sr.reveal('.origin-item .left', { origin: 'left', distance: '300px', delay: 300,});
sr.reveal('.origin-item .right', { origin: 'right', distance: '300px', delay: 300,});

//Gallery Section
sr.reveal('.col-1', { origin: 'left', distance: '300px', delay: 300,});
sr.reveal('.col-2', { origin: 'bottom', distance: '300px', delay: 300,});
sr.reveal('.col-3', { origin: 'right', distance: '300px', delay: 300,});

//footer
sr.reveal('.footer-logo', { origin: 'bottom', distance: '200px', delay: 300,});