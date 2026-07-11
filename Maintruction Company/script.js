document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopBtn?.classList.add('show');
        } else {
            backToTopBtn?.classList.remove('show');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon?.classList.replace('fa-bars', 'fa-times');
            } else {
                icon?.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 4. Number Counters Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                    // Add "+" if it had one originally or based on attr
                    if(counter.hasAttribute('data-plus')) {
                        counter.innerText += '+';
                    }
                }
            };
            updateCounter();
        });
    };

    // Observer for counters
    const counterSection = document.querySelector('.stats-section');
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                runCounters();
                hasCounted = true;
            }
        }, { threshold: 0.5 });
        counterObserver.observe(counterSection);
    }

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const content = faq.querySelector('.faq-content');
                if(content) content.style.maxHeight = null;
                const icon = faq.querySelector('.faq-header i');
                if(icon) icon.style.transform = 'rotate(0deg)';
            });

            // If wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.faq-content');
                if(content) content.style.maxHeight = content.scrollHeight + 'px';
                const icon = item.querySelector('.faq-header i');
                if(icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 6. Loading Screen
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 800);
        });
    }

    // 7. Close mobile nav on link click
    const mobileNavLinks = document.querySelectorAll('.nav-links li a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger?.querySelector('i');
                icon?.classList.replace('fa-times', 'fa-bars');
            }
        });
    });
});
