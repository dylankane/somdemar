// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Video handling
const video = document.querySelector('.background-video');
const fallback = document.querySelector('.video-fallback');

if (video) {
    // Try to play the video
    const playPromise = video.play();
    
    // If play fails, show fallback
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Video playback failed, showing fallback:', error);
            if (fallback) fallback.classList.add('show');
        });
    }
    
    // If video can play, ensure fallback is hidden
    video.addEventListener('canplay', () => {
        if (fallback) fallback.classList.remove('show');
    });
    
    // If video errors, show fallback
    video.addEventListener('error', () => {
        console.error('Video error, showing fallback');
        if (fallback) fallback.classList.add('show');
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');

// Function to update navbar state
function updateNavbar() {
    // Prevent multiple updates
    if (navbar._isUpdating) return;
    navbar._isUpdating = true;
    
    const heroHeight = hero.offsetHeight;
    const scrollPosition = window.scrollY;
    
    // Clear any pending updates
    if (navbar._timeout) {
        clearTimeout(navbar._timeout);
    }
    
    // Add a small delay to prevent rapid updates
    navbar._timeout = setTimeout(() => {
        if (scrollPosition > heroHeight) {
            navbar.style.background = '#000';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.classList.add('scrolled');
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
            navbar.classList.remove('scrolled');
        }
        navbar._isUpdating = false;
    }, 100);
}

// Add scroll and load event listeners
window.addEventListener('scroll', () => {
    updateNavbar();
});

// Initial check on page load
window.addEventListener('load', () => {
    updateNavbar();
});

// Update on resize
window.addEventListener('resize', () => {
    updateNavbar();
});

// Add smooth fade for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    });
    
    observer.observe(img);
});

// Initialize carousels when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    function initCarousels() {
        document.querySelectorAll('.carousel').forEach((carousel, index) => {
            const images = carousel.querySelectorAll('.carousel-img');
            if (images.length <= 1) return; // No need for carousel with 0 or 1 image
            
            // Make sure only the first image is active initially
            images.forEach((img, imgIndex) => {
                if (imgIndex === 0) {
                    img.classList.add('active');
                    img.style.opacity = '1';
                } else {
                    img.classList.remove('active');
                    img.style.opacity = '0';
                }
            });
            
            let current = 0;
            // Use data-delay attribute or fallback to staggered delays based on index
            const baseDelay = parseInt(carousel.dataset.delay, 10) || 6000 + (index * 1000);
            let interval;
            
            function nextImage() {
                const currentImg = images[current];
                const nextIndex = (current + 1) % images.length;
                const nextImg = images[nextIndex];
                
                // Start fade out current image
                currentImg.style.opacity = '0';
                
                // After fade out completes, update classes and fade in next image
                setTimeout(() => {
                    currentImg.classList.remove('active');
                    nextImg.classList.add('active');
                    nextImg.style.opacity = '1';
                    current = nextIndex;
                }, 1500); // Match this with the CSS transition duration
            }
            
            // Start carousel after a small delay
            const startCarousel = () => {
                if (interval) clearInterval(interval);
                // Add a small delay before starting the first transition
                setTimeout(() => {
                    nextImage();
                    // Set up the interval for subsequent transitions
                    interval = setInterval(nextImage, baseDelay);
                }, 1000);
            };
            
            // Initialize with a staggered delay based on carousel index
            setTimeout(startCarousel, index * 1000);
            
            // Pause on hover
            carousel.addEventListener('mouseenter', () => {
                if (interval) clearInterval(interval);
            });
            
            carousel.addEventListener('mouseleave', () => {
                if (interval) clearInterval(interval);
                interval = setInterval(nextImage, baseDelay);
            });
        });
    }
    
    // Initialize carousels
    initCarousels();
    
    // Re-initialize if new carousels are added dynamically
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(initCarousels);
        observer.observe(document.body, { childList: true, subtree: true });
    }
});
