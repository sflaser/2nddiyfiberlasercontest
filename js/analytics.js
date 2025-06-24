// SKYFIRE Competition Analytics & Tracking

// Analytics configuration
const ANALYTICS_CONFIG = {
    // Google Analytics 4 (replace with your actual GA4 measurement ID)
    GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX',
    
    // Custom events tracking
    TRACK_SCROLL: true,
    TRACK_CLICKS: true,
    TRACK_FORMS: true,
    TRACK_PERFORMANCE: true,
    
    // Privacy settings
    RESPECT_DNT: true, // Respect Do Not Track
    COOKIE_CONSENT: false // Set to true when user consents
};

// Initialize Google Analytics
function initGoogleAnalytics() {
    // Check if user has DNT enabled
    if (ANALYTICS_CONFIG.RESPECT_DNT && navigator.doNotTrack === '1') {
        console.log('Analytics disabled due to Do Not Track preference');
        return;
    }
    
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
        'anonymize_ip': true,
        'respect_dnt': ANALYTICS_CONFIG.RESPECT_DNT
    });
    
    console.log('Google Analytics initialized');
}

// Track custom events
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'custom_parameter': true,
            'page_url': window.location.href,
            'page_title': document.title,
            'timestamp': new Date().toISOString(),
            ...parameters
        });
    }
    
    // Also log to console for debugging
    console.log('Event tracked:', eventName, parameters);
}

// Track page views
function trackPageView(pageName) {
    trackEvent('page_view', {
        'page_name': pageName,
        'user_agent': navigator.userAgent,
        'screen_resolution': `${screen.width}x${screen.height}`,
        'language': navigator.language
    });
}

// Track form interactions
function trackFormEvent(formId, action, field = null) {
    const parameters = {
        'form_id': formId,
        'form_action': action
    };
    
    if (field) {
        parameters.field_name = field;
    }
    
    trackEvent('form_interaction', parameters);
}

// Track competition-specific events
function trackCompetitionEvent(action, details = {}) {
    trackEvent('competition_action', {
        'competition_action': action,
        'competition_year': '2024-2025',
        ...details
    });
}

// Track social sharing
function trackSocialShare(platform, url, title) {
    trackEvent('social_share', {
        'platform': platform,
        'shared_url': url,
        'shared_title': title
    });
}

// Track downloads
function trackDownload(fileName, fileType, source) {
    trackEvent('file_download', {
        'file_name': fileName,
        'file_type': fileType,
        'download_source': source
    });
}

// Track scroll depth
function initScrollTracking() {
    if (!ANALYTICS_CONFIG.TRACK_SCROLL) return;
    
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set();
    
    function trackScrollDepth() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    trackEvent('scroll_depth', {
                        'scroll_percentage': milestone,
                        'page_url': window.location.href
                    });
                }
            });
        }
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(trackScrollDepth, 100);
    });
}

// Track clicks on important elements
function initClickTracking() {
    if (!ANALYTICS_CONFIG.TRACK_CLICKS) return;
    
    document.addEventListener('click', (e) => {
        const element = e.target.closest('a, button, [data-track-click]');
        if (!element) return;
        
        const trackingData = {
            'element_type': element.tagName.toLowerCase(),
            'element_text': element.textContent?.trim().substring(0, 100),
            'element_class': element.className,
            'element_id': element.id
        };
        
        // Track external links
        if (element.tagName === 'A' && element.href) {
            const isExternal = !element.href.includes(window.location.hostname);
            if (isExternal) {
                trackEvent('external_link_click', {
                    ...trackingData,
                    'destination_url': element.href
                });
            }
        }
        
        // Track buttons with specific actions
        if (element.hasAttribute('data-track-click')) {
            const action = element.getAttribute('data-track-click');
            trackEvent('button_click', {
                ...trackingData,
                'button_action': action
            });
        }
        
        // Track navigation clicks
        if (element.closest('nav')) {
            trackEvent('navigation_click', trackingData);
        }
    });
}

// Track form submissions and interactions
function initFormTracking() {
    if (!ANALYTICS_CONFIG.TRACK_FORMS) return;
    
    document.querySelectorAll('form').forEach(form => {
        const formId = form.id || form.className || 'unnamed_form';
        
        // Track form start (first interaction)
        let formStarted = false;
        form.addEventListener('input', () => {
            if (!formStarted) {
                formStarted = true;
                trackFormEvent(formId, 'form_start');
            }
        });
        
        // Track form submission
        form.addEventListener('submit', () => {
            trackFormEvent(formId, 'form_submit');
        });
        
        // Track field interactions
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('focus', () => {
                trackFormEvent(formId, 'field_focus', field.name || field.type);
            });
            
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    trackFormEvent(formId, 'field_complete', field.name || field.type);
                }
            });
        });
    });
}

// Track performance metrics
function initPerformanceTracking() {
    if (!ANALYTICS_CONFIG.TRACK_PERFORMANCE) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            
            if (perfData) {
                trackEvent('page_performance', {
                    'load_time': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    'dom_content_loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    'first_paint': Math.round(performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0),
                    'page_size': Math.round(perfData.transferSize / 1024), // in KB
                    'connection_type': navigator.connection?.effectiveType || 'unknown'
                });
            }
        }, 1000);
    });
}

// Error tracking
function initErrorTracking() {
    window.addEventListener('error', (e) => {
        trackEvent('javascript_error', {
            'error_message': e.message,
            'error_source': e.filename,
            'error_line': e.lineno,
            'error_column': e.colno,
            'user_agent': navigator.userAgent
        });
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        trackEvent('promise_rejection', {
            'error_message': e.reason?.toString() || 'Unknown promise rejection',
            'user_agent': navigator.userAgent
        });
    });
}

// Competition-specific tracking functions
window.trackRegistrationStart = () => {
    trackCompetitionEvent('registration_start');
};

window.trackRegistrationComplete = (participationType, country) => {
    trackCompetitionEvent('registration_complete', {
        'participation_type': participationType,
        'participant_country': country
    });
};

window.trackPatternDownload = (patternName) => {
    trackDownload(patternName, 'dxf', 'patterns_page');
    trackCompetitionEvent('pattern_download', {
        'pattern_name': patternName
    });
};

window.trackSocialShareAction = (platform) => {
    trackSocialShare(platform, window.location.href, document.title);
    trackCompetitionEvent('social_share', {
        'share_platform': platform
    });
};

window.trackEvaluationAccess = (role) => {
    trackCompetitionEvent('evaluation_access', {
        'user_role': role
    });
};

// Privacy-compliant initialization
function initAnalytics() {
    // Only initialize if not in development and user hasn't opted out
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
        console.log('Analytics disabled in development mode');
        return;
    }
    
    // Check for privacy consent (you may want to implement a consent banner)
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    
    if (!hasConsent) {
        console.log('Analytics consent not given');
        // You could show a consent banner here
        return;
    }
    
    // Initialize all tracking
    initGoogleAnalytics();
    initScrollTracking();
    initClickTracking();
    initFormTracking();
    initPerformanceTracking();
    initErrorTracking();
    
    // Track initial page view
    trackPageView(document.title);
    
    console.log('Analytics fully initialized');
}

// Simple consent management
window.giveAnalyticsConsent = () => {
    localStorage.setItem('analytics-consent', 'true');
    ANALYTICS_CONFIG.COOKIE_CONSENT = true;
    initAnalytics();
};

window.revokeAnalyticsConsent = () => {
    localStorage.setItem('analytics-consent', 'false');
    ANALYTICS_CONFIG.COOKIE_CONSENT = false;
    // You might want to implement additional cleanup here
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
    initAnalytics();
} 