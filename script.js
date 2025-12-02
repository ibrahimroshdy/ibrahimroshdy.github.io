// ============================================
// Theme Toggle
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update chart colors if chart exists
        if (window.activityChart) {
            updateChartColors();
        }
    });
    
    // Listen for system preference changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            if (window.activityChart) {
                updateChartColors();
            }
        }
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .chart-card, .tech-card, .cta-card'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Activity Chart
// ============================================
function initActivityChart() {
    const ctx = document.getElementById('activity-chart');
    if (!ctx) return;
    
    // Generate sample data for the chart
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const commitsData = [45, 52, 38, 65, 48, 72, 58, 80, 62, 75, 68, 85];
    const prsData = [8, 12, 6, 15, 10, 18, 14, 22, 16, 20, 17, 24];
    
    // Get chart colors based on theme
    const getChartColors = () => {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        return {
            commits: isDark ? 'rgba(99, 102, 241, 0.8)' : 'rgba(79, 70, 229, 0.8)',
            prs: isDark ? 'rgba(34, 197, 94, 0.8)' : 'rgba(22, 163, 74, 0.8)',
            grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            text: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
        };
    };
    
    const colors = getChartColors();
    
    window.activityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Commits',
                    data: commitsData,
                    backgroundColor: colors.commits,
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                },
                {
                    label: 'Pull Requests',
                    data: prsData,
                    backgroundColor: colors.prs,
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 4
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: colors.text,
                        font: {
                            size: 11,
                            family: "'Inter', sans-serif"
                        }
                    }
                },
                y: {
                    grid: {
                        color: colors.grid,
                        drawBorder: false
                    },
                    ticks: {
                        color: colors.text,
                        font: {
                            size: 11,
                            family: "'Inter', sans-serif"
                        },
                        stepSize: 20
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Update chart colors when theme changes
function updateChartColors() {
    if (!window.activityChart) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const colors = {
        commits: isDark ? 'rgba(99, 102, 241, 0.8)' : 'rgba(79, 70, 229, 0.8)',
        prs: isDark ? 'rgba(34, 197, 94, 0.8)' : 'rgba(22, 163, 74, 0.8)',
        grid: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        text: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
    };
    
    window.activityChart.data.datasets[0].backgroundColor = colors.commits;
    window.activityChart.data.datasets[1].backgroundColor = colors.prs;
    window.activityChart.options.scales.x.ticks.color = colors.text;
    window.activityChart.options.scales.y.ticks.color = colors.text;
    window.activityChart.options.scales.y.grid.color = colors.grid;
    
    window.activityChart.update();
}

// ============================================
// Interactive Terminal
// ============================================
function initInteractiveTerminal() {
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    
    if (!terminalBody || !terminalInput) return;
    
    // Command history
    const commandHistory = [];
    let historyIndex = -1;
    
    // Terminal data
    const terminalData = {
        skills: [
            'Python, Django, FastAPI',
            'Docker, Kubernetes, CI/CD',
            'Machine Learning, TensorFlow, PyTorch',
            'PostgreSQL, Redis, MongoDB',
            'GitHub Actions, System Design',
            'AWS, GCP, Linux'
        ],
        articles: [
            { title: 'Django PDF Actions', url: 'https://blog.devgenius.io/django-pdf-actions-d4a87960f4ac' },
            { title: 'Refresher Project: System Design', url: 'https://blog.devgenius.io/refresher-project-a-glimpse-of-system-design-and-architecture-aaef28510dd4' },
            { title: 'Multi-arch Docker Images', url: 'https://blog.devgenius.io/how-to-build-your-docker-images-using-multi-arch-to-support-arm64-m1-macbook-6ebc42a47cd7' },
            { title: 'Continuous Integration with GitHub', url: 'https://blog.devgenius.io/continuous-integration-github-1130217cc2e9' },
            { title: 'NBRefactor: Jupyter Notebooks', url: 'https://blog.devgenius.io/nbrefactor-tranform-jupyter-notebooks-to-functional-python-modules-within-seconds-8d4e2af0457e' }
        ],
        projects: [
            { title: 'django-pdf-actions', url: 'https://github.com/ibrahimroshdy/django-pdf-actions' },
            { title: 'refresher', url: 'https://github.com/ibrahimroshdy/refresher' },
            { title: 'multi-arch-github-actions', url: 'https://github.com/ibrahimroshdy/multi-arch-github-actions' }
        ],
        social: [
            { name: 'GitHub', url: 'https://github.com/ibrahimroshdy' },
            { name: 'LinkedIn', url: 'https://linkedin.com/in/ibrahim-roshdy' },
            { name: 'Medium', url: 'https://medium.com/@ibrahimroshdy' }
        ]
    };
    
    // Add output to terminal
    function addOutput(text, isClickable = false, url = null) {
        const output = document.createElement('div');
        output.className = 'terminal-output' + (isClickable ? ' clickable' : '');
        output.textContent = text;
        
        if (isClickable && url) {
            output.addEventListener('click', () => {
                window.open(url, '_blank');
            });
        }
        
        // Insert before input wrapper
        const inputWrapper = terminalBody.querySelector('.terminal-input-wrapper');
        terminalBody.insertBefore(output, inputWrapper);
    }
    
    // Add command line to terminal
    function addCommandLine(command) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="prompt">~</span><span class="command">${command}</span>`;
        
        const inputWrapper = terminalBody.querySelector('.terminal-input-wrapper');
        terminalBody.insertBefore(line, inputWrapper);
    }
    
    // Process command
    function processCommand(command) {
        const cmd = command.trim().toLowerCase();
        
        if (cmd === '') return;
        
        // Add to history
        commandHistory.unshift(command);
        if (commandHistory.length > 50) commandHistory.pop();
        historyIndex = -1;
        
        // Add command to terminal
        addCommandLine(command);
        
        // Process commands
        switch (cmd) {
            case 'help':
                addOutput('Available commands:');
                addOutput('  help      - Show this help message');
                addOutput('  whoami    - Display info about me');
                addOutput('  skills    - List my technical skills');
                addOutput('  articles  - Show my articles (clickable)');
                addOutput('  projects  - List my projects (clickable)');
                addOutput('  social    - Show social links (clickable)');
                addOutput('  theme     - Toggle dark/light mode');
                addOutput('  clear     - Clear the terminal');
                addOutput('  date      - Show current date');
                break;
                
            case 'whoami':
                addOutput('Ibrahim Roshdy');
                addOutput('Machine Learning Engineer');
                addOutput('Software Developer');
                addOutput('Building efficient systems with Python & ML');
                break;
                
            case 'skills':
                addOutput('Technical Skills:');
                terminalData.skills.forEach(skill => {
                    addOutput('  ' + skill);
                });
                break;
                
            case 'articles':
                addOutput('Articles (click to open):');
                terminalData.articles.forEach((article, i) => {
                    addOutput(`  ${i + 1}. ${article.title}`, true, article.url);
                });
                break;
                
            case 'projects':
                addOutput('Projects (click to open):');
                terminalData.projects.forEach((project, i) => {
                    addOutput(`  ${i + 1}. ${project.title}`, true, project.url);
                });
                break;
                
            case 'social':
                addOutput('Social Links (click to open):');
                terminalData.social.forEach(link => {
                    addOutput(`  ${link.name}: ${link.url}`, true, link.url);
                });
                break;
                
            case 'theme':
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                if (window.activityChart) updateChartColors();
                addOutput(`Theme switched to ${newTheme} mode`);
                break;
                
            case 'clear':
                // Remove all outputs and command lines except initial
                const elements = terminalBody.querySelectorAll('.terminal-output, .terminal-line');
                elements.forEach(el => el.remove());
                
                // Add initial content back
                addCommandLine('whoami');
                addOutput('Machine Learning Engineer');
                addOutput('Software Developer');
                break;
                
            case 'date':
                addOutput(new Date().toLocaleString());
                break;
                
            case 'ls':
                addOutput('articles/  projects/  skills.txt  social.txt');
                break;
                
            case 'pwd':
                addOutput('/home/ibrahim');
                break;
                
            case 'cat skills.txt':
                processCommand('skills');
                return;
                
            default:
                addOutput(`Command not found: ${cmd}`);
                addOutput('Type "help" for available commands');
        }
        
        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    // Handle input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            terminalInput.value = '';
            processCommand(command);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Simple tab completion
            const commands = ['help', 'whoami', 'skills', 'articles', 'projects', 'social', 'theme', 'clear', 'date', 'ls', 'pwd'];
            const input = terminalInput.value.toLowerCase();
            const match = commands.find(cmd => cmd.startsWith(input));
            if (match) {
                terminalInput.value = match;
            }
        }
    });
    
    // Focus terminal on click
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Make hint commands clickable
    const clickableCmds = document.querySelectorAll('.clickable-cmd');
    clickableCmds.forEach(cmd => {
        cmd.addEventListener('click', () => {
            const command = cmd.getAttribute('data-cmd');
            if (command) {
                processCommand(command);
                terminalInput.focus();
            }
        });
    });
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// ============================================
// Card Hover Effects
// ============================================
function initCardEffects() {
    const cards = document.querySelectorAll('.article-card, .project-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// Counter Animation
// ============================================
function initCounterAnimation() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent;
                const numericValue = parseInt(finalValue);
                
                if (!isNaN(numericValue)) {
                    animateCounter(element, numericValue, finalValue.includes('+'));
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    statValues.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target, hasPlus) {
    let current = 0;
    const increment = target / 30;
    const duration = 1000;
    const stepTime = duration / 30;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }, stepTime);
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initActivityChart();
    initInteractiveTerminal();
    initHeaderScroll();
    initCardEffects();
    initCounterAnimation();
});

// Handle page visibility for animations
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Restart any animations if needed
    }
});
