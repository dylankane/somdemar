// som-carousel.js

document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('home');
    if (!hero) return;
  
    const slides = hero.querySelectorAll('.carousel-item');
    const intervalTime = 5000;      // ms between slides
    let current = 0;
    let slideTimer = null;

    // Define image sets for all pages with hero carousels
    const heroImages = {
        // Pages with responsive mobile versions
        'index.html': {
            desktop: [
                'assets/images/gambas-plancha-pulpo.jpg',
                'assets/images/dish-1.jpg',
                'assets/images/banner-vieiras.png'
            ],
            mobile: [
                'assets/images/ganbas-plancha-portrait.jpg',
                'assets/images/stock-pot.jpg',
                'assets/images/paella-portrait.jpg'
            ]
        },
        'nuestros-platos.html': {
            desktop: [
                'assets/images/platos-banner1.jpeg',
                'assets/images/arroz-plato.jpeg',
                'assets/images/lamp-cropped.jpg'
            ],
            mobile: [
                'assets/images/portrait-banner-platos.png',
                'assets/images/porttrait-platos2-dish.jpg',
                'assets/images/cake-portrait.jpg'
            ]
        },
        'orígenes.html': {
            desktop: [
                'assets/images/roberto-kitchen.png',
                'assets/images/somdemar-sign-bw.jpg',
                'assets/images/pulpo_kinfe.jpg'
            ],
            mobile: [
                'assets/images/roberto-kitchen-portrait.png',
                'assets/images/pulpo_kinfe.jpg',
                'assets/images/staff-fun3.jpg'
            ]
        },
        // Pages with desktop-only images (no mobile versions)
        'reserva.html': {
            desktop: [
                'assets/images/menu-beach-original.jpeg',
                'assets/images/areil.jpeg',
                'assets/images/spoon-dish.jpeg'
            ],
            mobile: [
                'assets/images/menu-beach-original.jpeg',
                'assets/images/areil.jpeg',
                'assets/images/spoon-dish.jpeg'
            ]
        },
        'contactanos.html': {
            desktop: [
                'assets/images/menu-beach-original.jpeg',
                'assets/images/market.png',
                'assets/images/areil.jpeg'
            ],
            mobile: [
                'assets/images/menu-beach-original.jpeg',
                'assets/images/market.png',
                'assets/images/areil.jpeg'
            ]
        },
        'cronicas.html': {
            desktop: [
                  'assets/images/menu-beach-original.jpeg',
                'assets/images/market.png',
                'assets/images/areil.jpeg'
            ],
            mobile: [
                'assets/images/menu-beach-original.jpeg',
                'assets/images/market.png',
                'assets/images/areil.jpeg'
            ]
        }
    };

    // Get current page filename
    function getCurrentPage() {
        const path = window.location.pathname;
        let filename = path.split('/').pop() || 'index.html';
        filename = filename === '' ? 'index.html' : filename;
        
        // Decode URL encoding for special characters
        try {
            filename = decodeURIComponent(filename);
        } catch (e) {
            // If decoding fails, use original filename
        }
        
        return filename;
    }

    // Check if current page has hero carousel images
    function hasHeroImages() {
        const currentPage = getCurrentPage();
        
        // Direct match first
        if (heroImages.hasOwnProperty(currentPage)) {
            return true;
        }
        
        // Handle special characters - check for origenes variations
        if (currentPage.includes('origen') || currentPage.includes('or%C3%ADgenes')) {
            return heroImages.hasOwnProperty('orígenes.html');
        }
        
        return false;
    }

    // Update images based on screen size
    function updateHeroImages() {
        if (!hasHeroImages()) return;
        
        let currentPage = getCurrentPage();
        
        // Handle special characters - normalize orígenes page
        if (currentPage.includes('origen') || currentPage.includes('or%C3%ADgenes')) {
            currentPage = 'orígenes.html';
        }
        
        const isMobile = window.innerWidth <= 768;
        const imageSet = isMobile ? heroImages[currentPage].mobile : heroImages[currentPage].desktop;
        
        slides.forEach((slide, index) => {
            if (imageSet[index]) {
                slide.style.backgroundImage = `url('${imageSet[index]}')`;
            }
        });
    }
  
    // Show the slide at index i, hide the rest
    function showSlide(i) {
      slides.forEach((slide, idx) => {
        slide.style.opacity = (idx === i ? '1' : '0');
      });
    }
  
    // Advance to next slide and loop
    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }
  
    // Start the autoplay
    function startCarousel() {
      // Update images for current screen size
      updateHeroImages();
      // initialize
      showSlide(current);
      // clear any existing timer before starting
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, intervalTime);
    }

    // Handle window resize to switch images
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateHeroImages();
        }, 250); // Debounce resize events
    });
  
    // Pause when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearInterval(slideTimer);
      else startCarousel();
    });
  
    // Kick off once the hero is in view (optional)
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) startCarousel();
        else clearInterval(slideTimer);
      });
    }, { threshold: 0.1 });
    io.observe(hero);
  });
  