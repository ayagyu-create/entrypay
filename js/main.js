/* ============================================================
   entry pay — Main JavaScript
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
    onScroll();
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
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

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

}());
