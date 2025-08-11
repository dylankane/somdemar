const cards = [...document.querySelectorAll('.alive-card')];
let current = null;
let ticking = false;

const io = new IntersectionObserver(onIntersect, {
  // Only care when items are within the middle 70% of the viewport
  root: null,
  rootMargin: '-15% 0% -15% 0%',
  threshold: [0, 0.25, 0.5, 0.75, 1]
});

cards.forEach(c => io.observe(c));

function onIntersect() {
  // Defer to rAF to coalesce rapid scroll events
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(pickActive);
  }
}

function pickActive() {
  ticking = false;

  const vh = window.innerHeight;
  const midY = vh / 2;

  // score each card: smaller distance of its center to viewport center is better
  const scored = cards.map(card => {
    const r = card.getBoundingClientRect();
    const visiblePx = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    const visibleRatio = Math.max(0, Math.min(visiblePx / Math.max(1, r.height), 1));
    const centerY = r.top + r.height / 2;
    const distance = Math.abs(centerY - midY);
    return { card, visibleRatio, distance, rect: r };
  })
  // Only consider items that are reasonably visible
  .filter(x => x.visibleRatio >= 0.35)
  // Prefer center alignment first, then higher visibility as tie-break
  .sort((a, b) => (a.distance - b.distance) || (b.visibleRatio - a.visibleRatio));

  const best = scored[0]?.card || null;

  // Hysteresis: don’t switch unless the new one is clearly better
  if (best && current !== best) {
    const currScore = scored.find(s => s.card === current);
    const newScore = scored.find(s => s.card === best);

    const shouldSwitch =
      !currScore ||
      newScore.distance < currScore.distance * 0.9 || // 10% closer to center
      newScore.visibleRatio > currScore.visibleRatio + 0.2; // or clearly more visible

    if (shouldSwitch) {
      setPlaying(best);
    }
  } else if (!best && current) {
    // Nothing qualifies → pause current
    clearPlaying();
  }
}

function setPlaying(card) {
  if (current && current !== card) {
    current.classList.remove('playing');
    current.querySelector('video')?.pause();
  }
  const v = card.querySelector('video');
  v.play().catch(()=>{});
  card.classList.add('playing');
  current = card;

  // Prefetch next
  const idx = cards.indexOf(card);
  const next = cards[idx + 1]?.querySelector('video');
  if (next && next.preload !== 'auto') next.preload = 'auto';
}

function clearPlaying() {
  current.classList.remove('playing');
  current.querySelector('video')?.pause();
  current = null;
}

// Also re-evaluate on resize & orientation change
addEventListener('resize', () => onIntersect(), { passive: true });
addEventListener('orientationchange', () => onIntersect(), { passive: true });

// Respect reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  io.disconnect();
  cards.forEach(c => c.querySelector('video')?.pause());
}
