/**
 * WHITE BIRCH ESTATES - MAIN JAVASCRIPT
 * Production-Ready Client-Side Functionality
 *
 * AIRBNB BOOKING LINK:
 * Update the AIRBNB_URL constant below with your actual Airbnb listing URL
 */

// ========================================
// CONFIGURATION
// ========================================

const AIRBNB_URL = 'https://www.airbnb.com/rooms/YOUR-LISTING-ID';
// ^^ REPLACE WITH YOUR ACTUAL AIRBNB LISTING URL

const STICKY_CTA_STORAGE_KEY = 'wbe_sticky_cta_dismissed';

// Seasonal hero text content (keywords wrapped in <mark> tags will be highlighted with seasonal colors)
const SEASONAL_HERO = {
    spring: {
        heading: 'Awaken to Nature\'s <mark>Renewal</mark>',
        subtitle: 'Experience the magic of spring on our veteran-owned hobby farm. Watch the estate bloom with <mark>new life</mark> and fresh beginnings.'
    },
    summer: {
        heading: 'Escape to 32 Acres of <mark>Peace & Charm</mark>',
        subtitle: 'Experience authentic farm living meets modern luxury on our veteran-owned hobby farm. Where every season brings <mark>new adventures</mark>.'
    },
    fall: {
        heading: 'Embrace the Colors of <mark>Harvest</mark>',
        subtitle: 'Discover autumn\'s splendor on our veteran-owned hobby farm. Where <mark>golden birch groves</mark> and crisp country air create unforgettable memories.'
    },
    winter: {
        heading: 'Find Serenity in Winter\'s <mark>Embrace</mark>',
        subtitle: 'Experience the peaceful beauty of winter on our veteran-owned hobby farm. Where snow-covered landscapes and <mark>fireside warmth</mark> await.'
    }
};

// Seasonal activities data
const SEASONAL_ACTIVITIES = {
    spring: [
        {
            icon: 'bi-flower1',
            title: 'Spring Blooms',
            description: 'Witness the estate come alive with wildflowers and budding trees.'
        },
        {
            icon: 'bi-egg-fill',
            title: 'Baby Animals',
            description: 'Meet adorable new additions to our farm family—chicks, lambs, and more.'
        },
        {
            icon: 'bi-bicycle',
            title: 'Garden Planting',
            description: 'Help plant seasonal vegetables and learn sustainable farming practices.'
        },
        {
            icon: 'bi-sunrise',
            title: 'Morning Bird Watching',
            description: 'Spot migratory birds returning to nest in our birch groves.'
        }
    ],
    summer: [
        {
            icon: 'bi-sun',
            title: 'Sunny Days',
            description: 'Enjoy long summer days exploring trails and swimming in nearby lakes.'
        },
        {
            icon: 'bi-basket',
            title: 'Berry Picking',
            description: 'Harvest fresh strawberries, blueberries, and raspberries from our gardens.'
        },
        {
            icon: 'bi-fire',
            title: 'Bonfire Nights',
            description: 'Gather under starlit skies for s\'mores, stories, and stargazing.'
        },
        {
            icon: 'bi-droplet',
            title: 'Farm Fresh Produce',
            description: 'Pick ripe vegetables and enjoy farm-to-table dining experiences.'
        }
    ],
    fall: [
        {
            icon: 'bi-tree',
            title: 'Fall Foliage',
            description: 'Walk through stunning autumn colors as birch leaves turn golden.'
        },
        {
            icon: 'bi-basket2',
            title: 'Apple Harvesting',
            description: 'Pick crisp apples and try your hand at making fresh cider.'
        },
        {
            icon: 'bi-cup-hot',
            title: 'Cozy Evenings',
            description: 'Warm up by the fireplace with hot cider and homemade treats.'
        },
        {
            icon: 'bi-leaf',
            title: 'Nature Crafts',
            description: 'Create seasonal decorations using leaves, pinecones, and farm finds.'
        }
    ],
    winter: [
        {
            icon: 'bi-snow',
            title: 'Winter Wonderland',
            description: 'Experience magical snowy landscapes perfect for photos and peace.'
        },
        {
            icon: 'bi-snow2',
            title: 'Snowshoeing Trails',
            description: 'Explore our property on snowshoes through pristine winter trails.'
        },
        {
            icon: 'bi-fire',
            title: 'Fireside Comfort',
            description: 'Relax by the crackling fire with cocoa and cozy blankets.'
        },
        {
            icon: 'bi-heart',
            title: 'Holiday Charm',
            description: 'Enjoy festive decorations and traditional farm holiday activities.'
        }
    ]
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Trap focus within an element (for accessibility)
 * @param {HTMLElement} element
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/**
 * Get current season based on month
 * March-May = Spring, June-August = Summer
 * September-November = Fall, December-February = Winter
 * @returns {string} 'spring' | 'summer' | 'fall' | 'winter'
 */
function getCurrentSeason() {
    const month = new Date().getMonth() + 1; // 1-12

    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';
    return 'winter'; // Dec, Jan, Feb
}

// ========================================
// SEASONAL THEME SYSTEM
// ========================================

/**
 * Initialize seasonal theme based on current date
 * Can be overridden by manual selection
 */
function initSeason() {
    // Check if user has manually selected a season
    const savedSeason = localStorage.getItem('wbe_selected_season');
    const season = savedSeason || getCurrentSeason();

    applySeason(season);

    console.log(`🌲 White Birch Estates - ${season.charAt(0).toUpperCase() + season.slice(1)} theme active`);
}

/**
 * Apply a seasonal theme
 * @param {string} season - 'spring' | 'summer' | 'fall' | 'winter'
 */
function applySeason(season) {
    const html = document.documentElement;

    // Remove all theme classes
    html.classList.remove('theme-spring', 'theme-summer', 'theme-fall', 'theme-winter');

    // Add current theme class
    html.classList.add(`theme-${season}`);

    // Update hero text content
    updateHeroText(season);

    // Update season name in experiences section
    const seasonName = document.getElementById('seasonName');
    if (seasonName) {
        seasonName.textContent = season.charAt(0).toUpperCase() + season.slice(1);
    }

    // Update seasonal activities
    updateSeasonalActivities(season);

    // Update active state in season picker
    updateSeasonPickerUI(season);
}

/**
 * Update hero text content for the current season
 * @param {string} season
 */
function updateHeroText(season) {
    const heroData = SEASONAL_HERO[season];
    if (!heroData) return;

    // Update heading
    const heroHeading = document.getElementById('hero-heading');
    if (heroHeading) {
        heroHeading.innerHTML = heroData.heading;
    }

    // Update subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.innerHTML = heroData.subtitle;
    }
}

