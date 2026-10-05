/**
 * LAXMI KUMBHAR PORTFOLIO - FULL-STACK DEVELOPER APPLICATION LOGIC (2026 EDITION)
 * Personal Details:
 * - LinkedIn: https://www.linkedin.com/in/laxmi-kumbhar
 * - GitHub: https://github.com/laxmikumbhar589-web
 * - Email: laxmikumbhar589@gmail.com
 *
 * Full-Stack Technologies:
 * - Frontend: HTML, CSS, JavaScript, React
 * - Backend: Python, Flask, NumPy, Pandas, Matplotlib
 * - Database: MySQL, SQLite
 * - DevOps: AWS, Linux
 */

document.addEventListener('DOMContentLoaded', () => {

  // User Profile Constants
  const USER_EMAIL = 'laxmikumbhar589@gmail.com';
  const USER_LINKEDIN = 'https://www.linkedin.com/in/laxmi-kumbhar';
  const USER_GITHUB = 'https://github.com/laxmikumbhar589-web';

  // ================= 1. DYNAMIC YEAR UPDATER =================
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ================= 2. SCROLL PROGRESS BAR & BACK TO TOP =================
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercentage}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ================= 3. TOAST NOTIFICATION UTILITY =================
  function showToast(message, icon = 'fa-circle-check') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3800);
  }

  // ================= 4. THEME (DARK/LIGHT) SYSTEM =================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('laxmi-portfolio-theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
    localStorage.setItem('laxmi-portfolio-theme', theme);
  }

  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, newTheme === 'dark' ? 'fa-moon' : 'fa-sun');
    });
  }

  // ================= 5. ACCENT PALETTE SWITCHER =================
  const accentTrigger = document.getElementById('accent-trigger');
  const accentPalette = document.getElementById('accent-palette');
  const accentBtns = document.querySelectorAll('.accent-dot-btn');
  const storedAccent = localStorage.getItem('laxmi-portfolio-accent') || 'mint';

  function applyAccent(accentName) {
    document.body.setAttribute('data-accent-color', accentName);
    localStorage.setItem('laxmi-portfolio-accent', accentName);

    accentBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-accent') === accentName);
    });
  }

  applyAccent(storedAccent);

  if (accentTrigger && accentPalette) {
    accentTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      accentPalette.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!accentPalette.contains(e.target) && e.target !== accentTrigger) {
        accentPalette.classList.remove('show');
      }
    });

    accentBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const accent = btn.getAttribute('data-accent');
        applyAccent(accent);
        accentPalette.classList.remove('show');
        showToast(`Accent color set to ${accent.toUpperCase()}`, 'fa-palette');
      });
    });
  }

  // ================= 6. DYNAMIC TYPED HERO TEXT EFFECT =================
  const typedRoleElement = document.getElementById('typed-role');
  if (typedRoleElement) {
    const roles = [
      'Technology. Leading with Purpose.',
      'Python, AI & Machine Learning.',
      'Modern Software Systems.',
      'Placement & Student Success.'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 85;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 350; // Pause before next word
      }

      setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 600);
  }

  // ================= 7. SCROLLSPY NAVIGATION (SEQUENTIAL PAGES) =================
  const sections = document.querySelectorAll('.portfolio-page, section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.mobile-link');

  function updateActiveNav() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
        drawerLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ================= 8. MOBILE DRAWER NAVIGATION =================
  const menuToggle = document.getElementById('menu-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-drawer-footer button');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  mobileLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  // ================= 9. ANIMATED NUMBER COUNTERS =================
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function runCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 1200;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  if (counters.length > 0) {
    const counterSection = document.querySelector('.hero-metrics-bar');
    if (counterSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            runCounters();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(counterSection);
    } else {
      runCounters();
    }
  }

  // ================= 10. SCROLL REVEAL (INTERSECTION OBSERVER) =================
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ================= 11. PROJECT CATEGORY FILTERING =================
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide-card');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.classList.add('hide-card');
        }
      });
    });
  });

  // ================= 12. PROJECT PREVIEW MODAL =================
  const projectModal = document.getElementById('project-preview-modal');
  const projectModalClose = document.getElementById('project-modal-close');
  const projectModalBackdrop = document.getElementById('project-modal-backdrop');
  const openDemoBtns = document.querySelectorAll('.open-demo-btn');

  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectTech = document.getElementById('modal-project-tech');
  const modalProjectDesc = document.getElementById('modal-project-desc');
  const demoInteractiveTitle = document.getElementById('demo-interactive-title');
  const demoActionBtn = document.getElementById('demo-action-btn');

  function openProjectModal(title, tech, desc) {
    if (modalProjectTitle) modalProjectTitle.textContent = title;
    if (demoInteractiveTitle) demoInteractiveTitle.textContent = `${title} - Live Instance`;
    if (modalProjectDesc) modalProjectDesc.textContent = desc;

    if (modalProjectTech) {
      modalProjectTech.innerHTML = tech
        .split(',')
        .map((t) => `<span class="tech-pill-highlight">${t.trim()}</span>`)
        .join('');
    }

    if (projectModal) {
      projectModal.classList.add('open');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  openDemoBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-project') || 'Project Preview';
      const tech = btn.getAttribute('data-tech') || 'HTML5, CSS3, JavaScript, React, Python';
      const desc = btn.getAttribute('data-desc') || 'Full interactive sandbox environment loaded successfully.';
      openProjectModal(title, tech, desc);
    });
  });

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);

  if (demoActionBtn) {
    demoActionBtn.addEventListener('click', () => {
      showToast('API Response: 200 OK • Python Flask endpoint returned JSON payload', 'fa-bolt');
    });
  }

  // ================= 13.5. CERTIFICATE LIGHTBOX MODAL =================
  const certModal = document.getElementById('cert-lightbox-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalBackdrop = document.getElementById('cert-modal-backdrop');
  const certModalDismiss = document.getElementById('cert-modal-dismiss');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalDate = document.getElementById('cert-modal-date');
  const certModalId = document.getElementById('cert-modal-id');
  const certDownloadLink = document.getElementById('cert-download-link');

  function openCertModal(src, title, issuer, date, certId = '') {
    if (certModalImg) {
      certModalImg.src = src;
      certModalImg.alt = title;
    }
    if (certModalTitle) certModalTitle.textContent = title;
    if (certModalIssuer) certModalIssuer.innerHTML = `<i class="fa-solid fa-building"></i> ${issuer}`;
    if (certModalDate) certModalDate.innerHTML = `<i class="fa-regular fa-calendar"></i> ${date}`;
    if (certModalId) {
      if (certId) {
        certModalId.style.display = 'inline-flex';
        certModalId.innerHTML = `<i class="fa-solid fa-barcode"></i> Credential ID: ${certId}`;
      } else {
        certModalId.style.display = 'none';
        certModalId.innerHTML = '';
      }
    }
    if (certDownloadLink) {
      certDownloadLink.href = src;
      certDownloadLink.setAttribute('download', src.split('/').pop() || 'certificate.png');
    }

    if (certModal) {
      certModal.classList.add('open');
      certModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCertModal() {
    if (certModal) {
      certModal.classList.remove('open');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Bind certificate cards & preview clicks
  const certTriggers = document.querySelectorAll('.view-cert-btn, .certificate-preview-box');
  certTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-cert-src') || '';
      const title = trigger.getAttribute('data-cert-title') || 'Verified Certificate';
      const issuer = trigger.getAttribute('data-cert-issuer') || 'Authorized Organization';
      const date = trigger.getAttribute('data-cert-date') || '';
      const certId = trigger.getAttribute('data-cert-id') || '';
      if (src) {
        openCertModal(src, title, issuer, date, certId);
      }
    });
  });

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);
  if (certModalDismiss) certModalDismiss.addEventListener('click', closeCertModal);

  // ================= 13. CONTACT MODAL & FORMS =================
  const contactModal = document.getElementById('contact-modal');
  const contactModalClose = document.getElementById('contact-modal-close');
  const contactModalBackdrop = document.getElementById('contact-modal-backdrop');
  const openContactButtons = document.querySelectorAll('.open-contact-btn');
  const copyEmailCards = document.querySelectorAll('#copy-email-card, #modal-copy-email-card');
  const quickCopyEmailBtn = document.getElementById('quick-copy-email-btn');

  function openContactModal() {
    if (contactModal) {
      contactModal.classList.add('open');
      contactModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const firstInput = contactModal.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 150);
      }
    }
  }

  function closeContactModal() {
    if (contactModal) {
      contactModal.classList.remove('open');
      contactModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  openContactButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  });

  if (contactModalClose) contactModalClose.addEventListener('click', closeContactModal);
  if (contactModalBackdrop) contactModalBackdrop.addEventListener('click', closeContactModal);

  // 1-Click Copy Email Functionality
  function copyEmailToClipboard() {
    navigator.clipboard.writeText(USER_EMAIL).then(() => {
      showToast(`Copied ${USER_EMAIL} to clipboard!`, 'fa-copy');
    }).catch(() => {
      showToast(`Email: ${USER_EMAIL}`, 'fa-envelope');
    });
  }

  copyEmailCards.forEach((card) => {
    card.addEventListener('click', copyEmailToClipboard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyEmailToClipboard();
      }
    });
  });

  if (quickCopyEmailBtn) {
    quickCopyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmailToClipboard();
    });
  }

  // Setup Project Type Chips for any form
  function setupTypeChips(containerSelector, inputSelector) {
    const chips = document.querySelectorAll(`${containerSelector} .type-chip`);
    const input = document.querySelector(inputSelector);

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        if (input) {
          input.value = chip.getAttribute('data-type');
        }
      });
    });
  }

  setupTypeChips('#contact-modal', '#project_type_input');
  setupTypeChips('#contact', '#page_project_type_input');

  // Generic Form Validator & Submitter
  function setupContactForm(formId, submitBtnId, nameId, emailId, messageId, nameErrorId, emailErrorId, messageErrorId, isModal = false) {
    const form = document.getElementById(formId);
    const submitBtn = document.getElementById(submitBtnId);
    if (!form) return;

    const nameInput = document.getElementById(nameId);
    const emailInput = document.getElementById(emailId);
    const messageInput = document.getElementById(messageId);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateField = (input, isValid) => {
      if (!input) return false;
      const group = input.closest('.form-group');
      if (!group) return isValid;
      if (!isValid) {
        group.classList.add('has-error');
        return false;
      } else {
        group.classList.remove('has-error');
        return true;
      }
    };

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameOk = validateField(nameInput, nameInput.value.trim().length > 0);
      const emailOk = validateField(emailInput, isValidEmail(emailInput.value.trim()));
      const msgOk = validateField(messageInput, messageInput.value.trim().length > 0);

      if (!nameOk || !emailOk || !msgOk) return;

      if (submitBtn) {
        const originalHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
          const senderName = nameInput.value.trim();
          form.reset();
          if (isModal) closeContactModal();
          showToast(`Thank you, ${senderName}! Your message was delivered to Laxmi Kumbhar.`, 'fa-paper-plane');
        }, 1200);
      }
    });
  }

  // Initialize both modal form and on-page form
  setupContactForm('contact-form', 'submit-form-btn', 'user-name', 'user-email', 'user-message', 'name-error', 'email-error', 'message-error', true);
  setupContactForm('page-contact-form', 'page-submit-form-btn', 'page-user-name', 'page-user-email', 'page-user-message', 'page-name-error', 'page-email-error', 'page-message-error', false);

  // ================= 14. DYNAMIC NEURAL PARTICLE NETWORK CANVAS =================
  const bgCanvas = document.getElementById('bg-canvas');
  let particleColorRGB = [0, 245, 160]; // Default mint
  const accentRGBMap = {
    mint: [0, 245, 160],
    cyan: [0, 217, 245],
    purple: [168, 85, 247],
    amber: [245, 158, 11],
    rose: [244, 63, 94]
  };

  function updateParticleAccent(accentName) {
    if (accentRGBMap[accentName]) {
      particleColorRGB = accentRGBMap[accentName];
    }
  }
  updateParticleAccent(storedAccent);

  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let width = (bgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = window.innerHeight);
    let particles = [];
    const particleCount = Math.min(90, Math.max(35, Math.floor(window.innerWidth / 18)));

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.75;
        this.vy = (Math.random() - 0.5) * 0.75;
        this.radius = Math.random() * 2.2 + 1;
        this.baseAlpha = Math.random() * 0.45 + 0.25;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulseAngle += this.pulseSpeed;

        // Bounce on boundary
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        const dynamicAlpha = Math.max(0.15, this.baseAlpha + Math.sin(this.pulseAngle) * 0.18);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColorRGB[0]}, ${particleColorRGB[1]}, ${particleColorRGB[2]}, ${dynamicAlpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${particleColorRGB[0]}, ${particleColorRGB[1]}, ${particleColorRGB[2]}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with proximity lines
      const maxDistance = 135;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.24;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColorRGB[0]}, ${particleColorRGB[1]}, ${particleColorRGB[2]}, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Update and draw each particle
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Window Resize Handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = bgCanvas.width = window.innerWidth;
        height = bgCanvas.height = window.innerHeight;
      }, 100);
    });
  }

  // ================= 16. 3D TILT EFFECT ON HOVER =================
  const tiltContainers = document.querySelectorAll('.tilt-container');
  tiltContainers.forEach((container) => {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = -(y / (rect.height / 2)) * 8;
      const tiltY = (x / (rect.width / 2)) * 8;

      const card = container.querySelector('.portrait-card, .about-card-photo');
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
      }
    });

    container.addEventListener('mouseleave', () => {
      const card = container.querySelector('.portrait-card, .about-card-photo');
      if (card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.4s ease-out';
      }
    });
  });

  // ================= 17. INTERACTIVE DEVELOPER TERMINAL SANDBOX CLI =================
  const cliInput = document.getElementById('cli-input');
  const cliHistory = document.getElementById('cli-history');
  const cliPills = document.querySelectorAll('.cli-pill-btn');

  const commandResponses = {
    help: `
      <div><strong>AVAILABLE COMMANDS:</strong></div>
      <div>• <code>skills</code> : Full-Stack engineering stack overview</div>
      <div>• <code>frontend</code> : React, JavaScript, HTML5, CSS3, Animations</div>
      <div>• <code>backend</code> : Python 3, Flask REST APIs, NumPy, Pandas, Matplotlib</div>
      <div>• <code>database</code> : MySQL Relational, SQLite, Query Indexing</div>
      <div>• <code>devops</code> : AWS (EC2/S3), Linux CLI, Bash, Git & CI/CD</div>
      <div>• <code>projects</code> : Overview of MedCare+ HMS, NexPlacement & more</div>
      <div>• <code>certificates</code> : View 3 verified internship & course certificates</div>
      <div>• <code>contact</code> : Email & social links for Laxmi Kumbhar</div>
      <div>• <code>clear</code> : Clean terminal window</div>
    `,
    skills: `
      <div><strong>⚡ FULL-STACK SKILLS SUMMARY:</strong></div>
      <div>🎨 <strong>Frontend:</strong> React.js, JavaScript (ES6+), HTML5 Semantic, Modern CSS3 Flex/Grid, CSS Animations, WCAG A11y.</div>
      <div>🐍 <strong>Backend:</strong> Python 3, Flask REST APIs, NumPy Matrix Math, Pandas Wrangling, Matplotlib Charts.</div>
      <div>🗄️ <strong>Databases:</strong> MySQL Relational, SQLite Embedded, Schema Design, Indexing, ACID Integrity.</div>
      <div>☁️ <strong>DevOps & Tools:</strong> AWS (EC2, S3), Linux Bash, Git & GitHub, VS Code, CI/CD Deployments.</div>
    `,
    frontend: `
      <div><strong>⚛️ FRONTEND COMPETENCIES:</strong></div>
      <div>• React.js: Functional Components, Hooks (useState, useEffect, useMemo), Context API, Custom Hooks.</div>
      <div>• Modern CSS: Pure Vanilla CSS, CSS Custom Properties, Glassmorphism, Responsive Media Queries, Keyframe Animations.</div>
      <div>• JavaScript: ES6+ syntax, Async/Await, Fetch API, DOM manipulation, 60FPS Canvas Animation.</div>
    `,
    backend: `
      <div><strong>🐍 PYTHON & BACKEND ARCHITECTURE:</strong></div>
      <div>• Python 3: Object-Oriented Architecture, Data Structures, Multithreading, Scripting.</div>
      <div>• Flask: Microservices, RESTful API endpoints, CORS handling, JWT authentication.</div>
      <div>• NumPy & Pandas: Matrix calculation, dataset transformations, statistical computation.</div>
      <div>• Matplotlib: Automated chart generation, data visualization feeds, export pipelines.</div>
    `,
    database: `
      <div><strong>🗄️ DATABASE & STORAGE SYSTEMS:</strong></div>
      <div>• MySQL: Relational normalization (1NF-3NF), Foreign Keys, Composite Indexes, Transaction control.</div>
      <div>• SQLite: Lightweight embedded storage, fast read/write, zero-config local persistence.</div>
      <div>• Query Optimization: EXPLAIN plan execution, query caching, join optimizations.</div>
    `,
    devops: `
      <div><strong>☁️ DEVOPS & CLOUD INFRASTRUCTURE:</strong></div>
      <div>• AWS: EC2 virtual servers, S3 static assets, Security Groups, IAM roles.</div>
      <div>• Linux: Bash scripting, systemd service management, cron jobs, file permissions.</div>
      <div>• Version Control: Git branching workflows, GitHub Actions, semantic commit conventions.</div>
    `,
    python: `
      <div><strong>🐍 PYTHON DEEP-DIVE:</strong></div>
      <div>Core stack: Python 3.x, Flask, NumPy, Pandas, Matplotlib.</div>
      <div>Capabilities: REST API services, ETL pipelines, automated statistical analytics, dataset cleansing.</div>
    `,
    java: `
      <div><strong>☕ JAVA & OBJECT-ORIENTED PROGRAMMING:</strong></div>
      <div>Core stack: Java SE, OOP Principles, Class Hierarchies, Polymorphism, Exception Handling.</div>
      <div>Capabilities: Algorithmic problem solving, data structure implementation, enterprise backend systems.</div>
    `,
    c: `
      <div><strong>⚡ C PROGRAMMING:</strong></div>
      <div>Core stack: C Language, Pointers, Dynamic Memory Allocation (malloc/free), Structs, System-Level Logic.</div>
    `,
    cpp: `
      <div><strong>⚡ C++ & OBJECT-ORIENTED SYSTEMS:</strong></div>
      <div>Core stack: Modern C++, STL (Standard Template Library), Templates, Memory Management, DSA implementation.</div>
    `,
    dsa: `
      <div><strong>🧩 DATA STRUCTURES & ALGORITHMS (DSA):</strong></div>
      <div>Core areas: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting & Searching, Time/Space Complexity (Big-O).</div>
    `,
    react: `
      <div><strong>⚛️ REACT.JS ECOSYSTEM:</strong></div>
      <div>Core stack: React 18+, Functional UI, State Management, Custom Hook abstractions.</div>
      <div>Capabilities: Component lifecycle, performance memoization, seamless API client integration.</div>
    `,
    aws: `
      <div><strong>☁️ AWS CLOUD DEPLOYMENT:</strong></div>
      <div>Services: Amazon EC2 compute instances, Amazon S3 storage buckets, DNS routing.</div>
    `,
    projects: `
      <div><strong>🚀 FEATURED FULL-STACK PROJECTS:</strong></div>
      <div>1. <strong>MedCare+ HMS:</strong> Hospital Software (React, Python, Flask, MySQL, AWS).</div>
      <div>2. <strong>NexPlacement:</strong> Campus Recruitment Portal (React, Flask, MySQL, Pandas).</div>
      <div>3. <strong>Laxmi Portfolio:</strong> High-Performance Web App (HTML5, Modern CSS3, JS).</div>
      <div>4. <strong>AuraAnalytics:</strong> Data Intelligence Engine (NumPy, Pandas, Matplotlib).</div>
      <div>5. <strong>CloudPulse:</strong> AWS & Linux Telemetry Dashboard (Python, SQLite, Linux).</div>
      <div>6. <strong>OmniStore:</strong> E-Commerce System (React, Flask, MySQL).</div>
    `,
    contact: `
      <div><strong>📬 CONTACT LAXMI KUMBHAR:</strong></div>
      <div>• Email: <a href="mailto:laxmikumbhar589@gmail.com" style="color:var(--accent);text-decoration:underline;">laxmikumbhar589@gmail.com</a></div>
      <div>• LinkedIn: <a href="https://www.linkedin.com/in/laxmi-kumbhar" target="_blank" style="color:var(--accent);text-decoration:underline;">linkedin.com/in/laxmi-kumbhar</a></div>
      <div>• GitHub: <a href="https://github.com/laxmikumbhar589-web" target="_blank" style="color:var(--accent);text-decoration:underline;">github.com/laxmikumbhar589-web</a></div>
    `,
    certificates: `
      <div><strong>📜 VERIFIED PROFESSIONAL CERTIFICATES (3 DOCUMENTS):</strong></div>
      <div>1. <strong>Omegasoft Technologies:</strong> Full Stack Developer Internship (05/01/2026 – 04/02/2026, FC Road Pune).</div>
      <div>2. <strong>TechLeaper Systems Pvt Ltd:</strong> Software Trainee Internship (15/07/2026 – 15/09/2026, Narhe Pune).</div>
      <div>3. <strong>Educative Inc.:</strong> Learn Python 3 Interactive Course (Issued May 09, 2026 • Credential ID: 9ETECBVCCT).</div>
    `,
    cert: `
      <div><strong>📜 VERIFIED PROFESSIONAL CERTIFICATES:</strong></div>
      <div>Type <code>certificates</code> or scroll down to the <strong>#certificates</strong> section on the page to view high-resolution documents in the lightbox viewer.</div>
    `,
    credentials: `
      <div><strong>📜 VERIFIED PROFESSIONAL CERTIFICATES:</strong></div>
      <div>Type <code>certificates</code> or scroll down to the <strong>#certificates</strong> section on the page to view high-resolution documents in the lightbox viewer.</div>
    `,
    about: `
      <div><strong>👩‍💻 ABOUT LAXMI KUMBHAR:</strong></div>
      <div>Third-Year Computer Engineering student passionate about Python, AI/ML, and Software Development. Serving as Student Placement Coordinator.</div>
    `,
    experience: `
      <div><strong>💼 PROFESSIONAL EXPERIENCE & ROLES:</strong></div>
      <div>1. <strong>Student Placement Coordinator (Present 2026):</strong> Training & Placement Cell — Coordinating campus recruitment drives, recruiter relations, and student placement preparation.</div>
      <div>2. <strong>Software Engineer Trainee (15/07/26 – 15/09/26):</strong> TechLeaper Systems Pvt Ltd, Narhe (Pune) — Backend logic, Python data workflows, database modeling.</div>
      <div>3. <strong>Full-Stack Developer Trainee (2026 / 05/01/2026 – 04/02/2026):</strong> Omegasoft Technologies (FC Road, Pune) — React UIs, Python Flask REST APIs, MySQL schemas.</div>
    `,
    resume: `
      <div><strong>📄 RESUME / CV - LAXMI DAULAPPA KUMBHAR:</strong></div>
      <div>• <strong>Education:</strong> B.E. Computer Engineering @ Zeal College of Engineering and Research, Pune (CGPA: 8.91 / 10 • 2028)</div>
      <div>• <strong>Experience:</strong> TechLeaper Systems Pvt. Ltd. (Narhe) | Omegasoft Technologies | CTech Engineers</div>
      <div>• <strong>Leadership:</strong> Student Placement Coordinator (Training & Placement Cell)</div>
      <div>• <a href="MyResume.pdf" target="_blank" download="Laxmi_Kumbhar_Resume.pdf" style="color:var(--accent);text-decoration:underline;font-weight:700;"><i class="fa-solid fa-download"></i> Click here to Download Resume (PDF)</a></div>
    `,
    cv: `
      <div><strong>📄 RESUME / CV - LAXMI DAULAPPA KUMBHAR:</strong></div>
      <div>• <a href="MyResume.pdf" target="_blank" download="Laxmi_Kumbhar_Resume.pdf" style="color:var(--accent);text-decoration:underline;font-weight:700;"><i class="fa-solid fa-download"></i> Click here to Download Resume (PDF)</a></div>
    `
  };

  function executeCliCommand(rawCmd) {
    if (!cliHistory) return;
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear' || cmd === 'cls') {
      cliHistory.innerHTML = '<div class="cli-line intro">Terminal history cleared. Type <strong>help</strong> or click quick chips below:</div>';
      return;
    }

    const commandEntry = document.createElement('div');
    commandEntry.className = 'cli-line';
    commandEntry.innerHTML = `<span class="cli-cmd-echo"><span style="color:var(--accent)">laxmi@fullstack:~$</span> ${rawCmd}</span>`;
    cliHistory.appendChild(commandEntry);

    const responseEntry = document.createElement('div');
    responseEntry.className = 'cli-res-block';

    if (commandResponses[cmd]) {
      responseEntry.innerHTML = commandResponses[cmd];
    } else {
      responseEntry.innerHTML = `<div>Command not found: <code>${rawCmd}</code>. Type <strong>help</strong> to see valid commands.</div>`;
    }

    cliHistory.appendChild(responseEntry);
    cliHistory.scrollTop = cliHistory.scrollHeight;
  }

  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = cliInput.value;
        cliInput.value = '';
        executeCliCommand(val);
      }
    });
  }

  cliPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      executeCliCommand(cmd);
      if (cliInput) cliInput.focus();
    });
  });

  // Update accent hook to refresh particle canvas colors
  const originalApplyAccent = applyAccent;
  applyAccent = function (accentName) {
    originalApplyAccent(accentName);
    updateParticleAccent(accentName);
  };

  // ================= 18. KEYBOARD SHORTCUTS =================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      closeProjectModal();
      closeCertModal();
      closeDrawer();
      if (accentPalette) accentPalette.classList.remove('show');
    }

    const activeTagName = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTagName === 'input' || activeTagName === 'textarea') return;

    if (e.key === 't' || e.key === 'T') {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      showToast(`Theme toggled (${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode)`, 'fa-circle-half-stroke');
    }

    if (e.key === 'c' || e.key === 'C') {
      openContactModal();
    }
  });

});

