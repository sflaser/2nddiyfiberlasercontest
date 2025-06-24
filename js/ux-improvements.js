// SKYFIRE Competition UX Improvements

// Global Loading Overlay
function showLoadingOverlay(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = 'fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300';
    overlay.innerHTML = `
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p class="text-gray-600 font-medium">${message}</p>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('opacity-100'), 50);
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.remove(), 300);
    }
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 4000) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full max-w-sm`;
    
    const icons = {
        success: '<i class="fas fa-check-circle mr-2"></i>',
        error: '<i class="fas fa-exclamation-circle mr-2"></i>',
        warning: '<i class="fas fa-exclamation-triangle mr-2"></i>',
        info: '<i class="fas fa-info-circle mr-2"></i>'
    };
    
    const colors = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        warning: 'bg-yellow-600 text-white',
        info: 'bg-blue-600 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.innerHTML = `
        <div class="flex items-center">
            ${icons[type] || icons.info}
            <span class="font-medium">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in animation
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 50);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// Form Validation Enhancement
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('border-red-500')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Remove previous validation styles
    field.classList.remove('border-red-500', 'border-green-500');
    
    // Remove previous error message
    const existingError = field.parentNode.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    else if (field.name === 'phone' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 8) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Apply validation styles
    if (isValid) {
        field.classList.add('border-green-500');
    } else {
        field.classList.add('border-red-500');
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error text-red-500 text-sm mt-1';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Progressive Enhancement for Tables
function enhanceTablesForMobile() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // Add horizontal scroll indicator
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper relative';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
        
        // Add scroll indicator
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 text-xs rounded-bl opacity-75';
        scrollIndicator.innerHTML = '<i class="fas fa-arrows-alt-h mr-1"></i>Scroll →';
        wrapper.appendChild(scrollIndicator);
        
        // Hide indicator when not needed
        function checkScroll() {
            const isScrollable = table.scrollWidth > table.clientWidth;
            scrollIndicator.style.display = isScrollable ? 'block' : 'none';
        }
        
        checkScroll();
        window.addEventListener('resize', checkScroll);
    });
}

// Smooth Page Transitions
function addPageTransitions() {
    // Add page loading transition
    document.addEventListener('DOMContentLoaded', function() {
        document.body.classList.add('page-loaded');
    });
    
    // Smooth scroll for anchor links
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
}

// Enhanced Copy Functionality
function enhanceCopyFeatures() {
    // Add visual feedback for copy actions
    window.copyTextWithFeedback = function(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const text = element.textContent || element.innerText;
        
        navigator.clipboard.writeText(text).then(() => {
            element.classList.add('copy-success');
            showNotification('Text copied to clipboard!', 'success', 2000);
            
            setTimeout(() => {
                element.classList.remove('copy-success');
            }, 1000);
        }).catch(() => {
            showNotification('Failed to copy text', 'error');
        });
    };
}

// Auto-save Form Data
function addAutoSaveFeature() {
    const forms = document.querySelectorAll('form[data-autosave]');
    
    forms.forEach(form => {
        const formId = form.getAttribute('data-autosave');
        
        // Load saved data
        const savedData = localStorage.getItem(`autosave_${formId}`);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = form.querySelector(`[name="${key}"]`);
                    if (field) {
                        field.value = data[key];
                    }
                });
                showNotification('Draft restored', 'info', 2000);
            } catch (e) {
                console.warn('Failed to restore form data:', e);
            }
        }
        
        // Save data on change
        form.addEventListener('input', function() {
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            localStorage.setItem(`autosave_${formId}`, JSON.stringify(data));
        });
        
        // Clear on successful submission
        form.addEventListener('submit', function() {
            localStorage.removeItem(`autosave_${formId}`);
        });
    });
}

// Initialize all UX improvements
function initUXImprovements() {
    enhanceFormValidation();
    enhanceTablesForMobile();
    addPageTransitions();
    enhanceCopyFeatures();
    addAutoSaveFeature();
    
    // Add page transition CSS
    if (!document.querySelector('#ux-styles')) {
        const style = document.createElement('style');
        style.id = 'ux-styles';
        style.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            body.page-loaded {
                opacity: 1;
            }
            .table-wrapper {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }
            .validation-error {
                animation: fadeInUp 0.3s ease;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUXImprovements);
} else {
    initUXImprovements();
} 