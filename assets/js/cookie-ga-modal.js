document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("cookie-modal");
    const acceptBtn = document.getElementById("cookie-accept");
    const rejectBtn = document.getElementById("cookie-reject");
    const textEl = document.getElementById("cookie-text");
  
    const lang = window.location.pathname.split('/')[1] || 'es';
  
    // Reopen settings button in footer
    const settingsBtn = document.getElementById("cookie-settings-btn");
    if (settingsBtn) {
      settingsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "flex";
      });
    }
  
    const translations = {
      es: {
        text: `Usamos cookies para mejorar su experiencia. <a href="/es/legal.html">Más información</a>`,
        accept: "Aceptar",
        reject: "Rechazar"
      },
      en: {
        text: `We use cookies to improve your experience. <a href="/en/legal.html">Learn more</a>`,
        accept: "Accept",
        reject: "Reject"
      },
      fr: {
        text: `Nous utilisons des cookies pour améliorer votre expérience. <a href="/fr/legal.html">En savoir plus</a>`,
        accept: "Accepter",
        reject: "Refuser"
      }
    };
  
    const t = translations[lang] || translations.es;
    textEl.innerHTML = t.text;
    acceptBtn.textContent = t.accept;
    rejectBtn.textContent = t.reject;
  
    if (!localStorage.getItem("cookieConsent")) {
      modal.style.display = "flex";
    } else if (localStorage.getItem("cookieConsent") === "accepted") {
      loadAnalytics();
    }
  
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "accepted");
      modal.style.display = "none";
      loadAnalytics();
    });
  
    rejectBtn.addEventListener("click", function () {
      localStorage.setItem("cookieConsent", "rejected");
      modal.style.display = "none";
    });
  
    function loadAnalytics() {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-RE1CFYXF4Q";
      document.head.appendChild(gtagScript);
  
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      window.gtag = gtag;
  
      gtag('js', new Date());
      gtag('config', 'G-RE1CFYXF4Q');
    }
  });
  