/**
 * Update seasonal activities content
 * @param {string} season
 */
function updateSeasonalActivities(season) {
    const container = document.getElementById('seasonalActivities');
    if (!container) return;

    const activities = SEASONAL_ACTIVITIES[season];
    if (!activities) return;

    container.innerHTML = activities.map(activity => `
        <div class="activity-card">
            <div class="activity-icon">
                <i class="bi ${activity.icon}" aria-hidden="true"></i>
            </div>
            <h3 class="activity-title">${activity.title}</h3>
            <p class="activity-description">${activity.description}</p>
        </div>
    `).join('');
}

/**
 * Update season picker button states
 * @param {string} activeSeason
 */
function updateSeasonPickerUI(activeSeason) {
    const seasonButtons = document.querySelectorAll('.season-btn');
    seasonButtons.forEach(btn => {
        const season = btn.dataset.season;
        if (season === activeSeason) {
            btn.classList.add('active');
            btn.setAttribute('aria-checked', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-checked', 'false');
        }
    });
}

/**
 * Bind season picker buttons
 */
function bindSeasonPicker() {
    const seasonButtons = document.querySelectorAll('.season-btn');

    seasonButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const season = this.dataset.season;

            // Save selection to localStorage
            localStorage.setItem('wbe_selected_season', season);

            // Apply theme
            applySeason(season);

            console.log(`🌲 Season manually changed to: ${season}`);
        });
    });
}

// ========================================
// STICKY BOOK CTA
// ========================================

/**
 * Setup sticky "Book Now" CTA button
 * - Creates floating button
 * - Respects dismissal (stored in localStorage)
 * - Keyboard accessible
 */
function setupStickyCTA() {
    // Check if user has dismissed the CTA
    if (localStorage.getItem(STICKY_CTA_STORAGE_KEY) === 'true') {
        return; // Don't show if dismissed
    }

    // Create sticky CTA button
    const stickyBtn = document.createElement('a');
    stickyBtn.id = 'stickyBookCTA';
    stickyBtn.href = AIRBNB_URL;
    stickyBtn.target = '_blank';
    stickyBtn.rel = 'noopener noreferrer';
    stickyBtn.setAttribute('aria-label', 'Book your stay on Airbnb');
    stickyBtn.innerHTML = `
        <i class="bi bi-calendar-check" aria-hidden="true"></i>
        <span>Book Now</span>
        <button class="sticky-cta-close" aria-label="Dismiss booking button">
            <i class="bi bi-x" aria-hidden="true"></i>
        </button>
    `;

    document.body.appendChild(stickyBtn);

    // Handle dismissal
    const closeBtn = stickyBtn.querySelector('.sticky-cta-close');
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Save dismissal to localStorage
        localStorage.setItem(STICKY_CTA_STORAGE_KEY, 'true');

        // Hide button
        stickyBtn.classList.add('hidden');

        // Remove from DOM after transition
        setTimeout(() => {
            stickyBtn.remove();
        }, 300);
    });
}

