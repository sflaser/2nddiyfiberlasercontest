// SKYFIRE Competition Internationalization (i18n)

// Language translations
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.registration': 'Registration',
        'nav.evaluation': 'Evaluation',
        'nav.patterns': 'Patterns',
        'nav.promote': 'Promote',
        'nav.laser-kits': 'Laser Kits',
        
        // Main Content
        'hero.title': 'SKYFIRE DIY Fiber Laser Cutter Competition 2024-2025',
        'hero.subtitle': '🏆 Join the Global Maker Community - Showcase Your DIY Fiber Laser Cutting Skills',
        'hero.description': '🌍 International Competition with $5,800 Prize Pool - Registration Deadline Sep 30, 2025',
        'hero.register-btn': 'Register Now',
        'hero.learn-more': 'Learn More',
        
        // Statistics
        'stats.participants': 'Participants Registered',
        'stats.refresh': 'Refresh',
        'stats.prize-pool': 'Total Prize Pool: $5,800 Gift Vouchers',
        
        // Timeline
        'timeline.title': 'Competition Timeline',
        'timeline.registration': 'Registration',
        'timeline.evaluation': 'Evaluation',
        'timeline.results': 'Results',
        'timeline.reg-deadline': 'Sep 30, 2025',
        'timeline.eval-start': 'Nov 30, 2025', 
        'timeline.results-date': 'Dec 15, 2025',
        
        // Form
        'form.name': 'Full Name',
        'form.email': 'Email Address',
        'form.country': 'Country/Region',
        'form.phone': 'Phone Number (Optional)',
        'form.company': 'Company/Organization',
        'form.participation': 'Participation Type',
        'form.individual': 'Individual',
        'form.team': 'Team',
        'form.power-level': 'Laser Power Level',
        'form.source': 'How did you hear about us?',
        'form.agree': 'I agree to the competition terms',
        'form.submit': 'Register Now',
        
        // Messages
        'msg.loading': 'Loading...',
        'msg.success': 'Registration successful!',
        'msg.error': 'An error occurred',
        'msg.copied': 'Copied to clipboard!',
        'msg.draft-restored': 'Draft restored',
        
        // Footer
        'footer.contact': 'Contact',
        'footer.copyright': '© 2025 SKYFIRE DIY Fiber Laser Cutter Competition. All rights reserved.',
        'footer.tagline': 'Designed for makers, by makers. Join the innovation revolution.'
    },
    
    zh: {
        // Navigation
        'nav.home': '首页',
        'nav.registration': '报名',
        'nav.evaluation': '评估',
        'nav.patterns': '图案',
        'nav.promote': '推广',
        'nav.laser-kits': '激光设备',
        
        // Main Content  
        'hero.title': 'SKYFIRE DIY光纤激光切割机大赛 2024-2025',
        'hero.subtitle': '🏆 加入全球创客社区 - 展示您的DIY光纤激光切割技能',
        'hero.description': '🌍 国际比赛，5800美元奖金池 - 报名截止日期：2025年9月30日',
        'hero.register-btn': '立即报名',
        'hero.learn-more': '了解更多',
        
        // Statistics
        'stats.participants': '参赛者已注册',
        'stats.refresh': '刷新',
        'stats.prize-pool': '总奖金池：5800美元礼品券',
        
        // Timeline
        'timeline.title': '比赛时间线',
        'timeline.registration': '报名',
        'timeline.evaluation': '评估',
        'timeline.results': '结果',
        'timeline.reg-deadline': '2025年9月30日',
        'timeline.eval-start': '2025年11月30日',
        'timeline.results-date': '2025年12月15日',
        
        // Form
        'form.name': '姓名',
        'form.email': '邮箱地址',
        'form.country': '国家/地区',
        'form.phone': '电话号码（可选）',
        'form.company': '公司/组织',
        'form.participation': '参赛类型',
        'form.individual': '个人',
        'form.team': '团队',
        'form.power-level': '激光功率等级',
        'form.source': '您是如何了解我们的？',
        'form.agree': '我同意比赛条款',
        'form.submit': '立即报名',
        
        // Messages
        'msg.loading': '加载中...',
        'msg.success': '注册成功！',
        'msg.error': '发生错误',
        'msg.copied': '已复制到剪贴板！',
        'msg.draft-restored': '草稿已恢复',
        
        // Footer
        'footer.contact': '联系我们',
        'footer.copyright': '© 2025 SKYFIRE DIY光纤激光切割机大赛。版权所有。',
        'footer.tagline': '为创客而设计，由创客打造。加入创新革命。'
    }
};

// Current language
let currentLanguage = localStorage.getItem('skyfire-language') || 'en';

// Get translation
function t(key) {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
}

// Set language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('skyfire-language', lang);
        updatePageText();
        updateLanguageSelector();
        
        // Trigger custom event for other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
}

// Update all text on page
function updatePageText() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.type === 'submit' || element.type === 'button') {
                element.value = translation;
            } else {
                element.placeholder = translation;
            }
        } else {
            element.textContent = translation;
        }
    });
    
    // Update document title
    const titleKey = document.querySelector('[data-i18n-title]')?.getAttribute('data-i18n-title');
    if (titleKey) {
        document.title = t(titleKey);
    }
}

// Update language selector
function updateLanguageSelector() {
    document.querySelectorAll('.language-selector select').forEach(select => {
        select.value = currentLanguage;
    });
    
    document.querySelectorAll('.language-selector button').forEach(button => {
        const lang = button.getAttribute('data-lang');
        button.classList.toggle('active', lang === currentLanguage);
    });
}

// Create language selector
function createLanguageSelector() {
    const selector = document.createElement('div');
    selector.className = 'language-selector flex items-center gap-2';
    selector.innerHTML = `
        <div class="relative">
            <select onchange="setLanguage(this.value)" class="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="en">🇺🇸 English</option>
                <option value="zh">🇨🇳 中文</option>
            </select>
        </div>
    `;
    
    return selector;
}

// Add language selector to navigation
function addLanguageSelectorToNav() {
    const nav = document.querySelector('nav .hidden.lg\\:flex');
    if (nav && !nav.querySelector('.language-selector')) {
        const selector = createLanguageSelector();
        nav.appendChild(selector);
        updateLanguageSelector();
    }
}

// Auto-detect language from browser
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    
    if (translations[langCode] && !localStorage.getItem('skyfire-language')) {
        setLanguage(langCode);
    }
}

// Initialize i18n
function initI18n() {
    detectLanguage();
    updatePageText();
    addLanguageSelectorToNav();
    
    // Add to window for global access
    window.t = t;
    window.setLanguage = setLanguage;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
} 