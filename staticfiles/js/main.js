/* ═══════════════════════════════════════════════════════
   CarbonLedger — Main JavaScript
   Navigation, Counters, Animations, Utilities
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    // ─── Navbar scroll effect ────────────────────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        // Fire once on load in case page is already scrolled
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        }
    }


    // ─── Mobile nav toggle ──────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            // Animate hamburger
            navToggle.classList.toggle('active');
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll('.nav-link, .nav-btn').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }


    // ─── Animated counters (Landing page) ───────────
    const counters = document.querySelectorAll('.metric-number[data-target]');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(el, target) {
        var duration = 2000;
        var startTime = null;
        var startValue = 0;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(startValue + (target - startValue) * eased);
            el.textContent = current.toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(step);
    }


    // ─── Scroll reveal animations ───────────────────
    const revealElements = document.querySelectorAll(
        '.feature-card, .step-card, .about-card, .stat-card, ' +
        '.chart-card, .suggestion-card, .result-card, .info-card, ' +
        '.factor-list, .methodology-item, .about-cta, .score-card, ' +
        '.result-breakdown, .result-score-section, .ai-insight-banner, ' +
        '.ai-result-insight, .empty-state'
    );

    if (revealElements.length > 0) {
        // Add fade-in class to all target elements
        revealElements.forEach(function (el) {
            el.classList.add('fade-in');
        });

        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }


    // ─── Toast auto-dismiss ─────────────────────────
    var toasts = document.querySelectorAll('.message-toast');
    toasts.forEach(function (toast) {
        setTimeout(function () {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            setTimeout(function () {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 400);
        }, 5000);
    });


    // ─── Hero badge sparkle effect ──────────────────
    var heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        setInterval(function () {
            heroBadge.style.transition = 'box-shadow 0.6s ease';
            heroBadge.style.boxShadow = '0 0 20px rgba(0, 230, 118, 0.3)';
            setTimeout(function () {
                heroBadge.style.boxShadow = 'none';
            }, 600);
        }, 3000);
    }


    // ─── Stat cards hover glow ──────────────────────
    var statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            card.style.boxShadow = '0 8px 30px rgba(0, 230, 118, 0.1)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.boxShadow = '';
        });
    });


    // ─── Feature cards stagger animation ────────────
    var featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(function (card, index) {
        card.style.transitionDelay = (index * 0.08) + 's';
    });


    // ─── Suggestion cards stagger animation ─────────
    var suggestionCards = document.querySelectorAll('.suggestion-card');
    suggestionCards.forEach(function (card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
    });


    // ─── Result cards stagger animation ─────────────
    var resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(function (card, index) {
        card.style.transitionDelay = (index * 0.15) + 's';
    });


    // ─── Smooth scroll for anchor links ─────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ─── Keyboard accessibility for nav toggle ──────
    if (navToggle) {
        navToggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navToggle.click();
            }
        });
    }


    // ─── Form input real-time formatting ────────────
    var formInputs = document.querySelectorAll('.form-input[type="number"]');
    formInputs.forEach(function (input) {
        input.addEventListener('input', function () {
            // Remove negative values
            if (this.value < 0) {
                this.value = 0;
            }
        });

        // Add focus ring enhancement
        input.addEventListener('focus', function () {
            this.parentElement.style.position = 'relative';
        });
    });


    // ─── Result page number animation ───────────────
    var resultValues = document.querySelectorAll('.result-card-value');
    if (resultValues.length > 0) {
        resultValues.forEach(function (el) {
            var finalText = el.textContent.trim();
            // Extract numeric value
            var numericPart = finalText.replace(/[^\d.]/g, '');
            var prefix = finalText.match(/^[^\d]*/)[0];
            var num = parseFloat(numericPart);

            if (!isNaN(num) && num > 0) {
                el.textContent = prefix + '0';
                var duration = 1500;
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    var current = num * eased;

                    // Format based on whether it's integer or float
                    if (Number.isInteger(num)) {
                        el.textContent = prefix + Math.floor(current).toLocaleString('en-IN');
                    } else {
                        el.textContent = prefix + current.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = finalText;
                    }
                }

                // Delay start slightly
                setTimeout(function () {
                    requestAnimationFrame(step);
                }, 400);
            }
        });
    }


    // ─── Dashboard stat value animation ─────────────
    var statValues = document.querySelectorAll('.stat-value');
    if (statValues.length > 0) {
        var statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var fullText = el.textContent.trim();
                    var smallEl = el.querySelector('small');
                    var smallText = smallEl ? smallEl.textContent : '';
                    if (smallEl) smallEl.remove();

                    var numericPart = fullText.replace(/[^\d.]/g, '');
                    var prefix = fullText.match(/^[^\d]*/)[0];
                    var num = parseFloat(numericPart);

                    if (!isNaN(num) && num > 0) {
                        el.textContent = prefix + '0';
                        var duration = 1200;
                        var startTime = null;

                        function step(timestamp) {
                            if (!startTime) startTime = timestamp;
                            var progress = Math.min((timestamp - startTime) / duration, 1);
                            var eased = 1 - Math.pow(1 - progress, 3);
                            var current = num * eased;

                            if (Number.isInteger(num)) {
                                el.textContent = prefix + Math.floor(current).toLocaleString('en-IN');
                            } else {
                                el.textContent = prefix + current.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            }

                            if (progress < 1) {
                                requestAnimationFrame(step);
                            } else {
                                el.textContent = fullText;
                                if (smallEl) {
                                    var newSmall = document.createElement('small');
                                    newSmall.textContent = smallText;
                                    el.appendChild(newSmall);
                                }
                            }
                        }

                        requestAnimationFrame(step);
                    }

                    statObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        statValues.forEach(function (sv) {
            statObserver.observe(sv);
        });
    }


    // ─── Particle background on hero ────────────────
    var heroSection = document.querySelector('.hero');
    if (heroSection) {
        createParticles(heroSection);
    }


    // ─── Active nav link highlighting ───────────────
    var currentPath = window.location.pathname;
    var navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPath) {
            link.style.color = 'var(--accent)';
            link.style.background = 'var(--accent-dim)';
        }
    });


    // ─── Input form live preview calculation ────────
    var emissionForm = document.getElementById('emissionForm');
    if (emissionForm) {
        var formFields = emissionForm.querySelectorAll('input[type="number"]');
        formFields.forEach(function (field) {
            field.addEventListener('input', updateLiveEstimate);
        });
    }


    // ─── Console branding ───────────────────────────
    console.log(
        '%c🌱 CarbonLedger %c— AI-Powered Carbon Emission Platform',
        'color: #00e676; font-size: 18px; font-weight: bold;',
        'color: #8b95a5; font-size: 14px;'
    );
    console.log(
        '%cBuilt with Django + MySQL | FinTech + ESG',
        'color: #42a5f5; font-size: 12px;'
    );

});



