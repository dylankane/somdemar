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

//food gallery section
sr.reveal('.gallery-grid', { origin: 'left', delay: 300, distance: '200px' });
sr.reveal('.gallery-text', { origin: 'right', delay: 300, distance: '200px' });

//ingredients gallery section
sr.reveal('.ingredients-grid', { origin: 'right', delay: 300, distance: '200px' });
sr.reveal('.ingredients-text', { origin: 'left', delay: 300, distance: '200px' });

// articles section
sr.reveal('.dish-container .special-dish:nth-child(1) .dish-content', { 
    origin: 'left', 
    delay: 200
});
sr.reveal('.dish-container .special-dish:nth-child(1) .dish-images', { 
    origin: 'right', 
    delay: 200
});
sr.reveal('.dish-container .special-dish:nth-child(2) .dish-content', { 
    origin: 'right', 
    delay: 200
});
sr.reveal('.dish-container .special-dish:nth-child(2) .dish-images', { 
    origin: 'left', 
    delay: 200
});
sr.reveal('.dish-container .special-dish:nth-child(3) .dish-content', { 
    origin: 'left', 
    delay: 200
});
sr.reveal('.dish-container .special-dish:nth-child(3) .dish-images', { 
    origin: 'right', 
    delay: 200
});

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

// Location section animations
sr.reveal('.location .section-title', { origin: 'top', distance: '30px' });

// First row - Images and text
sr.reveal('.location-row-images .location-images', { origin: 'right', distance: '60px' });
sr.reveal('.location-row-images .location-text', { origin: 'left', distance: '60px' });

// Second row - Map and text
sr.reveal('.location-map', { origin: 'left', distance: '60px' })
sr.reveal('.location-row-map .location-text', { origin: 'right', distance: '60px' });