// ========================================
// CAROUSEL INITIALIZATION
// ========================================

/**
 * Initialize Bootstrap carousels
 * (Bootstrap handles most of this automatically)
 */
function initCarousel() {
    // Bootstrap 5 auto-initializes carousels
    // This function is a placeholder for any custom carousel logic
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        // Optional: Add custom event listeners
        carousel.addEventListener('slide.bs.carousel', function(e) {
            // Track carousel slide changes for analytics if needed
            console.log('Carousel slide:', e.to);
        });
    });
}

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================

let currentLightboxImage = null;

/**
 * Initialize gallery lightbox
 * - Click to open
 * - ESC to close
 * - Focus trapping
 * - Keyboard accessible
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');

    if (!lightbox || !lightboxImg || !closeBtn) return;

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.src;
            const alt = img.alt;

            // Set image
            lightboxImg.src = src;
            lightboxImg.alt = alt;

            // Show lightbox
            lightbox.style.display = 'flex';
            lightbox.setAttribute('aria-hidden', 'false');

            // Focus close button
            closeBtn.focus();

            // Trap focus
            trapFocus(lightbox);

            // Store current image reference
            currentLightboxImage = img;

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox function
    function closeLightbox() {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');

        // Restore body scroll
        document.body.style.overflow = '';

        // Return focus to clicked image
        if (currentLightboxImage) {
            currentLightboxImage.parentElement.focus();
        }
    }

    // Close button click
    closeBtn.addEventListener('click', closeLightbox);

    // Click outside image to close
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
}

// ========================================
// SMOOTH SCROLL & NAVIGATION
// ========================================

/**
 * Enhance smooth scrolling for anchor links
 * Bootstrap handles most of this, but we can add custom behavior
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if just "#" or empty
            if (targetId === '#' || !targetId) {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Scroll to element with offset for fixed nav
                const navbar = document.getElementById('mainNav');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
}

// ========================================
// BOOK NOW LINKS
// ========================================

/**
 * Set all booking buttons to point to Airbnb URL
 */
function setupBookingLinks() {
    const bookBtns = document.querySelectorAll(
        '#navBookBtn, #heroBookBtn, #accomBookBtn, #finalBookBtn'
    );

    bookBtns.forEach(btn => {
        btn.href = AIRBNB_URL;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';

        // Track clicks (placeholder for analytics)
        btn.addEventListener('click', function() {
            console.log('📊 Book Now clicked:', this.id);
            // Add your analytics tracking here:
            // gtag('event', 'book_now_click', { button_id: this.id });
        });
    });
}

// ========================================
// NAVBAR SCROLL BEHAVIOR
// ========================================

/**
 * Add shadow to navbar on scroll
 */
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
}

// ========================================
// PARALLAX HERO EFFECT (OPTIONAL)
// ========================================

/**
 * Subtle parallax effect on hero background
 * Only if user has not set reduced motion preference
 */
function initParallax() {
    if (prefersReducedMotion()) return;

    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const limit = window.innerHeight;

        if (scrolled < limit) {
            const parallaxValue = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Main initialization function
 * Runs when DOM is fully loaded
 */
function init() {
    console.log('🌲 White Birch Estates - Initializing...');

    // Initialize seasonal theme system
    initSeason();

    // Bind season picker
    bindSeasonPicker();

    // Setup sticky CTA
    setupStickyCTA();

    // Initialize carousel
    initCarousel();

    // Initialize lightbox
    initLightbox();

    // Setup smooth scroll
    initSmoothScroll();

    // Setup booking links
    setupBookingLinks();

    // Navbar scroll behavior
    initNavbarScroll();

    // Parallax effect (if motion allowed)
    initParallax();

    console.log('✅ White Birch Estates - Ready!');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// ANALYTICS PLACEHOLDER
// ========================================

/**
 * This is where you would add your analytics tracking
 * Examples: Google Analytics, Facebook Pixel, etc.
 *
 * Example Google Analytics 4:
 *
 * window.dataLayer = window.dataLayer || [];
 * function gtag(){dataLayer.push(arguments);}
 * gtag('js', new Date());
 * gtag('config', 'G-XXXXXXXXXX');
 */

// ========================================
// EXPORT FOR DEBUGGING (OPTIONAL)
// ========================================

// Expose some functions globally for debugging
window.WBE = {
    applySeason,
    getCurrentSeason,
    version: '1.0.0'
};
