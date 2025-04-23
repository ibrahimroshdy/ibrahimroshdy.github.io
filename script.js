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
            },
            bubble: {
                distance: 400,
                size: 4,
                duration: 0.3,
                opacity: 1,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    retina_detect: true
});

// After particles are initialized, check if we need to update colors for light mode
document.addEventListener('DOMContentLoaded', function() {
    // Check current theme and update particles if needed
    setTimeout(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            updateParticlesForTheme('light');
        }
    }, 100); // Short delay to ensure particles are initialized
});

// Add particle burst on click
document.addEventListener('click', function(e) {
    // Only create burst if not clicking on interactive elements
    if (!e.target.closest('a') && 
        !e.target.closest('input') && 
        !e.target.closest('.terminal-content') &&
        !e.target.closest('.command-example')) {
        createParticleBurst(e.clientX, e.clientY);
    }
});

function createParticleBurst(x, y) {
    const burstElement = document.createElement('div');
    burstElement.classList.add('particle-burst');
    document.body.appendChild(burstElement);
    
    burstElement.style.left = `${x}px`;
    burstElement.style.top = `${y}px`;
    
    // Create 12 particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.classList.add('burst-particle');
        
        // Random color from the site's palette
        const colors = ['#64ffda', '#ccd6f6', '#8892b0'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Set random direction
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        const size = Math.random() * 6 + 2;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Animation with CSS variables
        particle.style.setProperty('--angle', angle);
        particle.style.setProperty('--speed', speed);
        
        burstElement.appendChild(particle);
    }
    
    // Remove after animation completes
    setTimeout(() => {
        burstElement.remove();
    }, 1000);
}

// Terminal initialization with just about info
document.addEventListener('DOMContentLoaded', function () {
    const terminalContent = document.querySelector('.terminal-content');
    const initialLines = Array.from(terminalContent.children).filter(el => !el.classList.contains('terminal-input-line'));
    
    // Save terminal input line
    const terminalInputLine = terminalContent.querySelector('.terminal-input-line');
    terminalContent.innerHTML = '';

    // Just add about info and input line instead of typing animation
    const aboutCommand = document.createElement('p');
    aboutCommand.className = 'command';
    aboutCommand.textContent = 'ibrahimroshdy@workspace:~> about';
    terminalContent.appendChild(aboutCommand);
    
    const aboutLines = [
        '👋 Hi there! I\'m Ibrahim Roshdy',
        '🤖 Machine Learning Engineer',
        '💻 Software Developer',
        'Passionate about building efficient systems and exploring new technologies.'
    ];
    
    aboutLines.forEach(line => {
        const output = document.createElement('p');
        output.className = 'output';
        output.textContent = line;
        terminalContent.appendChild(output);
    });
    
    // Add input line
    terminalContent.appendChild(terminalInputLine);
    setupTerminalInput();
    
    // Initialize section animations
    initSectionAnimations();
    
    // Initialize typing animations for headings
    initTypingAnimations();
    
    // Initialize card hover effects
    initCardHoverEffects();
    
    // Initialize theme toggle
    initThemeToggle();
});

