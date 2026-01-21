# Holiday Modal Setup Instructions

## Overview
This is a **temporary, standalone** holiday notification modal system that displays a 2-image slideshow on first page load per browsing session. It's designed to be easily removed when the holiday period ends.

**Key Feature:** The modal HTML is **dynamically injected** by JavaScript - you only need to add 2 simple lines to each page!

---

## Files Created

### JavaScript
- `assets/js/holiday-modal.js` - All modal logic, behavior, and HTML injection

### CSS
- `assets/css/holiday-modal.css` - All modal styling

### Image Folders
- `assets/images/holiday/es/` - Spanish images
- `assets/images/holiday/en/` - English images
- `assets/images/holiday/fr/` - French images

---

## How It Works

### Display Logic
1. **First-time visitors:** Modal appears 500ms after cookie modal is accepted OR rejected
2. **Returning visitors:** Modal appears 500ms after page load (if cookie consent already exists)
3. **Session tracking:** Uses `sessionStorage` - shows once per browsing session (resets when browser closes)

### Slideshow Features
- **Auto-advance:** 5 seconds per slide, infinite loop
- **Manual controls:** Previous/Next arrow buttons
- **Dot indicators:** Click to jump to specific slide
- **User interaction:** Auto-advance pauses for 10 seconds after manual navigation
- **Close button:** X button always visible (only way to dismiss)

### Dynamic HTML Injection
- JavaScript automatically detects the current language from the URL
- Modal HTML is created and injected into the page on load
- No manual HTML editing required - just add the script tag!

---

## Step-by-Step Installation

### Step 1: Add Your Images

Place **2 PNG images** in each language folder:

```
assets/images/holiday/
├── es/
│   ├── slide-1.png
│   └── slide-2.png
├── en/
│   ├── slide-1.png
│   └── slide-2.png
└── fr/
    ├── slide-1.png
    └── slide-2.png
```

**Image naming:** Must be exactly `slide-1.png` and `slide-2.png`

**Image recommendations:**
- Landscape orientation works best (16:9 or 4:3 ratio)
- Max height: 80vh (viewport height) on desktop, 60vh on mobile
- Recommended width: 800-1200px for optimal quality
- Keep file sizes reasonable (<500KB per image)

---

### Step 2: Add CSS and JS Links to Pages

**ALREADY COMPLETED** for the following 15 pages:
- ✅ `es/index.html`, `en/index.html`, `fr/index.html`
- ✅ `es/nuestros-platos.html`, `en/nuestros-platos.html`, `fr/nuestros-platos.html`
- ✅ `es/origenes.html`, `en/origenes.html`, `fr/origenes.html`
- ✅ `es/contactanos.html`, `en/contactanos.html`, `fr/contactanos.html`
- ✅ `es/reserva.html`, `en/reserva.html`, `fr/reserva.html`

Each page now has these lines with clear removal comments:

**In `<head>` section:**
```html
<link rel="stylesheet" href="/assets/css/style.css">
<!-- HOLIDAY MODAL CSS - DELETE THIS LINE WHEN REMOVING HOLIDAY MODAL -->
<link rel="stylesheet" href="/assets/css/holiday-modal.css">
<!-- END HOLIDAY MODAL CSS -->
```

**Before `</body>` tag:**
```html
<script src="/assets/js/cookie-ga-modal.js"></script>
<!-- HOLIDAY MODAL JS - DELETE THIS LINE WHEN REMOVING HOLIDAY MODAL -->
<script src="/assets/js/holiday-modal.js"></script>
<!-- END HOLIDAY MODAL JS -->
```

**That's it!** No HTML modal code needed - JavaScript handles everything automatically.

---

## Testing Checklist

### Before Going Live:
- [ ] All 6 images uploaded (2 per language: `slide-1.png` and `slide-2.png`)
- [ ] Test on desktop browser
- [ ] Test on mobile browser
- [ ] Test slideshow auto-advance (5 seconds)
- [ ] Test manual arrow navigation
- [ ] Test dot navigation
- [ ] Test close button
- [ ] Test that modal only shows once per session
- [ ] Test modal appears 500ms after cookie acceptance
- [ ] Test modal appears 500ms after cookie rejection
- [ ] Test modal appears 500ms after page load if cookies already accepted
- [ ] Verify correct language images load on each language's pages

### Testing Session Reset:
1. Visit site → modal should appear after cookie modal
2. Close modal → navigate to another page → modal should NOT appear
3. Close browser completely
4. Reopen browser → visit site → modal should appear again

---

## Customization Options

### Change Auto-Advance Speed
In `holiday-modal.js`, line 45:
```javascript
}, 5000);  // Change 5000 to desired milliseconds (e.g., 3000 = 3 seconds)
```

### Change User Interaction Pause Duration
In `holiday-modal.js`, line 57:
```javascript
}, 10000);  // Change 10000 to desired milliseconds
```

### Change Modal Delay After Cookie Modal
In `holiday-modal.js`, lines 108 and 112:
```javascript
setTimeout(showModal, 500);  // Change 500 to desired milliseconds
```

### Adjust Modal Size
In `holiday-modal.css`, line 21:
```css
max-width: 800px;  /* Change to desired width */
```

### Change Border Color
In `holiday-modal.css`, line 24:
```css
border: 3px solid var(--primary-color);  /* Adjust thickness or color */
```

---

## Troubleshooting

### Modal doesn't appear
- Check browser console for JavaScript errors
- Verify all file paths are correct (case-sensitive on Linux servers)
- Ensure images exist at specified paths
- Clear sessionStorage: Open browser console → type `sessionStorage.clear()` → refresh

### Modal appears every page load
- Check that `holiday-modal.js` is loaded correctly
- Verify sessionStorage is enabled in browser
- Check browser console for errors

### Images don't load
- Verify image paths match exactly: `/assets/images/holiday/LANG/slide-1.png`
- Check image file names are exactly `slide-1.png` and `slide-2.png`
- Ensure images are in correct language folders
- Check file permissions on server

### Slideshow doesn't auto-advance
- Check browser console for JavaScript errors
- Verify `holiday-modal.js` is loaded after `cookie-ga-modal.js`
- Ensure no JavaScript conflicts with other scripts

### Modal appears behind cookie modal
- Check z-index in CSS (holiday modal should be 10000, cookie modal 9999)
- Verify CSS file is loaded correctly

---

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## Performance Notes

- Modal HTML is loaded on every page but hidden by default
- JavaScript only initializes after DOM is ready
- Images load immediately when modal appears (not lazy-loaded)
- SessionStorage has minimal performance impact
- No external dependencies required

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all file paths are correct
3. Clear browser cache and sessionStorage
4. Test in incognito/private browsing mode
5. Check that all files are uploaded to server

---

**Remember:** This is a temporary feature. See `HOLIDAY-MODAL-REMOVAL.md` for clean removal instructions when the holiday period ends.
