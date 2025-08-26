document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Pagina wissel functie
    function goToPage(pageId) {
        navLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        const targetLink = document.querySelector(`[data-page="${pageId}"]`);
        const targetPage = document.getElementById(pageId);

        if (targetLink && targetPage) {
            targetLink.classList.add('active');
            targetPage.classList.add('active');
            window.scrollTo(0, 0);
        }
    }

    // Event listeners voor nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPageId = this.getAttribute('data-page');
            goToPage(targetPageId);
        });
    });

    // Event listeners voor CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            goToPage('diensten-page');
        });
    });
});
