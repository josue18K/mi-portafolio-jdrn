// ========== PARTICLES SYSTEM ==========
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            color: options.color || '#00ffcc',
            maxSize: options.maxSize || 4,
            minSize: options.minSize || 2,
            maxSpeed: options.maxSpeed || 2,
            minSpeed: options.minSpeed || 0.5
        };
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.container.style.position = 'absolute';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.overflow = 'hidden';
        this.container.style.pointerEvents = 'none';
        
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${this.options.color};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    destroy() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }
}

// Initialize particle systems
const heroParticles = document.getElementById('particles');
if (heroParticles) {
    new ParticleSystem(heroParticles, {
        count: 50,
        color: '#00ffcc',
        maxSize: 3,
        minSize: 1
    });
}

const footerParticles = document.querySelector('.footer__particles');
if (footerParticles) {
    new ParticleSystem(footerParticles, {
        count: 30,
        color: '#FF00FF',
        maxSize: 2,
        minSize: 1
    });
}

// ========== GLITCH TEXT EFFECT ==========
class GlitchText {
    constructor(element, options = {}) {
        this.element = element;
        this.text = element.textContent;
        this.options = {
            duration: options.duration || 3000,
            interval: options.interval || 50
        };
        
        this.element.setAttribute('data-text', this.text);
        this.startGlitch();
    }

    startGlitch() {
        setInterval(() => {
            if (Math.random() > 0.95) {
                this.glitch();
            }
        }, this.options.interval);
    }

    glitch() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        const originalText = this.text;
        let iterations = 0;
        
        const interval = setInterval(() => {
            this.element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= originalText.length) {
                clearInterval(interval);
            }
        }, 30);
    }
}

// Apply glitch effect to title (optional)
// const heroTitle = document.querySelector('.hero__title');
// if (heroTitle) {
//     new GlitchText(heroTitle);
// }

// ========== MATRIX RAIN EFFECT ==========
class MatrixRain {
    constructor(container) {
        this.container = container;
        this.columns = 50;
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        for (let i = 0; i < this.columns; i++) {
            this.createColumn(i);
        }
    }

    createColumn(index) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${(index / this.columns) * 100}%`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        column.style.animationDuration = `${Math.random() * 5 + 5}s`;
        
        this.container.appendChild(column);
    }
}

// Initialize matrix rain (optional)
// const matrixContainer = document.querySelector('.matrix-rain');
// if (matrixContainer) {
//     new MatrixRain(matrixContainer);
// }

// ========== WAVE ANIMATION ==========
function createWaveAnimation() {
    const wave = document.createElement('div');
    wave.className = 'wave-animation';
    wave.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
        opacity: 0.1;
        animation: wave-move 10s ease-in-out infinite;
    `;
    
    return wave;
}

// ========== SCANNER LINE EFFECT ==========
class ScannerEffect {
    constructor(element) {
        this.element = element;
        if (this.element) {
            this.init();
        }
    }

    init() {
        const scanner = document.createElement('div');
        scanner.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
            animation: scan 3s linear infinite;
            pointer-events: none;
        `;
        
        this.element.style.position = 'relative';
        this.element.appendChild(scanner);
    }
}

// ========== PARALLAX EFFECT ==========
class ParallaxEffect {
    constructor() {
        this.layers = document.querySelectorAll('[data-parallax]');
        if (this.layers.length > 0) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            this.layers.forEach(layer => {
                const speed = layer.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrollY * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

new ParallaxEffect();

// ========== TILT EFFECT ==========
class TiltEffect {
    constructor(elements) {
        this.elements = elements;
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

const tiltElements = document.querySelectorAll('.tilt-effect');
if (tiltElements.length > 0) {
    new TiltEffect(tiltElements);
}

// ========== MAGNETIC BUTTON EFFECT ==========
class MagneticEffect {
    constructor(elements) {
        this.elements = elements;
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
}

const magneticButtons = document.querySelectorAll('.btn');
if (magneticButtons.length > 0) {
    new MagneticEffect(magneticButtons);
}

// ========== RIPPLE CLICK EFFECT ==========
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.cssText = `
        position: absolute;
        width: ${diameter}px;
        height: ${diameter}px;
        left: ${event.clientX - button.offsetLeft - radius}px;
        top: ${event.clientY - button.offsetTop - radius}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    `;
    
    const ripples = button.getElementsByClassName('ripple-effect');
    if (ripples.length > 0) {
        ripples[0].remove();
    }
    
    circle.className = 'ripple-effect';
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(circle);
    
    setTimeout(() => circle.remove(), 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Apply ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ========== TEXT SCRAMBLE EFFECT ==========
class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.element.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ========== MOUSE FOLLOW EFFECT ==========
class MouseFollower {
    constructor() {
        this.follower = document.createElement('div');
        this.follower.className = 'mouse-follower';
        this.follower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease-out, opacity 0.3s ease;
            opacity: 0;
        `;
        
        document.body.appendChild(this.follower);
        this.init();
    }

    init() {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            this.follower.style.opacity = '0.5';
        });
        
        document.addEventListener('mouseleave', () => {
            this.follower.style.opacity = '0';
        });
        
        const animate = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            this.follower.style.left = followerX - 20 + 'px';
            this.follower.style.top = followerY - 20 + 'px';
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Initialize mouse follower on desktop
if (window.innerWidth > 968) {
    new MouseFollower();
}

// ========== CONSOLE LOG ==========
console.log('%c🎨 Animations Module Loaded', 'color: #00ffcc; font-weight: bold; font-size: 14px;');
