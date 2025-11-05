// ========== SHOW/HIDE MENU ==========
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ========== HEADER SCROLL ==========
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// ========== SCROLL TO TOP ==========
const scrollTop = document.getElementById('scrollTop');

function showScrollTop() {
    if (window.scrollY >= 500) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}

window.addEventListener('scroll', showScrollTop);

if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== ACTIVE LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active');
        } else {
            link?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ========== NUMBER COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe stat numbers
const statNumbers = document.querySelectorAll('.stat__number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== PARTICLES ANIMATION ==========
function createParticles(container, count = 30) {
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    createParticles(particlesContainer, 50);
}

// ========== TYPING EFFECT ==========
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--primary-color)';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.borderRight = 'none';
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect
// const typingElement = document.querySelector('.typing-text');
// if (typingElement) {
//     const text = typingElement.textContent;
//     typingElement.textContent = '';
//     setTimeout(() => typeWriter(typingElement, text, 80), 1000);
// }

// ========== PAGE TRANSITIONS ==========
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========== CURSOR EFFECT (Desktop) ==========
if (window.innerWidth > 968) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--secondary-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--primary-color)';
        });
    });
}

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// ========== DEBOUNCE UTILITY ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    scrollHeader();
    scrollActive();
    showScrollTop();
}, 10));

// ========== CONSOLE MESSAGE ==========
console.log('%c¡Hola! 👋', 'font-size: 20px; color: #00ffcc; font-weight: bold;');
console.log('%cGracias por visitar mi portafolio', 'font-size: 14px; color: #FF00FF;');
console.log('%c💼 Josué David Ramos Neira', 'font-size: 12px; color: #A0A0B0;');
console.log('%c📧 Desarrollador Web Junior & Soporte Técnico', 'font-size: 12px; color: #A0A0B0;');
console.log('%c📱 +51 947 424 866', 'font-size: 12px; color: #00ffcc;');

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--primary-color)' : 'var(--error-color)'};
        color: var(--bg-dark);
        border-radius: 0.5rem;
        font-weight: 700;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 255, 204, 0.4);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Make showNotification available globally
window.showNotification = showNotification;

// ========== ANALYTICS TRACKING ==========
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent.trim();
        console.log(`Button clicked: ${btnText}`);
    });
});

// ========== INITIALIZATION ==========
console.log('%c✅ Portafolio inicializado correctamente', 'color: #00ffcc; font-weight: bold;');
