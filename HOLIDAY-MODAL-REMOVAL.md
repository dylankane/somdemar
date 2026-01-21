# Holiday Modal Removal Instructions

## Overview
This guide provides step-by-step instructions to **completely remove** the holiday notification modal system from your website when the holiday period ends.

**Good News:** Since the HTML is dynamically injected, you only need to remove 2 lines from each page (plus delete the files)!

---

## Quick Removal Checklist

- [ ] Delete JavaScript file
- [ ] Delete CSS file
- [ ] Delete image folder
- [ ] Remove CSS link from 15 HTML pages (clearly marked with comments)
- [ ] Remove JavaScript link from 15 HTML pages (clearly marked with comments)
- [ ] Delete documentation files
- [ ] Test site functionality
- [ ] Clear browser cache

---

## Step 1: Delete Files

### Delete JavaScript
```
assets/js/holiday-modal.js
```

### Delete CSS
```
assets/css/holiday-modal.css
```

### Delete Image Folder (and all contents)
```
assets/images/holiday/
```

This will remove:
- `assets/images/holiday/es/slide-1.png`
- `assets/images/holiday/es/slide-2.png`
- `assets/images/holiday/en/slide-1.png`
- `assets/images/holiday/en/slide-2.png`
- `assets/images/holiday/fr/slide-1.png`
- `assets/images/holiday/fr/slide-2.png`

---

## Step 2: Remove CSS Link from HTML Pages

**Find and DELETE these 3 lines** from the `<head>` section of each page:

```html
<!-- HOLIDAY MODAL CSS - DELETE THIS LINE WHEN REMOVING HOLIDAY MODAL -->
<link rel="stylesheet" href="/assets/css/holiday-modal.css">
<!-- END HOLIDAY MODAL CSS -->
```

### Pages to Update (15 total):

**Spanish (es/):**
- `es/index.html`
- `es/nuestros-platos.html`
- `es/origenes.html`
- `es/contactanos.html`
- `es/reserva.html`

**English (en/):**
- `en/index.html`
- `en/nuestros-platos.html`
- `en/origenes.html`
- `en/contactanos.html`
- `en/reserva.html`

**French (fr/):**
- `fr/index.html`
- `fr/nuestros-platos.html`
- `fr/origenes.html`
- `fr/contactanos.html`
- `fr/reserva.html`

**Note:** Legal and 404 pages were not included, so you don't need to update them.

---

## Step 3: Remove JavaScript Link from HTML Pages

**Find and DELETE these 3 lines** from before `</body>` on each page:

```html
<!-- HOLIDAY MODAL JS - DELETE THIS LINE WHEN REMOVING HOLIDAY MODAL -->
<script src="/assets/js/holiday-modal.js"></script>
<!-- END HOLIDAY MODAL JS -->
```

**Location:** These lines appear after the cookie modal script:
```html
<script src="/assets/js/cookie-ga-modal.js"></script>
<!-- HOLIDAY MODAL JS - DELETE THIS LINE WHEN REMOVING HOLIDAY MODAL -->
<script src="/assets/js/holiday-modal.js"></script>
<!-- END HOLIDAY MODAL JS -->
```

### Pages to Update:
Same 15 pages as Step 2.

---

## Step 4: Delete Documentation Files

Delete these documentation files from the root directory:

```
HOLIDAY-MODAL-SETUP.md
HOLIDAY-MODAL-REMOVAL.md (this file)
```

---

## Step 5: Verify Removal

### Check Files Deleted:
- [ ] `assets/js/holiday-modal.js` - DELETED
- [ ] `assets/css/holiday-modal.css` - DELETED
- [ ] `assets/images/holiday/` folder - DELETED
- [ ] `HOLIDAY-MODAL-SETUP.md` - DELETED
- [ ] `HOLIDAY-MODAL-REMOVAL.md` - DELETED

### Check HTML Pages Updated:
- [ ] All 15 pages: CSS link removed from `<head>` (3 lines with comments)
- [ ] All 15 pages: JavaScript link removed from before `</body>` (3 lines with comments)

