# Som de Mar - Restaurant Landing Page

A modern, responsive landing page for Som de Mar, a high-end beachfront restaurant in Villajoyosa, Spain.

## Project Structure

```
som-de-mar/
├── index.html               # Main landing page
├── our-dishes.html          # Menu page
├── reserve.html             # Reservation page
├── assets/                 # Static files
│   ├── images/             # Restaurant photography
│   └── fonts/              # Custom fonts
├── css/                    # Styles
│   ├── style.css           # Global styles
│   └── animations.css      # Scroll animations
├── js/                     # JavaScript
│   ├── main.js             # Main functionality
│   └── scroll-effects.js   # Scroll animations
└── components/             # Reusable components
    └── navbar.html         # Navigation component
```

## Features

- Modern, responsive design
- Smooth scroll animations using ScrollReveal.js
- Custom typography with Playfair Display and Lato
- Elegant color scheme
- Mobile-first approach
- Clean, semantic HTML5
- Optimized performance

## Setup

1. Clone this repository
2. Open `index.html` in your browser
3. For development, use a local server to avoid CORS issues with images

## Required Images

Place all images in the `assets/images` folder. Here's a list of required images and their usage:

### Hero Section
- `hero-bg.jpg`: Full-screen background image for the hero section
  - Should be a high-quality image of the restaurant's exterior or a beautiful beach view
  - Recommended dimensions: 1920x1080px

### About Section
- `restaurant-interior.jpg`: Image of the restaurant's interior or a chef preparing food
  - Used in the about section
  - Recommended dimensions: 800x600px

### Dishes Section
- `dish-1.jpg`: Featured dish image (e.g., Arroz Negro)
  - Used in the dishes grid
  - Recommended dimensions: 600x400px
- `dish-2.jpg`: Featured dish image (e.g., Pulpo a la Brasa)
  - Used in the dishes grid
  - Recommended dimensions: 600x400px
- `dish-3.jpg`: Featured dish image (e.g., Paella de Mariscos)
  - Used in the dishes grid
  - Recommended dimensions: 600x400px

### Location Section
- `location-bg.jpg`: Background image for the location section
  - Should be a beautiful view of Villajoyosa's beachfront
  - Recommended dimensions: 1920x1080px

### Tips for Images
- All images should be optimized for web use
- Use high-quality photos that showcase the restaurant's premium nature
- Maintain consistent color grading across all images
- Consider using images with a similar aesthetic style
- Ensure proper lighting and focus on food presentation

### Image Optimization
- Use JPEG format for photos
- Compress images to reduce loading time
- Maintain proper aspect ratios as specified above
- Test images on different devices to ensure quality

## Image Naming Convention
- Use lowercase filenames
- Use hyphens instead of spaces
- Keep names descriptive but concise
- Example: `hero-background.jpg`, `restaurant-interior.jpg`

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- ScrollReveal.js for animations
- Google Fonts (Playfair Display, Lato)


## To run locally
- Bash: python -m http.server 8000
- Visit http://localhost:8000 in your browser
