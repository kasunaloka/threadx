document.addEventListener('DOMContentLoaded', function() {
    // Original navbar functionality 
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.padding = '0.7rem 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(navItem => {
            // Reset state for all nav items
            navItem.classList.remove('active');
            navItem.removeAttribute('aria-current');

            const href = navItem.getAttribute('href');
            let isActive = false;

            // Check if the link corresponds to the current section
            if (href && href.includes(current) && current !== '') {
                isActive = true;
            }

            // Special case: Home is active when at the top
            if (window.scrollY < 200 && navItem === navItems[0]) {
                 // Ensure only Home is active at the very top
                navItems.forEach(item => {
                    item.classList.remove('active');
                    item.removeAttribute('aria-current');
                });
                isActive = true;
            }

            // Apply active state and aria-current
            if (isActive) {
                navItem.classList.add('active');
                navItem.setAttribute('aria-current', 'page');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Removed glitch effect JS. Hover effect handled by CSS.
    
    // Animation functionality
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .content-text, .content-image, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    const setInitialState = () => {
        const elements = document.querySelectorAll('.feature-card, .content-text, .content-image, .section-header');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };
    
    setInitialState();
    animateOnScroll(); // Run once on load
    window.addEventListener('scroll', animateOnScroll);
    
    // Hero Slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Start the slideshow
    if (slides.length > 0) {
        let slideTimer = setInterval(nextSlide, slideInterval);
        
        // Pause on hover (optional)
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseleave', () => {
                slideTimer = setInterval(nextSlide, slideInterval);
            });
            
            hero.addEventListener('mouseenter', () => {
                clearInterval(slideTimer);
            });
        }
    }
});
// Slideshow functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-advance slides
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});