
// Main carousel variables
let currentCard = 0;
const totalCards = 5;

// Get elements
const track = document.getElementById('dishCardsTrack');
const prevBtn = document.getElementById('prevCardBtn');
const nextBtn = document.getElementById('nextCardBtn');

// Move to specific card
function moveToCard(cardIndex) {
  currentCard = cardIndex;
  
  let moveDistance;
  let maxIndex;
  
  if (window.innerWidth <= 768) {
    // Mobile: 1 card centered with peeks, move by card width + margins
    moveDistance = cardIndex * 80; // 75vw card + 5vw total margins
    maxIndex = totalCards - 1;
  } else {
    // Desktop: 2 cards visible, move by single card width
    moveDistance = cardIndex * 43; // 40vw card + 3vw margin
    maxIndex = totalCards - 2; // Stop when 2 cards are visible
  }
  
  track.style.transform = `translateX(-${moveDistance}vw)`;
  
  // Update button states
  prevBtn.disabled = currentCard === 0;
  nextBtn.disabled = currentCard >= maxIndex;
  prevBtn.style.opacity = currentCard === 0 ? '0.5' : '1';
  nextBtn.style.opacity = currentCard >= maxIndex ? '0.5' : '1';
}

// Next button
function nextCard() {
  const maxIndex = window.innerWidth <= 768 ? totalCards - 1 : totalCards - 2;
  if (currentCard < maxIndex) {
    moveToCard(currentCard + 1);
  }
}

// Previous button
function prevCard() {
  if (currentCard > 0) {
    moveToCard(currentCard - 1);
  }
}

// Media carousel for each card
function initMediaCarousels() {
  document.querySelectorAll('.media-carousel').forEach(carousel => {
    const dots = carousel.querySelectorAll('.media-dot');
    const slides = carousel.querySelectorAll('.media-slide');
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Remove active from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        // Add active to selected slide and dot
        slides[index].classList.add('active');
        dot.classList.add('active');
        
        // Handle video playback
        slides.forEach((slide, slideIndex) => {
          const video = slide.querySelector('.media-video');
          if (video) {
            if (slideIndex === index) {
              // Play video if this slide is now active
              video.play().catch(e => console.log('Video autoplay prevented'));
            } else {
              // Pause video if this slide is not active
              video.pause();
              video.currentTime = 0; // Reset to beginning
            }
          }
        });
      });
    });
  });
}

// Touch/Swipe functionality
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  isSwiping = true;
}

function handleTouchMove(e) {
  if (!isSwiping) return;
  touchEndX = e.touches[0].clientX;
}

function handleTouchEnd() {
  if (!isSwiping) return;
  isSwiping = false;
  
  const swipeDistance = touchStartX - touchEndX;
  const minSwipeDistance = 50; // Minimum distance for a swipe
  
  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swiped left - go to next card
      nextCard();
    } else {
      // Swiped right - go to previous card
      prevCard();
    }
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Add button event listeners
  prevBtn.addEventListener('click', prevCard);
  nextBtn.addEventListener('click', nextCard);
  
  // Add touch event listeners to the track
  track.addEventListener('touchstart', handleTouchStart, { passive: true });
  track.addEventListener('touchmove', handleTouchMove, { passive: true });
  track.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Initialize media carousels
  initMediaCarousels();
  
  // Set initial state
  moveToCard(0);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Reset to first card and recalculate on resize
    currentCard = 0;
    moveToCard(0);
  });
});