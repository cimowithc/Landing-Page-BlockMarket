// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const nav = document.querySelector('nav');
let lastScroll = 0;
let scrollTimer = null;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class for styling with a threshold
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Clear the existing timer
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }

    // Set a new timer
    scrollTimer = setTimeout(() => {
        // Show nav when user stops scrolling
        nav.style.transform = 'translateY(0)';
    }, 150);

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Whitepaper navigation
const whitepaperNavButtons = document.querySelectorAll('.whitepaper-nav button');
const whitepaperSections = document.querySelectorAll('.whitepaper-section');

whitepaperNavButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        whitepaperNavButtons.forEach(btn => btn.classList.remove('active'));
        whitepaperSections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked button and corresponding section
        button.classList.add('active');
        const targetSection = document.querySelector(`#${button.dataset.section}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Initialize first section as active
if (whitepaperNavButtons.length > 0 && whitepaperSections.length > 0) {
    whitepaperNavButtons[0].classList.add('active');
    whitepaperSections[0].classList.add('active');
}

document.querySelectorAll('.feature-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
