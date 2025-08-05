// Video control functionality
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const muteIcon = muteBtn.querySelector('i');

    // Set initial UI state to match video attributes
    // Video starts muted, so show mute icon
    muteIcon.className = 'fas fa-volume-mute';

    // Track if video should be playing (for auto-resume)
    let shouldBePlaying = true; // Video starts with autoplay

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseIcon.className = 'fas fa-pause';
            shouldBePlaying = true;
        } else {
            video.pause();
            playPauseIcon.className = 'fas fa-play';
            shouldBePlaying = false;
        }
    });

    // Mute/Unmute functionality
    muteBtn.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteIcon.className = 'fas fa-volume-up';
        } else {
            video.muted = true;
            muteIcon.className = 'fas fa-volume-mute';
        }
    });

    // Handle video loading errors gracefully
    video.addEventListener('error', function() {
        console.log('Video failed to load. You may need to add actual video files.');
        // Hide video controls if video fails to load
        document.querySelector('.video-controls').style.display = 'none';
    });

    // Update shouldBePlaying when user manually controls video
    // (shouldBePlaying is already declared above)

    // Intersection Observer to pause video when scrolled out of view
    const heroSection = document.querySelector('.video-hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero section is visible - resume video if it should be playing
                    if (shouldBePlaying) {
                        video.play();
                        playPauseIcon.className = 'fas fa-pause';
                    }
                } else {
                    // Hero section is not visible - pause video
                    video.pause();
                    playPauseIcon.className = 'fas fa-play';
                }
            });
        }, {
            // Trigger when 50% of the hero section is visible
            threshold: 0.5,
            // Add some margin to trigger slightly before/after
            rootMargin: '-10% 0px -10% 0px'
        });

        observer.observe(heroSection);
    }
});