document.addEventListener('DOMContentLoaded', function() {
    const pageOrder = ['home-page', 'diensten-page', 'over-ons-page', 'contact-page'];
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPage = document.querySelector('.page.active');

    function getPageDirection(currentId, targetId) {
        const currentIndex = pageOrder.indexOf(currentId);
        const targetIndex = pageOrder.indexOf(targetId);
        return targetIndex > currentIndex ? 'right' : 'left';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-page');
            const targetPage = document.getElementById(targetId);
            
            if (currentPage === targetPage) return;
            
            const direction = getPageDirection(currentPage.id, targetId);

            // Reset any existing classes
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active', 'slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
            });
            
            // Update navigation
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Set initial positions
            if (direction === 'right') {
                targetPage.style.transform = 'translateX(100%)';
            } else {
                targetPage.style.transform = 'translateX(-100%)';
            }
            
            // Force reflow
            void targetPage.offsetWidth;

            // Add transition classes
            currentPage.classList.add(`slide-out-${direction}`);
            targetPage.classList.add(`slide-in-${direction}`, 'active');
            
            // Cleanup after animation
            setTimeout(() => {
                currentPage.classList.remove(`slide-out-${direction}`);
                currentPage.style.transform = '';
                targetPage.style.transform = '';
                currentPage = targetPage;
            }, 300);
        });
    });
});
