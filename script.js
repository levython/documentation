// ============================================
// LEVYTHON DOCUMENTATION
// Node.js-Inspired Professional Documentation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initCopyButtons();
    initSearch();
    // Syntax highlighting disabled - causes span tags to show
    // initSyntaxHighlighting();
    initActiveNavigation();
    initCodeTabs();
});

// === THEME TOGGLE ===
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    updateThemeIcon();

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon();
        });
    }
}

function updateThemeIcon() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Sun icon (shown in dark mode to switch to light)
    const sunIcon = `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    // Moon icon (shown in light mode to switch to dark)
    const moonIcon = `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    toggle.innerHTML = isDark ? sunIcon : moonIcon;
    toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// === MOBILE MENU ===
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay?.classList.toggle('open');
            document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
        });

        overlay?.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        });

        // Close on nav click
        sidebar.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    sidebar.classList.remove('open');
                    overlay?.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        });
    }
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash
                history.pushState(null, null, href);
            }
        });
    });
}

// === COPY BUTTONS ===
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const codeBlock = button.closest('.code-block');
            const pre = codeBlock.querySelector('pre');
            const code = pre.textContent;

            try {
                await navigator.clipboard.writeText(code);

                const originalHTML = button.innerHTML;
                button.innerHTML = '✓ COPIED';
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });
    });
}

// === SEARCH ===
function initSearch() {
    const searchInput = document.querySelector('.sidebar-search input');
    if (!searchInput) return;

    const navLinks = document.querySelectorAll('.nav-links a');
    const navSections = document.querySelectorAll('.nav-section');

    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();

        if (!query) {
            // Reset visibility
            navLinks.forEach(link => link.parentElement.style.display = '');
            navSections.forEach(section => section.style.display = '');
            return;
        }

        navLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const matches = text.includes(query);
            link.parentElement.style.display = matches ? '' : 'none';
        });

        // Hide empty sections
        navSections.forEach(section => {
            const visibleLinks = section.querySelectorAll('.nav-links li:not([style*="display: none"])');
            section.style.display = visibleLinks.length ? '' : 'none';
        });
    }, 150));
}

// === SYNTAX HIGHLIGHTING ===
function initSyntaxHighlighting() {
    document.querySelectorAll('pre code:not(.highlighted)').forEach(block => {
        highlightLevython(block);
        block.classList.add('highlighted');
    });
}

function highlightLevython(element) {
    let code = element.textContent;

    // Check if already contains HTML entities (already escaped)
    const isAlreadyEscaped = code.includes('&lt;') || code.includes('&gt;');
    
    // Only escape if not already escaped
    if (!isAlreadyEscaped) {
        code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Apply syntax highlighting in order
    // Comments (do first to avoid highlighting inside them)
    code = code.replace(/(#.*)$/gm, '<span class="comment">$1</span>');
    
    // Strings (do early to avoid highlighting keywords/functions inside strings)
    code = code.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="string">$1</span>');
    
    // Keywords
    code = code.replace(/\b(fun|act|if|then|else|elif|for|while|do|in|range|end|true|false|null|return|break|continue|ask)\b/g, '<span class="keyword">$1</span>');
    
    // Built-in functions (must come before generic word matching)
    code = code.replace(/\b(say|str|len|append|read_file|write_file|file_exists|mem_alloc|mem_free|mem_read32|mem_write32|tensor|tensor_dot|tensor_mean|bit_and|bit_or|shift_left|simd_add_f32|int|float|type|abs|round|min|max|sum|print|println|upper|lower|trim|split|join|replace|sorted|reversed|sqrt|pow|floor|ceil|contains|find|startswith|endswith|time|gc|memory|clear|remove|popcount)(?=\s*\()/g, '<span class="function">$1</span>');
    
    // Numbers
    code = code.replace(/\b(\d+\.?\d*|0x[0-9a-fA-F]+|0b[01]+)\b/g, '<span class="number">$1</span>');
    
    // Arrow operators
    code = code.replace(/(&lt;-|<-)/g, '<span class="operator">&lt;-</span>');
    code = code.replace(/(-&gt;|->)/g, '<span class="operator">-&gt;</span>');
    
    // Other operators
    code = code.replace(/\b(and|or|not)\b/g, '<span class="operator">$1</span>');
    code = code.replace(/(==|!=|&lt;=|&gt;=|<=|>=|\+|-(?!&gt;)|\*|\/|%|&amp;|\||\^|~|&lt;&lt;|&gt;&gt;|<<|>>|\+=|-=|\*=|\/=)/g, '<span class="operator">$1</span>');

    element.innerHTML = code;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// === ACTIVE NAVIGATION ===
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id], h2[id], h3[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        rootMargin: '-70px 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// === CODE TABS ===
function initCodeTabs() {
    document.querySelectorAll('.code-block[data-tabs]').forEach(block => {
        const tabs = block.querySelectorAll('.code-tab');
        const contents = block.querySelectorAll('.code-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                tabs.forEach(t => t.classList.toggle('active', t === tab));
                contents.forEach(c => {
                    c.style.display = c.dataset.content === target ? 'block' : 'none';
                });
            });
        });
    });
}

// === UTILITIES ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === ANCHOR LINKS ===
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('anchor')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        history.pushState(null, null, href);

        // Copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            // Brief visual feedback
            e.target.style.opacity = '1';
            setTimeout(() => e.target.style.opacity = '', 500);
        });
    }
});