/* ═══════════════════════════════════════════════════════
   GLOBAL UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════ */

// ─── Password visibility toggle ────────────────────────
function togglePassword(inputId, btn) {
    var input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}


// ─── Live estimate on input form ───────────────────────
function updateLiveEstimate() {
    var elecInput = document.querySelector('[name="electricity_kwh"]');
    var fuelInput = document.querySelector('[name="fuel_litres"]');
    var lpgInput = document.querySelector('[name="lpg_cylinders"]');
    var travelInput = document.querySelector('[name="travel_km"]');
    var wasteInput = document.querySelector('[name="waste_kg"]');

    if (!elecInput) return;

    var elec = parseFloat(elecInput.value) || 0;
    var fuel = parseFloat(fuelInput.value) || 0;
    var lpg = parseFloat(lpgInput.value) || 0;
    var travel = parseFloat(travelInput.value) || 0;
    var waste = parseFloat(wasteInput.value) || 0;

    // Emission factors
    var eElec = elec * 0.8;
    var eFuel = fuel * 2.3;
    var eLpg = lpg * 45;
    var eTravel = travel * 0.2;
    var eWaste = waste * 1.5;

    var totalEmissions = eElec + eFuel + eLpg + eTravel + eWaste;
    var credits = totalEmissions > 0 ? Math.ceil(totalEmissions / 1000) : 0;
    var cost = credits * 800;

    // Update or create live estimate display
    var estimateBar = document.getElementById('liveEstimate');
    if (!estimateBar) {
        estimateBar = document.createElement('div');
        estimateBar.id = 'liveEstimate';
        estimateBar.style.cssText = [
            'position: sticky',
            'bottom: 0',
            'left: 0',
            'right: 0',
            'padding: 14px 24px',
            'background: rgba(10, 13, 17, 0.95)',
            'backdrop-filter: blur(20px)',
            'border-top: 1px solid rgba(0, 230, 118, 0.2)',
            'display: flex',
            'align-items: center',
            'justify-content: center',
            'gap: 32px',
            'font-family: "Space Grotesk", sans-serif',
            'z-index: 100',
            'transition: all 0.3s ease',
            'border-radius: 12px 12px 0 0',
            'margin: 0 -36px',
        ].join(';');

        var formCard = document.querySelector('.input-form-card');
        if (formCard) {
            formCard.appendChild(estimateBar);
        }
    }

    if (totalEmissions > 0) {
        estimateBar.style.display = 'flex';
        estimateBar.innerHTML = [
            '<span style="color: #00e676; font-weight: 700; font-size: 0.9rem;">',
            '<i class="fas fa-bolt" style="margin-right: 6px;"></i>Live Estimate',
            '</span>',
            '<span style="color: #e8ecf1; font-family: JetBrains Mono, monospace; font-size: 0.88rem;">',
            totalEmissions.toFixed(1), ' kg CO₂',
            '</span>',
            '<span style="color: #ffb74d; font-family: JetBrains Mono, monospace; font-size: 0.88rem;">',
            credits, ' credits',
            '</span>',
            '<span style="color: #42a5f5; font-family: JetBrains Mono, monospace; font-size: 0.88rem;">',
            '₹', cost.toLocaleString('en-IN'),
            '</span>',
        ].join(' ');
    } else {
        estimateBar.style.display = 'none';
    }
}


