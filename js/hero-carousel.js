// Hero Carousel
const heroCarousel = document.querySelector('.hero-carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
let carouselInterval;
const interval = 5000; // 5 seconds

function showNextSlide() {
    if (!carouselItems.length) return;
    
    // Fade out current slide
    carouselItems[currentIndex].style.opacity = '0';
    
    // Move to next slide (loop back to start if at end)
    currentIndex = (currentIndex + 1) % carouselItems.length;
    
    // Fade in new slide
    carouselItems[currentIndex].style.opacity = '1';
}

// Start the carousel
function startCarousel() {
    // Set initial active slide
    if (carouselItems.length > 0) {
        carouselItems[0].style.opacity = '1';
    }
    
    // Start the interval
    carouselInterval = setInterval(showNextSlide, interval);
}

// Pause carousel when tab is not visible
function handleVisibilityChange() {
    if (document.hidden) {
        clearInterval(carouselInterval);
    } else {
        startCarousel();
    }
}

// Initialize carousel when DOM is loaded and section is visible
document.addEventListener('DOMContentLoaded', () => {
    // Start with a small delay to ensure everything is loaded
    setTimeout(() => {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCarousel();
                        document.addEventListener('visibilitychange', handleVisibilityChange);
                    } else {
                        clearInterval(carouselInterval);
                        document.removeEventListener('visibilitychange', handleVisibilityChange);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(heroSection);
        }
    }, 1000);
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    clearInterval(carouselInterval);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
});
