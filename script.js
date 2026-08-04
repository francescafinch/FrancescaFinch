// ============================================
// FRANCESCA FINCH — WEBSITE JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== MOBILE NAVIGATION =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ===== FADE-IN SCROLL ANIMATIONS =====
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // ===== FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq__question');
    faqQuestions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other FAQs in the same category
            const category = btn.closest('.faq__grid') || btn.closest('.faq-category');
            if (category) {
                category.querySelectorAll('.faq__item').forEach(function(i) {
                    i.classList.remove('active');
                });
            }

            // Open the clicked one if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== CONTACT FORM =====
    const form = document.getElementById('form');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function(e) {
            // If you're using Formspree, this will work with the form's action URL
            // For demo purposes, we'll show the success state
            // Comment out the preventDefault below when using real form handler

            // e.preventDefault();
            // form.style.display = 'none';
            // if (formSuccess) formSuccess.style.display = 'block';
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = nav ? nav.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});