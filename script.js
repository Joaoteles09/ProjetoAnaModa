document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Efeito magnético de seguir o mouse (Parallax e 3D) na seção de Visão
    const visionSection = document.querySelector('.vision-section');
    const visionHeading = document.querySelector('.vision-heading');

    if (visionSection && visionHeading) {
        visionSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = visionSection.getBoundingClientRect();
            
            // Calcula o eixo de -1 a 1 a partir do centro da section
            const x = (clientX - left - width / 2) / (width / 2);
            const y = (clientY - top - height / 2) / (height / 2);

            // Define o quanto a frase vai se mover para os lados e a rotação 3D
            const moveX = x * 40; 
            const moveY = y * 40;
            
            visionHeading.style.transform = `translate(${moveX}px, ${moveY}px) perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
        });

        // Quando o mouse sai, ele volta pro centro suavemente
        visionSection.addEventListener('mouseleave', () => {
            visionHeading.style.transform = 'translate(0, 0) perspective(1000px) rotateX(0) rotateY(0)';
            visionHeading.style.transition = 'transform 0.6s ease-out';
        });

        // Quando o mouse entra, a resposta fica mais rápida e direta ao movimento
        visionSection.addEventListener('mouseenter', () => {
            visionHeading.style.transition = 'transform 0.1s linear';
        });
    }

    // Efeito de Letras Pulando no Footer
    const footerTitles = document.querySelectorAll('.footer-cta h2');
    let letterDelay = 0;
    
    footerTitles.forEach((title) => {
        if (!title.classList.contains('footer-title-script')) {
            const text = title.textContent;
            title.textContent = '';
            [...text].forEach((char) => {
                const span = document.createElement('span');
                span.textContent = char;
                if (char.trim() !== '') {
                    span.classList.add('jump-letter');
                    span.style.animationDelay = `${letterDelay}s`;
                    letterDelay += 0.1;
                } else {
                    span.style.width = '15px';
                    span.style.display = 'inline-block';
                }
                title.appendChild(span);
            });
        } else {
            title.classList.add('jump-word');
            title.style.animationDelay = `${letterDelay}s`;
            letterDelay += 0.3; // Pausa pra a palavra Script inteira pular
        }
    });
});
