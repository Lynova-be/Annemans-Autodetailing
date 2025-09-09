// ========== MAIN APPLICATION LOGIC ==========

class AnnemansServices {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollAnimations();
    this.setupMobileNavigation();
    this.setupServiceBooking();
    this.setupToastNotifications();
  }

  // ========== EVENT LISTENERS ==========
  setupEventListeners() {
    // Service card click handlers
    document.querySelectorAll('.service-card__cta').forEach(button => {
      button.addEventListener('click', (e) => {
        const service = e.target.dataset.service;
        this.bookService(service);
      });
    });

    // CTA button handlers
    const ctaButton = document.querySelector('.cta-section .btn-accent');
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        this.bookConsultation();
      });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Header scroll effect
    this.setupHeaderScrollEffect();
  }

  // ========== MOBILE NAVIGATION ==========
  setupMobileNavigation() {
    const toggleButton = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');

    if (toggleButton && nav) {
      toggleButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggleButton.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = toggleButton.querySelectorAll('span');
        spans.forEach((span, index) => {
          if (toggleButton.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(8px, 8px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -7px)';
          } else {
            span.style.transform = '';
            span.style.opacity = '';
          }
        });
      });

      // Close mobile nav when clicking on a link
      nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          toggleButton.classList.remove('active');
          
          const spans = toggleButton.querySelectorAll('span');
          spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
          });
        });
      });
    }
  }

  // ========== HEADER SCROLL EFFECT ==========
  setupHeaderScrollEffect() {
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
      } else {
        header.style.background = 'rgba(0, 0, 0, 0.8)';
        header.style.backdropFilter = 'blur(10px)';
      }

      lastScrollY = currentScrollY;
    });
  }

  // ========== SCROLL ANIMATIONS ==========
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Add scroll reveal to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
      card.classList.add('scroll-reveal');
      card.style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });

    // Add scroll reveal to detailed service cards
    document.querySelectorAll('.detailed-service-card').forEach((card, index) => {
      card.classList.add('scroll-reveal');
      card.style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });

    // Add scroll reveal to other elements
    document.querySelectorAll('.hero-content, .section-header, .cta-content').forEach(element => {
      element.classList.add('scroll-reveal');
      observer.observe(element);
    });
  }

  // ========== SERVICE BOOKING ==========
  setupServiceBooking() {
    // Service card hover effects with enhanced feedback
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  bookService(service) {
    // Simulate booking process
    const serviceNames = {
      basis: 'Basis pakket',
      geavanceerd: 'Geavanceerd pakket',
      ultra: 'Ultra Keramisch pakket'
    };

    const serviceName = serviceNames[service] || service;
    
    // Show loading state
    const button = document.querySelector(`[data-service="${service}"]`);
    const originalText = button.textContent;
    button.textContent = 'Bezig...';
    button.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      
      this.showToast(
        `Bedankt voor uw interesse in het ${serviceName}! We nemen spoedig contact met u op.`,
        'success'
      );

      // Track booking event (if analytics is available)
      this.trackEvent('service_booking_initiated', {
        service: service,
        service_name: serviceName
      });

      // Optional: Redirect to contact page or open modal
      // this.openBookingModal(service);
    }, 1500);
  }

  bookConsultation() {
    this.showToast(
      'Bedankt voor uw interesse! We nemen spoedig contact met u op voor een gratis adviesgesprek.',
      'success'
    );

    this.trackEvent('consultation_booking_initiated');
  }

  // ========== TOAST NOTIFICATIONS ==========
  setupToastNotifications() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast')) {
      const toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');
      
      toast.innerHTML = `
        <div class="toast-content">
          <i class="fas fa-check-circle toast-icon" aria-hidden="true"></i>
          <span class="toast-message"></span>
        </div>
      `;
      
      document.body.appendChild(toast);
    }
  }

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageElement = toast.querySelector('.toast-message');
    const iconElement = toast.querySelector('.toast-icon');

    // Set message
    messageElement.textContent = message;

    // Set icon based on type
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      info: 'fas fa-info-circle',
      warning: 'fas fa-exclamation-triangle'
    };

    iconElement.className = `toast-icon ${icons[type] || icons.success}`;

    // Show toast
    toast.classList.add('show');

    // Auto hide after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);

    // Hide on click
    toast.addEventListener('click', () => {
      toast.classList.remove('show');
    }, { once: true });
  }

  // ========== ANALYTICS & TRACKING ==========
  trackEvent(eventName, properties = {}) {
    // Integration with analytics services
    console.log('Tracking event:', eventName, properties);
    
    // Example Google Analytics 4 integration
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }

    // Example Facebook Pixel integration
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, properties);
    }
  }

  // ========== UTILITY FUNCTIONS ==========
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Lazy loading for images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Performance optimization
  optimizePerformance() {
    // Preload critical resources
    const criticalImages = [
      '/image/Pricing_basic_icon.png',
      '/image/Pricing_advanced_icon.png',
      '/image/Pricing_ultra_icon.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// ========== GLOBAL FUNCTIONS ==========
function bookConsultation() {
  if (window.annemansApp) {
    window.annemansApp.bookConsultation();
  }
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main application
  window.annemansApp = new AnnemansServices();

  // Add loading states
  document.body.classList.add('loaded');

  // Create advanced background effects
  createAdvancedBackground();

  // Performance optimizations
  if (window.annemansApp) {
    window.annemansApp.optimizePerformance();
    window.annemansApp.setupLazyLoading();
  }

  // Accessibility improvements
  setupAccessibility();
});

// ========== ACCESSIBILITY ENHANCEMENTS ==========
function setupAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-primary);
    color: var(--color-bg);
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content ID
  const mainContent = document.querySelector('.main-content');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
  }

  // Enhance keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile navigation
      const nav = document.querySelector('.nav.active');
      if (nav) {
        nav.classList.remove('active');
        document.querySelector('.mobile-nav-toggle').classList.remove('active');
      }
      
      // Close toast
      const toast = document.querySelector('.toast.show');
      if (toast) {
        toast.classList.remove('show');
      }
    }
  });
}

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // Optionally send to error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Optionally send to error tracking service
});

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
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: rgba(0, 166, 80, ${Math.random() * 0.4 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${Math.random() * 20 + 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 10}s;
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
    { size: 200, opacity: 0.05, top: '10%', left: '80%', duration: '40s' },
    { size: 150, opacity: 0.08, top: '60%', left: '10%', duration: '35s' },
    { size: 100, opacity: 0.06, top: '30%', left: '70%', duration: '50s' },
    { size: 120, opacity: 0.04, top: '80%', left: '60%', duration: '45s' }
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
    { path: 'M10,50 Q50,10 90,50 Q50,90 10,50', x: '25%', y: '25%', duration: '15s' },
    { path: 'M20,20 Q80,40 80,80 Q40,80 20,20', x: '70%', y: '60%', duration: '20s' },
    { path: 'M30,30 L70,30 Q80,30 80,40 L80,70 Q80,80 70,80 L30,80 Q20,80 20,70 L20,40 Q20,30 30,30', x: '15%', y: '70%', duration: '25s' }
  ];

  svgShapes.forEach((shape, index) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100');
    svg.setAttribute('height', '100');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.cssText = `
      position: absolute;
      top: ${shape.y};
      left: ${shape.x};
      opacity: 0.08;
      animation: floatParticle ${shape.duration} ease-in-out infinite;
      animation-delay: ${index * 3}s;
    `;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', shape.path);
    path.setAttribute('stroke', '#00A650');
    path.setAttribute('stroke-width', '1');
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
    particleContainer.style.transform = `translateY(${scrollY * 0.1}px)`;
    geometryContainer.style.transform = `translateY(${scrollY * 0.05}px)`;
    svgContainer.style.transform = `translateY(${scrollY * -0.03}px)`;
  });
}

// ========== EXPORT FOR MODULE SYSTEMS ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnnemansServices;
}