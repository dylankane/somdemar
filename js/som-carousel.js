// som-carousel.js

document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('home');
    if (!hero) return;
  
    const slides = hero.querySelectorAll('.carousel-item');
    const intervalTime = 5000;      // ms between slides
    let current = 0;
    let slideTimer = null;
  
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
      // initialize
      showSlide(current);
      // clear any existing timer before starting
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, intervalTime);
    }
  
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
  