// Interactive terminal functionality
function setupTerminalInput() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalContent = document.querySelector('.terminal-content');
    const commandExamples = document.querySelectorAll('.command-example');
    const terminalInputLine = document.querySelector('.terminal-input-line');
    const promptElement = document.querySelector('.terminal-prompt-static');

    // Set initial prompt width for cursor positioning
    const promptWidth = promptElement.getBoundingClientRect().width;
    document.documentElement.style.setProperty('--prompt-width', `${promptWidth}px`);
    
    // Command history
    const commandHistory = [];
    let historyIndex = -1;

    // Animated placeholder text
    const placeholderMessages = [
        "try commands below...",
        "write a command...",
        "click on the links below...",
        "try 'help' command..."
    ];
    let currentPlaceholder = 0;
    let isTyping = true;
    let typingIndex = 0;
    let currentMessage = "";
    let typingSpeed = 100;
    let pauseDuration = 2000;

    // Update custom cursor position based on input content
    function updateCursorPosition() {
        const inputValue = terminalInput.value;
        let textWidth = 0;
        
        if (inputValue) {
            textWidth = getTextWidth(inputValue);
        }
        
        // Calculate position based on text content
        document.documentElement.style.setProperty('--cursor-position', `${textWidth}px`);
            }

    // Get text width for cursor positioning
    function getTextWidth(text) {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        context.font = window.getComputedStyle(terminalInput).font;
        return context.measureText(text).width;
    }

    // Listen for input changes to update cursor position
    terminalInput.addEventListener('input', updateCursorPosition);
    terminalInput.addEventListener('click', updateCursorPosition);
    terminalInput.addEventListener('keydown', function(e) {
        // Handle up and down arrows for command history
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
                setTimeout(updateCursorPosition, 10);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
                setTimeout(updateCursorPosition, 10);
            } else if (historyIndex === 0) {
                historyIndex = -1;
                terminalInput.value = '';
                setTimeout(updateCursorPosition, 10);
            }
        } else {
            setTimeout(updateCursorPosition, 10); // Update after key press is fully processed
        }
    });
    
    // Update cursor position on focus/blur
    terminalInput.addEventListener('focus', updateCursorPosition);
    terminalInput.addEventListener('blur', updateCursorPosition);
    
    // Initial cursor positioning
    updateCursorPosition();
    
    // Animate placeholder text
    function animatePlaceholder() {
        if (isTyping) {
            // Typing animation
            if (typingIndex <= placeholderMessages[currentPlaceholder].length) {
                currentMessage = placeholderMessages[currentPlaceholder].substring(0, typingIndex);
                terminalInput.setAttribute('placeholder', currentMessage);
                typingIndex++;
                setTimeout(animatePlaceholder, typingSpeed);
            } else {
                // Done typing, pause before erasing
                isTyping = false;
                setTimeout(animatePlaceholder, pauseDuration);
            }
        } else {
            // Erasing animation
            if (typingIndex > 0) {
                typingIndex--;
                currentMessage = placeholderMessages[currentPlaceholder].substring(0, typingIndex);
                terminalInput.setAttribute('placeholder', currentMessage);
                setTimeout(animatePlaceholder, typingSpeed / 2);
            } else {
                // Done erasing, move to next message
                isTyping = true;
                currentPlaceholder = (currentPlaceholder + 1) % placeholderMessages.length;
                setTimeout(animatePlaceholder, typingSpeed * 2);
            }
        }
    }

    // Start placeholder animation
    setTimeout(animatePlaceholder, 1000);

    // Article data
    const articles = [
        { title: "Django PDF Actions", url: "https://blog.devgenius.io/django-pdf-actions-d4a87960f4ac" },
        { title: "Refresher Project: System Design", url: "https://blog.devgenius.io/refresher-project-a-glimpse-of-system-design-and-architecture-aaef28510dd4" },
        { title: "Refresher Project: Infrastructure", url: "https://blog.devgenius.io/refresher-project-part-2-explaining-how-to-build-a-simple-infrastructure-with-django-celery-ddf7a797c791" },
        { title: "Multi-arch Docker Images", url: "https://blog.devgenius.io/how-to-build-your-docker-images-using-multi-arch-to-support-arm64-m1-macbook-6ebc42a47cd7" },
        { title: "Continuous Integration with GitHub", url: "https://blog.devgenius.io/continuous-integration-github-1130217cc2e9" },
        { title: "NBRefactor: Transform Jupyter Notebooks", url: "https://blog.devgenius.io/nbrefactor-tranform-jupyter-notebooks-to-functional-python-modules-within-seconds-8d4e2af0457e" }
    ];

    // Project data
    const projects = [
        { title: "Django PDF Actions", url: "https://github.com/ibrahimroshdy/django-pdf-actions" },
        { title: "Refresher", url: "https://github.com/ibrahimroshdy/refresher" },
        { title: "Multi-arch GitHub Actions", url: "https://github.com/ibrahimroshdy/multi-arch-github-actions" }
    ];

    // Social data
    const socialLinks = [
        { name: "GitHub", url: "https://github.com/ibrahimroshdy" },
        { name: "Medium", url: "https://medium.com/@ibrahimroshdy" },
        { name: "LinkedIn", url: "https://linkedin.com/in/ibrahim-roshdy" }
    ];

    // Click on command examples
    commandExamples.forEach(example => {
        example.addEventListener('click', () => {
            terminalInput.value = example.textContent;
            processCommand(example.textContent);
        });
    });

    // Process command
    function processCommand(cmd) {
        // Add command to history
        if (cmd.trim() !== '') {
            commandHistory.unshift(cmd);
            if (commandHistory.length > 20) {
                commandHistory.pop();
            }
            historyIndex = -1;
        }
        
        // Add command to terminal
        const commandElement = document.createElement('p');
        commandElement.className = 'command';
        commandElement.textContent = `ibrahimroshdy@workspace:~> ${cmd}`;
        
        // Insert before the input line
        const inputLine = document.querySelector('.terminal-input-line');
        terminalContent.insertBefore(commandElement, inputLine);
        
        // Process the command
        const command = cmd.trim().toLowerCase();
        
        if (command === 'help') {
            addOutput('Available commands:');
            addOutput('- articles: List all my articles');
            addOutput('- projects: List my GitHub projects');
            addOutput('- about: Learn more about me');
            addOutput('- social: Show my social links');
            addOutput('- clear: Clear the terminal');
            addOutput('- history: Show command history');
            addOutput('- theme [light/dark]: Change site theme');
            addOutput('- matrix: Show a matrix animation');
            addOutput('- help: Show this help message');
        } 
        else if (command === 'articles') {
            addOutput('Here are my articles:');
            articles.forEach((article, index) => {
                const articleElement = document.createElement('p');
                articleElement.className = 'clickable-output';
                articleElement.textContent = `${index + 1}. ${article.title}`;
                articleElement.dataset.url = article.url;
                articleElement.addEventListener('click', () => {
                    window.open(article.url, '_blank');
                });
                terminalContent.insertBefore(articleElement, inputLine);
            });
        } 
        else if (command === 'projects') {
            addOutput('Here are my projects:');
            projects.forEach((project, index) => {
                const projectElement = document.createElement('p');
                projectElement.className = 'clickable-output';
                projectElement.textContent = `${index + 1}. ${project.title}`;
                projectElement.dataset.url = project.url;
                projectElement.addEventListener('click', () => {
                    window.open(project.url, '_blank');
                });
                terminalContent.insertBefore(projectElement, inputLine);
            });
        } 
        else if (command === 'about') {
            addOutput('👋 Hi there! I\'m Ibrahim Roshdy');
            addOutput('🤖 Machine Learning Engineer');
            addOutput('💻 Software Developer');
            addOutput('Passionate about building efficient systems and exploring new technologies.');
        } 
        else if (command === 'social') {
            addOutput('Connect with me:');
            socialLinks.forEach(social => {
                const socialElement = document.createElement('p');
                socialElement.className = 'output';
                
                const linkElement = document.createElement('a');
                linkElement.className = 'social-link';
                linkElement.textContent = social.name;
                linkElement.href = social.url;
                linkElement.target = '_blank';
                
                socialElement.appendChild(document.createTextNode('- '));
                socialElement.appendChild(linkElement);
                
                terminalContent.insertBefore(socialElement, inputLine);
            });
        } 
        else if (command === 'clear') {
            // Remove all elements except input line
            while (terminalContent.firstChild) {
                if (terminalContent.firstChild.classList.contains('terminal-input-line')) {
                    break;
                }
                terminalContent.removeChild(terminalContent.firstChild);
            }
        }
        else if (command === 'history') {
            if (commandHistory.length === 0) {
                addOutput('No command history yet.');
            } else {
                addOutput('Command history:');
                commandHistory.forEach((cmd, index) => {
                    addOutput(`${index + 1}. ${cmd}`);
                });
            }
        }
        else if (command.startsWith('theme ')) {
            const theme = command.substring(6).trim();
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                updateParticlesForTheme('light');
                addOutput('Theme switched to light mode.');
            } else if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                updateParticlesForTheme('dark');
                addOutput('Theme switched to dark mode.');
            } else {
                addOutput(`Unknown theme: ${theme}`);
                addOutput('Available themes: light, dark');
            }
            // Save theme preference
            localStorage.setItem('theme', theme === 'light' ? 'light' : 'dark');
        }
        else if (command === 'matrix') {
            addOutput('Initializing Matrix animation...');
            setTimeout(() => {
                showMatrixAnimation();
            }, 500);
        }
        else if (command.startsWith('open ')) {
            const target = command.substring(5).trim();
            if (target === 'articles') {
                document.querySelector('#articles').scrollIntoView({ behavior: 'smooth' });
                addOutput('Scrolling to articles section...');
            } else if (target === 'projects') {
                document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
                addOutput('Scrolling to projects section...');
            } else {
                addOutput(`Unknown section: ${target}`);
            }
        }
        else {
            addOutput(`Command not found: ${command}`);
            addOutput('Type "help" to see available commands');
        }
        
        // Clear input and scroll to bottom
        terminalInput.value = '';
        scrollToBottom();
    }
    
    // Add output to terminal
    function addOutput(text) {
        const outputElement = document.createElement('p');
        outputElement.className = 'output';
        outputElement.textContent = text;
        
        const inputLine = document.querySelector('.terminal-input-line');
        terminalContent.insertBefore(outputElement, inputLine);
    }
    
    // Scroll to bottom of terminal
    function scrollToBottom() {
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    // Matrix animation
    function showMatrixAnimation() {
        const overlay = document.createElement('div');
        overlay.classList.add('matrix-overlay');
        document.body.appendChild(overlay);
        
        const canvas = document.createElement('canvas');
        canvas.classList.add('matrix-canvas');
        overlay.appendChild(canvas);
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        closeBtn.classList.add('matrix-close');
        overlay.appendChild(closeBtn);
        
        closeBtn.addEventListener('click', () => {
            overlay.remove();
        });
        
        // Matrix animation code
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const columns = Math.floor(canvas.width / 20);
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
        
        const characters = '01イウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
        }
    }

        const matrixInterval = setInterval(draw, 50);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                clearInterval(matrixInterval);
                overlay.remove();
            }
        });
    }
    
    // Handle terminal input
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            if (command) {
                processCommand(command);
            }
        }
    });
    
    // Focus terminal input on click anywhere in terminal
    terminalContent.addEventListener('click', function() {
        terminalInput.focus();
    });
}

