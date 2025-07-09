// Page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Page exit animation
window.addEventListener('beforeunload', function() {
    document.body.classList.add('page-exit');
});

// Track scroll direction
let lastScrollPosition = 0;
let scrollDirection = 'down'; // Default direction

// Reset animation classes when elements leave viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove previous animation classes
            entry.target.classList.remove('animate-up', 'animate-down');
            
            // Add new animation class based on scroll direction
            if (scrollDirection === 'down') {
                entry.target.classList.add('animate-up');
            } else {
                entry.target.classList.add('animate-down');
            }
        } else {
            // Reset animation classes when element leaves viewport
            entry.target.classList.remove('animate-up', 'animate-down');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Track scroll direction continuously
window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset;
    scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
    lastScrollPosition = currentScrollPosition;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// NAV
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking overlay or links
navOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});