// ─── Floating particles for hero ───────────────────────
function createParticles(container) {
    var particleCount = 30;
    var particles = [];

    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.className = 'hero-particle';
        var size = Math.random() * 3 + 1;
        var x = Math.random() * 100;
        var y = Math.random() * 100;
        var opacity = Math.random() * 0.4 + 0.1;
        var duration = Math.random() * 20 + 15;
        var delay = Math.random() * 10;

        particle.style.cssText = [
            'position: absolute',
            'width: ' + size + 'px',
            'height: ' + size + 'px',
            'background: rgba(0, 230, 118, ' + opacity + ')',
            'border-radius: 50%',
            'left: ' + x + '%',
            'top: ' + y + '%',
            'pointer-events: none',
            'animation: particleDrift ' + duration + 's ease-in-out ' + delay + 's infinite',
            'z-index: 1',
        ].join(';');

        container.appendChild(particle);
        particles.push(particle);
    }

    // Inject particle animation keyframes
    if (!document.getElementById('particleStyles')) {
        var style = document.createElement('style');
        style.id = 'particleStyles';
        style.textContent = [
            '@keyframes particleDrift {',
            '  0%, 100% { transform: translate(0, 0); opacity: 0.3; }',
            '  25% { transform: translate(30px, -40px); opacity: 0.6; }',
            '  50% { transform: translate(-20px, -80px); opacity: 0.2; }',
            '  75% { transform: translate(40px, -40px); opacity: 0.5; }',
            '}',
        ].join('\n');
        document.head.appendChild(style);
    }
}


// ─── Smooth number formatting ──────────────────────────
function formatNumber(num, decimals) {
    decimals = decimals || 0;
    if (num >= 10000000) {
        return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
        return (num / 100000).toFixed(2) + ' L';
    }
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


// ─── Copy to clipboard utility ─────────────────────────
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
            showToast('Copied to clipboard!', 'success');
        });
    } else {
        // Fallback
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard!', 'success');
    }
}


// ─── Show toast notification ───────────────────────────
function showToast(message, type) {
    type = type || 'info';
    var container = document.querySelector('.message-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'message-container';
        document.body.appendChild(container);
    }

    var iconMap = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };

    var colorMap = {
        'success': '#00e676',
        'error': '#ef5350',
        'warning': '#ffb74d',
        'info': '#42a5f5'
    };

    var toast = document.createElement('div');
    toast.className = 'message-toast message-' + type;
    toast.innerHTML = [
        '<i class="fas ' + iconMap[type] + '" style="color: ' + colorMap[type] + '"></i>',
        '<span>' + message + '</span>',
        '<button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>',
    ].join('');

    container.appendChild(toast);

    // Auto dismiss
    setTimeout(function () {
        toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        setTimeout(function () {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 400);
    }, 4000);
}


// ─── Debounce utility ──────────────────────────────────
function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(context, args);
        }, wait);
    };
}


// ─── Throttle utility ──────────────────────────────────
function throttle(func, limit) {
    var inThrottle;
    return function () {
        var args = arguments;
        var context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function () {
                inThrottle = false;
            }, limit);
        }
    };
}