document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.trigger-section');
    const tortilla = document.getElementById('tortilla');
    const cabbages = document.querySelectorAll('.cabbage');
    const meatsAndSalsas = document.querySelectorAll('.meat, .salsa');
    const finishText = document.getElementById('finish-text');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const vh = window.innerHeight;

        // Stage 1: Tortilla Drop (Step 1)
        if (scrolled > vh * 0.8) {
            tortilla.classList.add('dropped');
            tortilla.style.opacity = '1';
        } else {
            tortilla.classList.remove('dropped');
            tortilla.style.opacity = '0';
        }

        // Stage 2: Cabbage Drops (Step 2)
        if (scrolled > vh * 1.8) {
            cabbages.forEach((el, i) => {
                setTimeout(() => el.classList.add('dropped'), i * 150);
            });
        } else {
            cabbages.forEach(el => el.classList.remove('dropped'));
        }

        // Stage 3: Meat & Salsa (Step 3)
        if (scrolled > vh * 2.8) {
            meatsAndSalsas.forEach((el, i) => {
                setTimeout(() => el.classList.add('dropped'), i * 200);
            });
        } else {
            meatsAndSalsas.forEach(el => el.classList.remove('dropped'));
        }

        // Stage 4: Finish (Step 4)
        if (scrolled > vh * 3.8) {
            finishText.classList.add('visible');
            // Slight celebration bounce for the whole taco
            const stage = document.querySelector('.taco-stage');
            stage.style.transform = `translateY(${-Math.sin(scrolled * 0.01) * 10}px)`;
        } else {
            finishText.classList.remove('visible');
        }

        // Dynamic Label Opacity
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            const label = sec.querySelector('.label');
            if (label && rect.top < vh / 2 && rect.bottom > vh / 2) {
                label.style.opacity = '1';
                label.style.transform = 'scale(1.1) rotate(0deg)';
            } else if (label) {
                label.style.opacity = '0.3';
                label.style.transform = 'scale(1.0) rotate(-3deg)';
            }
        });
    });
});
