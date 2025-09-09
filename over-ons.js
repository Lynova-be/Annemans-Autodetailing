// ========== ADVANCED BACKGROUND EFFECTS ==========
function createAdvancedBackground() {
  // Create additional floating particles
  const particleContainer = document.createElement('div');
  particleContainer.className = 'advanced-particles';
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -3;
    overflow: hidden;
  `;

  // Add multiple floating particles
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: rgba(0, 166, 80, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${Math.random() * 25 + 15}s ease-in-out infinite;
      animation-delay: ${Math.random() * 12}s;
    `;
    particleContainer.appendChild(particle);
  }

  // Create geometric shapes
  const geometryContainer = document.createElement('div');
  geometryContainer.className = 'advanced-geometry';
  geometryContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -2;
    overflow: hidden;
  `;

  // Add circular geometric elements
  const shapes = [
    { size: 180, opacity: 0.06, top: '15%', left: '85%', duration: '45s' },
    { size: 220, opacity: 0.08, top: '65%', left: '5%', duration: '38s' },
    { size: 160, opacity: 0.07, top: '25%', left: '65%', duration: '55s' },
    { size: 140, opacity: 0.05, top: '75%', left: '70%', duration: '42s' },
    { size: 200, opacity: 0.06, top: '45%', left: '25%', duration: '60s' }
  ];

  shapes.forEach((shape, index) => {
    const element = document.createElement('div');
    element.style.cssText = `
      position: absolute;
      width: ${shape.size}px;
      height: ${shape.size}px;
      border: 1px solid rgba(0, 166, 80, ${shape.opacity});
      border-radius: 50%;
      top: ${shape.top};
      left: ${shape.left};
      animation: rotateGeometry ${shape.duration} linear infinite ${index % 2 === 0 ? 'reverse' : ''};
    `;
    geometryContainer.appendChild(element);
  });

  // Add automotive-themed SVG shapes
  const svgContainer = document.createElement('div');
  svgContainer.className = 'automotive-shapes';
  svgContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;

  // Create curved automotive shapes
  const svgShapes = [
    { path: 'M10,50 Q50,10 90,50 Q50,90 10,50', x: '20%', y: '30%', duration: '18s' },
    { path: 'M20,20 Q80,40 80,80 Q40,80 20,20', x: '75%', y: '55%', duration: '22s' },
    { path: 'M30,30 L70,30 Q80,30 80,40 L80,70 Q80,80 70,80 L30,80 Q20,80 20,70 L20,40 Q20,30 30,30', x: '10%', y: '75%', duration: '28s' },
    { path: 'M25,25 Q75,25 75,75 Q25,75 25,25', x: '60%', y: '20%', duration: '35s' }
  ];

  svgShapes.forEach((shape, index) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '120');
    svg.setAttribute('height', '120');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.cssText = `
      position: absolute;
      top: ${shape.y};
      left: ${shape.x};
      opacity: 0.1;
      animation: floatParticle ${shape.duration} ease-in-out infinite;
      animation-delay: ${index * 4}s;
    `;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', shape.path);
    path.setAttribute('stroke', '#00A650');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');

    svg.appendChild(path);
    svgContainer.appendChild(svg);
  });

  // Add all containers to body
  document.body.appendChild(particleContainer);
  document.body.appendChild(geometryContainer);
  document.body.appendChild(svgContainer);

  // Create parallax scroll effect
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    
    // Move different layers at different speeds
    particleContainer.style.transform = `translateY(${scrollY * 0.08}px)`;
    geometryContainer.style.transform = `translateY(${scrollY * 0.04}px)`;
    svgContainer.style.transform = `translateY(${scrollY * -0.02}px)`;
  });
}

// ========== INTERACTIVE ELEMENTS ==========
function initializeInteractiveElements() {
  // Add hover effects to glass cards
  const glassCards = document.querySelectorAll('.glass-card');
  
  glassCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 24px 48px rgba(0, 0, 0, 0.5)';
    });
  });

  // Add interactive glow to value cards
  const valueCards = document.querySelectorAll('.value-card');
  
  valueCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.value-icon');
      const title = this.querySelector('.value-title');
      const description = this.querySelector('.value-description');
      
      if (icon) icon.style.transform = 'scale(1.15)';
      if (title) title.style.color = '#00ff7b';
      if (description) description.style.color = '#bfeccb';
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.value-icon');
      const title = this.querySelector('.value-title');
      const description = this.querySelector('.value-description');
      
      if (icon) icon.style.transform = 'scale(1)';
      if (title) title.style.color = '#ffffff';
      if (description) description.style.color = '#c9cbd1';
    });
  });

  // Add button interaction effects
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      if (this.classList.contains('btn-primary')) {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 12px 24px rgba(0, 166, 80, 0.4)';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      if (this.classList.contains('btn-primary')) {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 6px 12px rgba(0, 166, 80, 0.3)';
      }
    });
    
    button.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(0) scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = this.classList.contains('btn-primary') ? 'translateY(-2px) scale(1)' : 'translateY(0) scale(1)';
    });
  });
}

// ========== SCROLL ANIMATIONS ==========
function initializeScrollAnimations() {
  // Create intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add animation classes to elements that should animate on scroll
  const animateElements = document.querySelectorAll('.glass-card, .value-card, .stat-item');
  
  animateElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(element);
  });
}

// ========== PERFORMANCE OPTIMIZATIONS ==========
function optimizePerformance() {
  // Reduce animation frequency when not in focus
  let isPageVisible = true;
  
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    
    const backgroundElements = document.querySelectorAll('.floating-particles, .geometric-bg, .grid-pattern, .diagonal-grid');
    backgroundElements.forEach(element => {
      if (isPageVisible) {
        element.style.animationPlayState = 'running';
      } else {
        element.style.animationPlayState = 'paused';
      }
    });
  });

  // Debounce scroll events
  let scrollTimeout;
  const originalScrollHandler = window.onscroll;
  
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
      if (originalScrollHandler) originalScrollHandler();
    }, 16); // ~60fps
  });
}

// ========== MOBILE OPTIMIZATIONS ==========
function initializeMobileOptimizations() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Reduce particle count on mobile
    const particles = document.querySelectorAll('.advanced-particles div');
    particles.forEach((particle, index) => {
      if (index > 10) particle.remove();
    });
    
    // Disable some heavy animations on mobile
    const backgroundElements = document.querySelectorAll('.noise-overlay');
    backgroundElements.forEach(element => {
      element.style.display = 'none';
    });
    
    // Add touch feedback
    const touchElements = document.querySelectorAll('.btn, .glass-card');
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      element.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
      });
    });
  }
}

// ========== ACCESSIBILITY IMPROVEMENTS ==========
function setupAccessibility() {
  // Add keyboard navigation for buttons
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Add focus indicators
  const focusableElements = document.querySelectorAll('a, button, [tabindex]');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid #00A650';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });

  // Respect reduced motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// ========== SMOOTH SCROLLING ==========
function initializeSmoothScrolling() {
  // Add smooth scrolling to anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all functionality
  createAdvancedBackground();
  initializeInteractiveElements();
  initializeScrollAnimations();
  optimizePerformance();
  initializeMobileOptimizations();
  setupAccessibility();
  initializeSmoothScrolling();

  // Add loading states
  document.body.classList.add('loaded');

  console.log('Annemans Automotive - Over ons pagina geladen');
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // Graceful degradation - ensure basic functionality still works
});

// ========== EXPORT FOR MODULE SYSTEMS ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createAdvancedBackground,
    initializeInteractiveElements,
    initializeScrollAnimations,
    optimizePerformance,
    setupAccessibility
  };
}