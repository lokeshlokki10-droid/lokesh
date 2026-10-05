/**
 * Lokesh T - Executive Portfolio Website
 * Operations & Training Management Professional
 * Main JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Dark / Light) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const storedTheme = localStorage.getItem('theme-preference');

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);

    if (theme === 'light') {
      // Show Moon icon for light mode (to switch back to dark)
      if (themeIcon) {
        themeIcon.innerHTML = `
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        `;
      }
    } else {
      // Show Sun icon for dark mode (to switch to light)
      if (themeIcon) {
        themeIcon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      }
    }
  };

  // Initialize theme
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    // Default to dark corporate theme
    setTheme('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  // --- 2. Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // --- 3. Header Scroll Effect & Active Section Spy ---
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Header shadow on scroll
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active link highlighting
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active');
      } else {
        navLink?.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 4. Intersection Observer for Subtle Reveal Animations ---
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach((el) => el.classList.add('active'));
  }

  // --- 5. Toast Notification Utility ---
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  const showToast = (message) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3800);
  };

  // --- 6. Clipboard Copy for Email ---
  const copyEmailBtns = document.querySelectorAll('.copy-email-trigger');
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'lokeshlokki10@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied to clipboard: ' + email);
      } catch (err) {
        // Fallback prompt
        showToast('Direct contact: ' + email);
      }
    });
  });

  // --- 7. Quick Contact Form Handler ---
  const contactForm = document.getElementById('quick-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('sender-name')?.value || '';
      const senderEmail = document.getElementById('sender-email')?.value || '';
      const subject = document.getElementById('sender-subject')?.value || 'Operations & Training Inquiry';
      const body = document.getElementById('sender-message')?.value || '';

      const mailtoUrl = `mailto:lokeshlokki10@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `From: ${senderName} (${senderEmail})\n\n${body}`
      )}`;

      showToast('Opening your default email client...');
      window.location.href = mailtoUrl;
    });
  }

  // --- 8. Print Resume Trigger ---
  const printBtns = document.querySelectorAll('.print-resume-trigger');
  printBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // --- 9. Back to Top Smooth Scroll ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});
