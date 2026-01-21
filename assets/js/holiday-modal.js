document.addEventListener("DOMContentLoaded", function () {
  const lang = window.location.pathname.split('/')[1] || 'es';
  const sessionKey = "holidayModalShown";
  
  const modalHTML = `
    <div id="holiday-modal" class="holiday-modal">
      <div class="holiday-content">
        <button id="holiday-close" class="holiday-close">&times;</button>
        
        <div class="holiday-slideshow">
          <div class="holiday-slides-track">
            <div class="holiday-slide">
              <img src="/assets/images/holiday/${lang}/slide-1.png" alt="Holiday Notification 1">
            </div>
            <div class="holiday-slide">
              <img src="/assets/images/holiday/${lang}/slide-2.png" alt="Holiday Notification 2">
            </div>
          </div>
          
          <button id="holiday-prev" class="holiday-arrow prev">&#10094;</button>
          <button id="holiday-next" class="holiday-arrow next">&#10095;</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById("holiday-modal");
  const closeBtn = document.getElementById("holiday-close");
  const track = document.querySelector(".holiday-slides-track");
  const slides = document.querySelectorAll(".holiday-slide");
  const prevBtn = document.getElementById("holiday-prev");
  const nextBtn = document.getElementById("holiday-next");

  let currentSlide = 0;
  let autoAdvanceTimeout = null;

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    
    currentSlide = index;
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoAdvance() {
    if (autoAdvanceTimeout) {
      clearTimeout(autoAdvanceTimeout);
    }
    autoAdvanceTimeout = setTimeout(() => {
      if (currentSlide === 0) {
        nextSlide();
      }
    }, 6000);
  }

  function stopAutoAdvance() {
    if (autoAdvanceTimeout) {
      clearTimeout(autoAdvanceTimeout);
      autoAdvanceTimeout = null;
    }
  }

  function showModal() {
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }
    
    modal.style.display = "flex";
    showSlide(0);
    startAutoAdvance();
  }

  function hideModal() {
    modal.style.display = "none";
    stopAutoAdvance();
    sessionStorage.setItem(sessionKey, "true");
  }

  closeBtn.addEventListener("click", hideModal);

  prevBtn.addEventListener("click", () => {
    stopAutoAdvance();
    prevSlide();
  });

  nextBtn.addEventListener("click", () => {
    stopAutoAdvance();
    nextSlide();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  const cookieAcceptBtn = document.getElementById("cookie-accept");
  const cookieRejectBtn = document.getElementById("cookie-reject");
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (cookieConsent) {
    setTimeout(showModal, 500);
  } else {
    if (cookieAcceptBtn) {
      cookieAcceptBtn.addEventListener("click", () => {
        setTimeout(showModal, 500);
      });
    }
    if (cookieRejectBtn) {
      cookieRejectBtn.addEventListener("click", () => {
        setTimeout(showModal, 500);
      });
    }
  }
});
