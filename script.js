// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        color: {
            value: '#64ffda'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#64ffda',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Typing effect for terminal
document.addEventListener('DOMContentLoaded', function () {
    const terminalContent = document.querySelector('.terminal-content');
    const lines = Array.from(terminalContent.children);
    terminalContent.innerHTML = '';

    let currentLine = 0;
    let currentChar = 0;
    const speed = 30;

    function typeWriter() {
        if (currentLine < lines.length) {
            if (currentChar === 0) {
                terminalContent.appendChild(document.createElement('p'));
                terminalContent.lastElementChild.className = lines[currentLine].className;
            }

            if (currentChar < lines[currentLine].textContent.length) {
                terminalContent.lastElementChild.textContent += lines[currentLine].textContent[currentChar];
                currentChar++;
                setTimeout(typeWriter, speed);
            } else {
                currentLine++;
                currentChar = 0;
                setTimeout(typeWriter, speed * 2);
            }
        }
    }

    setTimeout(typeWriter, 500);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 