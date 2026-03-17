/**
 * CREATIVE WEB JOURNAL - INTERACTIVE SCRIPTS
 * Adding playful interactions and smooth animations
 * to enhance the scrapbook experience
 */

// ==========================================
// DOM CONTENT LOADED
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeHoverEffects();
    initializeScrollEffects();
    initializeButtonInteractions();
    initializeImageModal();
    initializePhotoStack();
});

// ==========================================
// INITIALIZE ANIMATIONS
// ==========================================

function initializeAnimations() {
    // Add entrance animations to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all major sections
    const sections = document.querySelectorAll('section, .entry-card, .mood-card');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==========================================
// HOVER EFFECTS
// ==========================================

function initializeHoverEffects() {
    // Add subtle hover effects to cards
    const cards = document.querySelectorAll('.mood-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 12px 32px rgba(139, 58, 58, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            // Return to original shadow
            this.style.boxShadow = '';
        });
    });

    // Add special effect to decorative elements
    const decorations = document.querySelectorAll('.decoration');
    decorations.forEach(decoration => {
        decoration.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.opacity = '0.8';
        });

        decoration.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.opacity = '0.6';
        });
    });
}

// ==========================================
// SCROLL EFFECTS
// ==========================================

function initializeScrollEffects() {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Parallax effect for decorative elements
        const decorations = document.querySelectorAll('.decoration');
        decorations.forEach((decoration, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(currentScrollY * speed * 0.01);
            decoration.style.transform = `translateY(${yPos}px)`;
        });

        // Update scroll direction for potential future use
        lastScrollY = currentScrollY;
    });
}

// ==========================================
// BUTTON INTERACTIONS
// ==========================================

function initializeButtonInteractions() {
    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Smooth scroll to first journal entry
            const firstEntry = document.querySelector('.entry-card');
            if (firstEntry) {
                firstEntry.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    // Read More buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    // This is now handled by the modal listener on the parent .entry-card
}

// ==========================================
// IMAGE MODAL INTERACTION
// ==========================================

function initializeImageModal() {
    const modal = document.getElementById('image-modal');
    if (!modal) return;
    
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-modal');
    
    // Select entry cards to make the whole card clickable
    const entryCards = document.querySelectorAll('.entry-card');
    
    entryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // The new cards don't have images, but we still want the modal to pop up.
            // We will just show the modal frame without setting an image source.
            e.stopPropagation();
            modal.style.display = 'flex';
            
            // Clear any previous image to avoid showing old content
            modalImg.src = "";
            
            // Force reflow to ensure transition works
            void modal.offsetWidth;
            modal.classList.add('show');
        });
    });
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// ==========================================
// PHOTO STACK INTERACTION
// ==========================================

function initializePhotoStack() {
    const stacks = document.querySelectorAll('.photo-stack');
    stacks.forEach(stack => {
        stack.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Add CSS animations dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Add subtle pulse animation to CTA button */
        .cta-button {
            animation: gentlePulse 3s ease-in-out infinite;
        }

        @keyframes gentlePulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(247, 199, 211, 0.4);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(247, 199, 211, 0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional styles
addAnimationStyles();

// ==========================================
// RESPONSIVE INTERACTIONS
// ==========================================

// Add touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});

    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('.mood-card, .cta-button, .read-more-btn, .send-btn');

    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll effects
window.addEventListener('scroll', throttle(initializeScrollEffects, 16)); // ~60fps