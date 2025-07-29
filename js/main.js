// Shared carousel functions (defined once, reused for all carousels)
function createNextImageFunction(images, getCurrentIndex, setCurrentIndex) {
    return function() {
        const current = getCurrentIndex();
        const currentImg = images[current];
        const nextIndex = (current + 1) % images.length;
        const nextImg = images[nextIndex];
        
        // Smooth fade transition using requestAnimationFrame
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function (ease-in-out)
            const easeInOut = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            // Fade out current, fade in next
            currentImg.style.opacity = 1 - easeInOut;
            nextImg.style.opacity = easeInOut;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation complete - update classes
                currentImg.classList.remove('active');
                nextImg.classList.add('active');
                setCurrentIndex(nextIndex);
            }
        }
        
        requestAnimationFrame(animate);
    };
}

function createCarouselController(nextImageFn, baseDelay) {
    let interval = null;
    
    const start = () => {
        if (interval) clearInterval(interval);
        setTimeout(() => {
            nextImageFn();
            interval = setInterval(nextImageFn, baseDelay);
        }, 1000);
    };
    
    const stop = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    };
    
    return { start, stop };
}

function setupViewportDetection(carousel, controller, index) {
    const gallerySection = carousel.closest('.food-gallery');
    if (gallerySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(controller.start, index * 1000);
                } else {
                    controller.stop();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(gallerySection);
    } else {
        setTimeout(controller.start, index * 1000);
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    function initCarousels() {
        document.querySelectorAll('.carousel').forEach((carousel, index) => {
            const images = carousel.querySelectorAll('.carousel-img');
            if (images.length <= 1) return;
            
            // Initialize images
            images.forEach((img, imgIndex) => {
                if (imgIndex === 0) {
                    img.classList.add('active');
                    img.style.opacity = '1';
                } else {
                    img.classList.remove('active');
                    img.style.opacity = '0';
                }
            });
            
            // Carousel state
            let currentIndex = 0;
            const baseDelay = parseInt(carousel.dataset.delay, 10) || 6000 + (index * 1000);
            
            // Create shared functions for this carousel
            const nextImage = createNextImageFunction(
                images,
                () => currentIndex,
                (newIndex) => currentIndex = newIndex
            );
            
            const controller = createCarouselController(nextImage, baseDelay);
            setupViewportDetection(carousel, controller, index);
        });
    }
    
    initCarousels();
});
