
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
  
  // Load videos for current and adjacent cards
  loadVideosForCard(cardIndex);
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
              // Ensure video is loaded before playing
              lazyLoadVideo(video);
              
              // Wait a moment for the video to load, then play
              setTimeout(() => {
                video.play().catch(e => console.log('Video autoplay prevented:', e));
              }, 100);
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

// Touch/Swipe functionality - Allow both horizontal and vertical gestures
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isSwiping = false;

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isSwiping = true;
}

function handleTouchMove(e) {
  if (!isSwiping) return;
  
  touchEndX = e.touches[0].clientX;
  touchEndY = e.touches[0].clientY;
  
  // Don't prevent any default behavior - allow both horizontal and vertical scrolling
  // We'll handle horizontal swipes on touchend without interfering with vertical scrolling
}

function handleTouchEnd() {
  if (!isSwiping) {
    return;
  }
  
  isSwiping = false;
  
  const deltaX = touchEndX - touchStartX;
  const deltaY = Math.abs(touchEndY - touchStartY);
  const absDeltaX = Math.abs(deltaX);
  
  // Only trigger horizontal navigation if:
  // 1. Horizontal movement is significant (>50px)
  // 2. Horizontal movement is greater than vertical movement (primarily horizontal gesture)
  const minSwipeDistance = 50;
  
  if (absDeltaX > minSwipeDistance && absDeltaX > deltaY) {
    if (deltaX < 0) {
      // Swiped left - go to next card
      nextCard();
    } else {
      // Swiped right - go to previous card
      prevCard();
    }
  }
  
  // Reset values
  touchStartX = 0;
  touchStartY = 0;
  touchEndX = 0;
  touchEndY = 0;
}

// Lazy loading functionality for videos
function lazyLoadVideo(video) {
  const sources = video.querySelectorAll('source[data-src]');
  
  // Check if any sources have data-src attributes (meaning they haven't been loaded yet)
  if (sources.length > 0) {
    let hasDataSrc = false;
    
    sources.forEach(source => {
      const srcData = source.getAttribute('data-src');
      if (srcData) {
        source.src = srcData;
        source.removeAttribute('data-src');
        hasDataSrc = true;
      }
    });
    
    // Only reload if we actually set new sources
    if (hasDataSrc) {
      video.load(); // Reload video with new sources
    }
  }
}

// Load videos for visible cards and adjacent cards
function loadVideosForCard(cardIndex) {
  const cards = track.querySelectorAll('.dish-card');
  
  // Load videos for current card and adjacent cards (preload)
  for (let i = Math.max(0, cardIndex - 1); i <= Math.min(cards.length - 1, cardIndex + 1); i++) {
    const card = cards[i];
    // Find videos that have source elements with data-src attributes
    const videos = card.querySelectorAll('video');
    videos.forEach(video => {
      const dataSrcSources = video.querySelectorAll('source[data-src]');
      if (dataSrcSources.length > 0) {
        lazyLoadVideo(video);
      }
    });
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Add button event listeners
  prevBtn.addEventListener('click', prevCard);
  nextBtn.addEventListener('click', nextCard);
  
  // Add touch event listeners to the track (all passive since we don't prevent defaults)
  track.addEventListener('touchstart', handleTouchStart, { passive: true });
  track.addEventListener('touchmove', handleTouchMove, { passive: true });
  track.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Initialize media carousels
  initMediaCarousels();
  
  // Set initial state with small delay to ensure DOM is ready
  setTimeout(() => {
    moveToCard(0);
    // Load videos for initial card
    loadVideosForCard(0);
  }, 100);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Reset to first card and recalculate on resize
    currentCard = 0;
    moveToCard(0);
    loadVideosForCard(0);
  });
});