### Test Website:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Visit website in incognito/private mode
3. Verify no modal appears
4. Check browser console for errors (should be none related to holiday modal)
5. Test all pages load correctly
6. Test cookie modal still works correctly

---

## Automated Removal (Optional)

If you're comfortable with command line tools, you can use these commands:

### Delete Files (PowerShell - Windows):
```powershell
Remove-Item "assets\js\holiday-modal.js" -Force
Remove-Item "assets\css\holiday-modal.css" -Force
Remove-Item "assets\images\holiday" -Recurse -Force
Remove-Item "HOLIDAY-MODAL-SETUP.md" -Force
Remove-Item "HOLIDAY-MODAL-REMOVAL.md" -Force
```

### Delete Files (Bash - Linux/Mac):
```bash
rm assets/js/holiday-modal.js
rm assets/css/holiday-modal.css
rm -rf assets/images/holiday
rm HOLIDAY-MODAL-SETUP.md
rm HOLIDAY-MODAL-REMOVAL.md
```

**Note:** You still need to manually remove the CSS/JS references from all 15 pages.

---

## Search & Replace Tips

### For Code Editors with Find & Replace Across Files:

**Remove CSS Link (3 lines):**
- Search for: `<!-- HOLIDAY MODAL CSS - DELETE THIS LINE WHEN REMOVING HOLIDAY MODAL -->\n    <link rel="stylesheet" href="/assets/css/holiday-modal.css">\n    <!-- END HOLIDAY MODAL CSS -->\n`
- Replace with: (empty)
- Files: `es/*.html`, `en/*.html`, `fr/*.html`

**Remove JS Link (3 lines):**
- Search for: `<!-- HOLIDAY MODAL JS - DELETE THIS LINE WHEN REMOVING HOLIDAY MODAL -->\n    <script src="/assets/js/holiday-modal.js"></script>\n    <!-- END HOLIDAY MODAL JS -->\n`
- Replace with: (empty)
- Files: `es/*.html`, `en/*.html`, `fr/*.html`

**Note:** Adjust whitespace (spaces/tabs) in search patterns to match your files' indentation.

---

## Troubleshooting After Removal

### Console Errors About Missing Files
**Symptom:** Browser console shows 404 errors for `holiday-modal.js` or `holiday-modal.css`

**Solution:** You missed removing a `<link>` or `<script>` tag from one or more pages. Search all HTML files for "holiday-modal" and remove any remaining references.

### Layout Issues
**Symptom:** Page layout looks broken after removal

**Solution:** Verify you only deleted the holiday modal HTML block (between the comments), not any surrounding code. Check that cookie modal and other elements are still intact.

### Cookie Modal Not Working
**Symptom:** Cookie modal doesn't appear or doesn't function

**Solution:** Ensure you didn't accidentally delete the cookie modal HTML or its script tag. The cookie modal should remain completely untouched.

---

## What Stays (Do NOT Delete)

These files should **remain on your site**:
- `assets/js/cookie-ga-modal.js` - Cookie consent functionality
- All existing CSS files except `holiday-modal.css`
- All existing JavaScript files except `holiday-modal.js`
- All existing images except the `holiday/` folder
- Cookie modal HTML in all pages
- Cookie modal script tags in all pages

---

## Final Verification Checklist

After completing all steps:

- [ ] No files remain with "holiday-modal" in the name
- [ ] No HTML contains "holiday-modal" class or ID
- [ ] No 404 errors in browser console
- [ ] Cookie modal still works correctly
- [ ] All pages load without errors
- [ ] Site functions normally on desktop
- [ ] Site functions normally on mobile
- [ ] No orphaned sessionStorage keys (optional: run `sessionStorage.clear()` in console)

---

## Clean-Up Complete!

Once all steps are verified, the holiday modal system has been completely removed from your website with no trace remaining. Your site should function exactly as it did before the holiday modal was added.

**Estimated time for removal:** 15-30 minutes (depending on method used)

---

## Need to Re-Add Later?

If you need to add a similar modal for future holidays:
1. Keep a backup of the deleted files
2. Use the same structure and file names
3. Update images for the new holiday
4. Follow the setup instructions again

Consider keeping the `HOLIDAY-MODAL-SETUP.md` file in a separate backup location for future reference.