// Initialize section animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
}

// Initialize typing animations for headings
function initTypingAnimations() {
    const titles = document.querySelectorAll('h2');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                element.textContent = '';
                element.classList.add('typing-animation');
                
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 70);
                
                observer.unobserve(element);
            }
        });
    }, options);
    
    titles.forEach(title => {
        observer.observe(title);
    });
}

// Initialize card hover effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.article-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardHover);
        card.addEventListener('mouseleave', resetCardPosition);
    });
    
    function handleCardHover(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on mouse position
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Apply transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    
    function resetCardPosition(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

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

// Initialize theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        updateParticlesForTheme('light');
    } else if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateParticlesForTheme('light');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation effect
        const ripple = document.createElement('span');
        ripple.classList.add('theme-toggle-ripple');
        themeToggle.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
        
        // Update particles for the new theme
        updateParticlesForTheme(newTheme);
    });
}

// Update particles colors and opacity based on theme
function updateParticlesForTheme(theme) {
    if (window.pJSDom && window.pJSDom[0]) {
        const particlesJS = window.pJSDom[0].pJS;
        let particleColor, lineColor, opacity;
        
        if (theme === 'dark') {
            particleColor = '#64ffda';
            lineColor = '#64ffda';
            opacity = 0.3;
        } else {
            // Darker colors for light mode
            particleColor = '#057864'; // Darker teal for light mode
            lineColor = '#057864';
            opacity = 0.5; // More opaque for light mode
        }
        
        // Update particles color
        particlesJS.particles.array.forEach(p => {
            p.color.value = particleColor;
            p.opacity.value = opacity;
        });
        
        // Update lines color
        particlesJS.particles.line_linked.color = lineColor;
        particlesJS.particles.line_linked.opacity = opacity;
        particlesJS.particles.line_linked.color_rgb_line = hexToRgb(lineColor);
    }
}

// Helper function to convert hex to RGB for particles.js
function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return {
        r: r,
        g: g,
        b: b
    };
} 