document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.trigger-section');
    const tortilla = document.getElementById('tortilla');
    // 増強したパーツに対応するセレクタ
    const cabbages = document.querySelectorAll('.cab-v4');
    const meatsAndSalsas = document.querySelectorAll('.meat-v4, .salsa-v4');
    const finishText = document.getElementById('finish-text');

    const resetIngredients = () => {
        if(tortilla) tortilla.classList.remove('dropped');
        cabbages.forEach(c => c.classList.remove('dropped'));
        meatsAndSalsas.forEach(m => m.classList.remove('dropped'));
        if(finishText) finishText.classList.remove('visible');
    };

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const vh = window.innerHeight;

        // Stage 1: Tortilla (Step 1)
        if (scrolled > vh * 0.8) {
            if(tortilla) tortilla.classList.add('dropped');
        } else {
            if(tortilla) tortilla.classList.remove('dropped');
        }

        // Stage 2: Cabbage Drops (Step 2)
        if (scrolled > vh * 1.8) {
            cabbages.forEach((el, i) => {
                setTimeout(() => {
                    if (window.pageYOffset > vh * 1.8) el.classList.add('dropped');
                }, i * 60); // より細かくバラバラと
            });
        } else {
            cabbages.forEach(el => el.classList.remove('dropped'));
        }

        // Stage 3: Meat & Salsa (Step 3)
        if (scrolled > vh * 2.8) {
            meatsAndSalsas.forEach((el, i) => {
                setTimeout(() => {
                    if (window.pageYOffset > vh * 2.8) el.classList.add('dropped');
                }, i * 80);
            });
        } else {
            meatsAndSalsas.forEach(el => el.classList.remove('dropped'));
        }

        // Stage 4: Finish (Step 4)
        if (scrolled > vh * 3.8) {
            if(finishText) finishText.classList.add('visible');
            const stage = document.querySelector('.taco-stage');
            stage.style.transform = `translateY(${-Math.sin(scrolled * 0.01) * 10}px)`;
        } else {
            if(finishText) finishText.classList.remove('visible');
            const stage = document.querySelector('.taco-stage');
            if(stage) stage.style.transform = 'translateY(0)';
        }

        // Step Labels
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            const label = sec.querySelector('.label-v4');
            if (label) {
                if (rect.top < vh * 0.6 && rect.bottom > vh * 0.4) {
                    label.classList.add('visible');
                } else {
                    label.classList.remove('visible');
                }
            }
        });
    });

    resetIngredients();
});
