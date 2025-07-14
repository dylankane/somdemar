// Hero Carousel
const heroCarousel = document.querySelector('.hero-carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const interval = 5000; // 5 seconds

function showNextSlide() {
    // Remove active class from current slide
    carouselItems[currentIndex].classList.remove('active');
    
    // Move to next slide (loop back to start if at end)
    currentIndex = (currentIndex + 1) % carouselItems.length;
    
    // Add active class to new slide
    carouselItems[currentIndex].classList.add('active');
}

// Start the carousel
function startCarousel() {
    setInterval(showNextSlide, interval);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    startCarousel();
});
