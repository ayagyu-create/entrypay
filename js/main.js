/* ============================================================
   EntryPay — Main JavaScript
   ブレーメン株式会社
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Header — scroll shadow
  ---------------------------------------------------------- */
  const header = document.getElementById('site-header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load
  }


  /* ----------------------------------------------------------
     Mobile Navigation
  ---------------------------------------------------------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav  = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));

      // Prevent body scroll when nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when any mobile nav link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
      menuToggle.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }


  /* ----------------------------------------------------------
     FAQ Accordion
  ---------------------------------------------------------- */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer     = btn.closest('.faq-item').querySelector('.faq-answer');

      // Close all others
      document.querySelectorAll('.faq-btn').forEach(otherBtn => {
        if (otherBtn === btn) return;
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.closest('.faq-item')
          .querySelector('.faq-answer')
          .classList.remove('is-open');
      });

      // Toggle current
      btn.setAttribute('aria-expanded', String(!isExpanded));
      answer.classList.toggle('is-open', !isExpanded);
    });
  });


  /* ----------------------------------------------------------
     Smooth active state for nav links (scroll spy — light)
  ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = [];

  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sections.push({ link, el });
  });

  if (sections.length) {
    const onScrollSpy = () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(({ link, el }) => {
        const top    = el.offsetTop;
        const bottom = top + el.offsetHeight;
        link.classList.toggle('is-active', scrollY >= top && scrollY < bottom);
      });
    };
    window.addEventListener('scroll', onScrollSpy, { passive: true });
  }

}());
