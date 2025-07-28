
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
  
  // Get actual card dimensions
  const cards = track.querySelectorAll('.dish-card');
  if (cards.length === 0) return;
  
  const container = track.parentElement;
  const containerStyle = window.getComputedStyle(container);
  const containerPaddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
  const containerPaddingRight = parseFloat(containerStyle.paddingRight) || 0;
  const containerWidth = container.offsetWidth;
  const availableWidth = containerWidth - containerPaddingLeft - containerPaddingRight;
  
  const cardWidth = cards[0].offsetWidth;
  const cardStyle = window.getComputedStyle(cards[0]);
  const marginLeft = parseFloat(cardStyle.marginLeft);
  const marginRight = parseFloat(cardStyle.marginRight);
  const totalCardWidth = cardWidth + marginLeft + marginRight;
  
  let moveDistance;
  
  if (window.innerWidth <= 768) {
    // Mobile: Put the center of the active card in the exact center of the container
    const containerCenter = availableWidth / 2;
    const cardCenter = cardWidth / 2;
    const cardLeftPosition = cardIndex * totalCardWidth + marginLeft;
    const cardCenterPosition = cardLeftPosition + cardCenter;
    
    // Move the track so the card's center aligns with container's center
    moveDistance = cardCenterPosition - containerCenter;
    
    console.log('Mobile centering:', { 
      containerWidth, 
      availableWidth, 
      containerCenter,
      cardWidth, 
      cardCenter,
      cardLeftPosition,
      cardCenterPosition,
      cardIndex, 
      moveDistance 
    });
  } else {
    // Desktop: Simple left alignment, move by card width
    moveDistance = cardIndex * totalCardWidth;
    console.log('Desktop alignment:', { cardIndex, totalCardWidth, moveDistance });
  }
  
  // Calculate max index - how many cards we can scroll through
  const visibleCards = Math.floor(containerWidth / totalCardWidth);
  const maxIndex = Math.max(0, totalCards - visibleCards);
  
  track.style.transform = `translateX(${-moveDistance}px)`;
  
  // Update button states
  prevBtn.disabled = currentCard === 0;
  nextBtn.disabled = currentCard >= maxIndex;
  prevBtn.style.opacity = currentCard === 0 ? '0.5' : '1';
  nextBtn.style.opacity = currentCard >= maxIndex ? '0.5' : '1';
}

// Calculate max index based on current screen size and card layout
function getMaxIndex() {
  const cards = track.querySelectorAll('.dish-card');
  if (cards.length === 0) return 0;
  
  const container = track.parentElement;
  const containerStyle = window.getComputedStyle(container);
  const containerPaddingLeft = parseFloat(containerStyle.paddingLeft) || 0;
  const containerPaddingRight = parseFloat(containerStyle.paddingRight) || 0;
  const containerWidth = container.offsetWidth;
  const availableWidth = containerWidth - containerPaddingLeft - containerPaddingRight;
  
  const cardWidth = cards[0].offsetWidth;
  const cardStyle = window.getComputedStyle(cards[0]);
  const marginLeft = parseFloat(cardStyle.marginLeft);
  const marginRight = parseFloat(cardStyle.marginRight);
  const totalCardWidth = cardWidth + marginLeft + marginRight;
  
  const visibleCards = Math.floor(availableWidth / totalCardWidth);
  return Math.max(0, totalCards - visibleCards);
}

// Next button
function nextCard() {
  const maxIndex = getMaxIndex();
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
  
  // Set initial state with small delay to ensure DOM is ready
  setTimeout(() => {
    moveToCard(0);
  }, 100);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Reset to first card and recalculate on resize
    currentCard = 0;
    moveToCard(0);
  });
});