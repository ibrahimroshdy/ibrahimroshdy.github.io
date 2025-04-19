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
        setTimeout(updateCursorPosition, 10); // Update after key press is fully processed
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