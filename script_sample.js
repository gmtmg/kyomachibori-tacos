document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.trigger-section');
    const tortilla = document.getElementById('tortilla');
    const cabbages = document.querySelectorAll('.cabbage');
    const meatsAndSalsas = document.querySelectorAll('.meat, .salsa');
    const finishText = document.getElementById('finish-text');

    // 最初に全ての具材をリセット状態に
    const resetIngredients = () => {
        tortilla.classList.remove('dropped');
        cabbages.forEach(c => c.classList.remove('dropped'));
        meatsAndSalsas.forEach(m => m.classList.remove('dropped'));
        finishText.classList.remove('visible');
    };

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const vh = window.innerHeight;

        // ステージ1：トルティーヤ（スクロールが1画面分を超えたら）
        if (scrolled > vh * 0.8) {
            tortilla.classList.add('dropped');
        } else {
            tortilla.classList.remove('dropped');
        }

        // ステージ2：キャベツ（スクロールが2画面分を超えたら）
        if (scrolled > vh * 1.8) {
            cabbages.forEach((el, i) => {
                setTimeout(() => el.classList.add('dropped'), i * 150);
            });
        } else {
            cabbages.forEach(el => el.classList.remove('dropped'));
        }

        // ステージ3：肉とサルサ（スクロールが3画面分を超えたら）
        if (scrolled > vh * 2.8) {
            meatsAndSalsas.forEach((el, i) => {
                setTimeout(() => el.classList.add('dropped'), i * 200);
            });
        } else {
            meatsAndSalsas.forEach(el => el.classList.remove('dropped'));
        }

        // ステージ4：完成（スクロールが4画面分を超えたら）
        if (scrolled > vh * 3.8) {
            finishText.classList.add('visible');
        } else {
            finishText.classList.remove('visible');
        }

        // ラベル（ステップ表示）の制御
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

    // 読み込み時に一度実行して初期状態をセット
    resetIngredients();
});
