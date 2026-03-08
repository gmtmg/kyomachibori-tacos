document.addEventListener('DOMContentLoaded', () => {
    // Advanced Cursor Follower (Magnetic & Smooth)
    const cursor = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Check for touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    document.addEventListener('mousemove', (e) => {
        if (isTouchDevice) return;
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        if (isTouchDevice) return;
        // Linear interpolation for smooth trailing
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover Interaction for Links & Cards
    const interactables = document.querySelectorAll('a, .menu-card, .btn-outline');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(6)`;
            cursor.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
            cursor.style.mixBlendMode = 'normal';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(1)`;
            cursor.style.backgroundColor = 'var(--mexican-yellow)';
            cursor.style.mixBlendMode = 'difference';
        });
    });

    // Intersection Observer for Cinematic Reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-reveal, .animate-pop').forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax on Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-img-inner');
        const heroTitle = document.querySelector('.hero-title-v2');
        
        if (heroImg) {
            heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrolled * 0.15}px)`;
        }

        // Header Transparency Change
        const header = document.querySelector('.glass-header');
        if (scrolled > 50) {
            header.style.backgroundColor = 'rgba(26, 15, 10, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });

    // Smooth Scroll Implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
