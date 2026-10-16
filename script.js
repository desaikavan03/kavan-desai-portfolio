// Persisted light/dark theme across every portfolio page.
const themeButtons = document.querySelectorAll('.theme-toggle');
const themeIcon = (button) => button.querySelector('.theme-toggle-icon');
const updateThemeControls = (theme) => {
  themeButtons.forEach((button) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${nextTheme} theme`;
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    const icon = themeIcon(button);
    if (icon) icon.textContent = theme === 'dark' ? '☀︎' : '☾︎';
  });
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#151713' : '#f7f5ef');
};
let activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
updateThemeControls(activeTheme);
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
    if (activeTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    updateThemeControls(activeTheme);
    try { localStorage.setItem('kavan-portfolio-theme', activeTheme); } catch (_) {}
  });
});

// Thin top progress indicator adds a little feedback while scrolling.
const progressRoot = document.documentElement;
let progressTicking = false;
const topButton = document.createElement('button');
topButton.className = 'floating-back-top';
topButton.type = 'button';
topButton.setAttribute('aria-label', 'Back to top');
topButton.innerHTML = '<span class="top-arrow" aria-hidden="true">↑︎</span><span>Back to top</span>' ;
document.body.appendChild(topButton);
const scrollToTop = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
};
topButton.addEventListener('click', scrollToTop);
document.querySelectorAll('.back-top').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToTop();
  });
});
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  progressRoot.style.setProperty('--scroll-progress', String(progress));
  topButton.classList.toggle('is-visible', window.scrollY > 420);
  progressTicking = false;
};
window.addEventListener('scroll', () => {
  if (!progressTicking) {
    progressTicking = true;
    window.requestAnimationFrame(updateScrollProgress);
  }
}, { passive: true });
window.addEventListener('resize', updateScrollProgress, { passive: true });
updateScrollProgress();


const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav?.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  });
});

// Portfolio category filters.
const filterButtons = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      card.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
    });
    const lijjatGallery = document.querySelector('.lijjat-gallery');
    if (lijjatGallery) {
      const categories = (lijjatGallery.dataset.category || '').split(' ');
      lijjatGallery.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
    }
  });
});

// Bring content into view with a gentle, staggered reveal as visitors scroll.
// Do not add nested reveal animations inside an element that already reveals as a group.
const motionSelector = [
  '.featured-project', '.directory-card', '.client-logo-card', '.standee-card',
  '.process-step', '.service-row', '.project-card', '.section-heading',
  '.client-group-head', '.services-intro', '.about-art', '.about-copy',
  '.contact-copy', '.contact-methods', '.contact-form', '.project-index-hero',
  '.directory-footer-cta', '.all-projects-cta', '.work-note', '.case-hero-copy',
  '.case-hero-logo', '.case-scope-heading', '.case-scope-grid', '.case-note-card',
  '.case-next', '.lijjat-gallery-heading', '.lijjat-subsection-heading',
  '.footer-top', '.footer-bottom'
].join(',');
const motionTargets = document.querySelectorAll(motionSelector);
motionTargets.forEach((item, index) => {
  if (item.classList.contains('reveal') || item.parentElement?.closest('.reveal')) return;
  item.classList.add('reveal');
  if (index % 4 === 1) item.classList.add('reveal-delay');
  else if (index % 4 === 2) item.classList.add('reveal-delay-2');
  else if (index % 4 === 3) item.classList.add('reveal-delay-3');
});
// Gentle entrance effects. Content remains visible if IntersectionObserver is unavailable.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -3% 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Small, pointer-based magnetic movement for primary controls on desktop only.
// Touch screens and visitors who prefer reduced motion are deliberately excluded.
const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (hasFinePointer && !prefersLessMotion) {
  document.querySelectorAll('.button, .theme-toggle, .site-nav .nav-cta').forEach((control) => {
    control.addEventListener('pointermove', (event) => {
      const rect = control.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) / Math.max(rect.width / 2, 1);
      const dy = (event.clientY - rect.top - rect.height / 2) / Math.max(rect.height / 2, 1);
      control.style.setProperty('--mag-x', `${(dx * 3).toFixed(2)}px`);
      control.style.setProperty('--mag-y', `${(dy * 3).toFixed(2)}px`);
    });
    control.addEventListener('pointerleave', () => {
      control.style.setProperty('--mag-x', '0px');
      control.style.setProperty('--mag-y', '0px');
    });
  });
}

// Highlight the section currently in view on the homepage navigation.
const pageSections = document.querySelectorAll('main section[id]');
const sectionNavLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')]
  .filter((link) => document.querySelector(link.getAttribute('href')));
if ('IntersectionObserver' in window && pageSections.length && sectionNavLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionNavLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-22% 0px -62% 0px', threshold: 0 });
  pageSections.forEach((section) => sectionObserver.observe(section));
}

// Current year in footer.
const yearNode = document.querySelector('#year');
if (yearNode) yearNode.textContent = String(new Date().getFullYear());

// Contact form posts directly to the configured form service endpoint in index.html.
// The form provider requires one-time email activation before messages are delivered.


// Lijjat brand collateral preview lightbox (standees, table stands and brochure pages).
const standeeDialog = document.querySelector('#standee-lightbox');
const standeeDialogImage = document.querySelector('#standee-lightbox-image');
const standeeDialogCaption = document.querySelector('#standee-lightbox-caption');
const standeeClose = standeeDialog?.querySelector('.lightbox-close');
document.querySelectorAll('.standee-open').forEach((button) => {
  button.addEventListener('click', () => {
    const imagePath = button.dataset.image;
    const caption = button.dataset.caption || 'Lijjat Khaman House standee design';
    if (!standeeDialog || !standeeDialogImage || !imagePath) return;
    standeeDialogImage.src = imagePath;
    standeeDialogImage.alt = caption;
    if (standeeDialogCaption) standeeDialogCaption.textContent = caption;
    if (typeof standeeDialog.showModal === 'function') standeeDialog.showModal();
    else window.open(imagePath, '_blank', 'noopener');
  });
});
standeeClose?.addEventListener('click', () => standeeDialog?.close());
standeeDialog?.addEventListener('click', (event) => {
  if (event.target === standeeDialog) standeeDialog.close();
});
