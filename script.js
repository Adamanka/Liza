// ============================================================
//  ЭСМЕРЕРАЛЬДА — СКРИПТЫ
// ============================================================

console.log('✦ Эсмереральда — Сатир Бард ✦');
console.log('«Арлуна одаривает меня удачей... а я хватаю её за хвост»');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📜 История загружена');

    // Плавное появление глав
    const chapters = document.querySelectorAll('.chapter');
    chapters.forEach((chapter, index) => {
        chapter.style.opacity = '0';
        chapter.style.transform = 'translateY(10px)';
        setTimeout(() => {
            chapter.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            chapter.style.opacity = '1';
            chapter.style.transform = 'translateY(0)';
        }, 100 + index * 150);
    });

    // ============================================================
    //  АУДИОПЛЕЕР — D&D СТИЛЬ
    // ============================================================
    const audio = document.getElementById('bgMusic');
    const audioIcon = document.getElementById('audioIcon');
    const audioSlider = document.getElementById('audioSlider');
    const audioVolume = document.getElementById('audioVolume');

    let isPlaying = false;

    // Состояния иконок в стиле D&D
    const ICONS = {
        playing: '♫',
        paused: '♪',
        muted: '♩'
    };

    // Устанавливаем начальную громкость (50%)
    audio.volume = 0.5;

    // Пытаемся запустить музыку при первом взаимодействии с пользователем
    function tryPlayAudio() {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                audioIcon.textContent = ICONS.playing;
            }).catch(() => {
                audioIcon.textContent = ICONS.muted;
            });
        }
    }

    // Запускаем при первом клике/касании по странице
    document.addEventListener('click', tryPlayAudio, { once: true });
    document.addEventListener('touchstart', tryPlayAudio, { once: true });

    // Клик по иконке — вкл/выкл
    audioIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            audioIcon.textContent = ICONS.paused;
        } else {
            audio.play().then(() => {
                isPlaying = true;
                audioIcon.textContent = ICONS.playing;
            }).catch(() => {
                audioIcon.textContent = ICONS.muted;
            });
        }
    });

    // Ползунок громкости
    audioSlider.addEventListener('input', function() {
        const val = parseInt(this.value);
        audio.volume = val / 100;
        audioVolume.textContent = val + '%';

        // Меняем иконку в зависимости от уровня
        if (val === 0) {
            audioIcon.textContent = ICONS.muted;
        } else if (isPlaying) {
            audioIcon.textContent = ICONS.playing;
        } else {
            audioIcon.textContent = ICONS.paused;
        }

        // Если музыка выключена и громкость > 0 — включаем
        if (!isPlaying && val > 0) {
            audio.play().then(() => {
                isPlaying = true;
                audioIcon.textContent = ICONS.playing;
            }).catch(() => {});
        }
    });

    // Если музыка закончилась — перезапускаем (loop)
    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    });

    // Обновляем иконку при изменении громкости извне
    audio.addEventListener('volumechange', function() {
        const val = Math.round(audio.volume * 100);
        audioSlider.value = val;
        audioVolume.textContent = val + '%';
        if (val === 0) {
            audioIcon.textContent = ICONS.muted;
        } else if (isPlaying) {
            audioIcon.textContent = ICONS.playing;
        } else {
            audioIcon.textContent = ICONS.paused;
        }
    });
});
