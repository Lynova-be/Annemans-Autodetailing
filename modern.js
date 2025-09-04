
// Modern UX micro-interactions without heavy libs
(() => {
  // Scroll reveal
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('reveal-in'); io.unobserve(e.target); }
    });
  }, {threshold:.12}) : null;
  document.querySelectorAll('.service-item, .work-gallery img, .portfolio-item, .contact-section, .services h2, .work-section h2')
    .forEach(el => { el.classList.add('pre-reveal'); io && io.observe(el); });

  // Smooth anchor offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id) || document.querySelector(`[data-page="${id}-page"]`);
      if(!el) return;
      ev.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
