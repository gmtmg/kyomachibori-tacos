document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.trigger-section');
    const tortilla = document.getElementById('tortilla');
    const cabbages = document.querySelectorAll('.cabbage-leaf');
    const meatsAndSalsas = document.querySelectorAll('.meat-chunk, .salsa-drop');
    const finishText = document.getElementById('finish-text');

    // Reset All Ingredients
    const resetIngredients = () => {
        tortilla.classList.remove('dropped');
        cabbages.forEach(c => c.classList.remove('dropped'));
        meatsAndSalsas.forEach(m => m.classList.remove('dropped'));
        finishText.classList.remove('visible');
    };

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const vh = window.innerHeight;

        // Stage 1: Tortilla (Step 1)
        if (scrolled > vh * 0.8) {
            tortilla.classList.add('dropped');
        } else {
            tortilla.classList.remove('dropped');
        }

        // Stage 2: Cabbage Leaves (Step 2)
        if (scrolled > vh * 1.8) {
            cabbages.forEach((el, i) => {
                setTimeout(() => el.classList.add('dropped'), i * 150);
            });
        } else {
            cabbages.forEach(el => el.classList.remove('dropped'));
        }

        // Stage 3: Meat Chunks & Salsa Drops (Step 3)
        if (scrolled > vh * 2.8) {
            meatsAndSalsas.forEach((el, i) => {
                setTimeout(() => el.classList.add('dropped'), i * 180);
            });
        } else {
            meatsAndSalsas.forEach(el => el.classList.remove('dropped'));
        }

        // Stage 4: Finish Celebration (Step 4)
        if (scrolled > vh * 3.8) {
            finishText.classList.add('visible');
            // Subtle celebration shake for the whole scene
            const stage = document.querySelector('.taco-stage');
            stage.style.transform = `translateY(${-Math.sin(scrolled * 0.01) * 8}px)`;
        } else {
            finishText.classList.remove('visible');
            document.querySelector('.taco-stage').style.transform = 'translateY(0)';
        }

        // Step Label Feedback
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            const label = sec.querySelector('.label');
            if (label) {
                if (rect.top < vh * 0.5 && rect.bottom > vh * 0.5) {
                    label.classList.add('visible');
                } else {
                    label.classList.remove('visible');
                }
            }
        });
    });

    // Initialize
    resetIngredients();
});
