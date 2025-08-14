document.addEventListener('DOMContentLoaded', function() {
    const sideTab = document.getElementById('sideTab');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.querySelector('.modal-close');
    const modalVideo = document.getElementById('modalVideo');
    const modalTransitionTime = 3000; // match CSS transition (1.5s)

    sideTab.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        modalVideo.currentTime = 0; // reset
        // Delay play until after modal is fully visible
        setTimeout(() => {
            modalVideo.play();
        }, modalTransitionTime);
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});
