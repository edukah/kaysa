import CustomScrollbar from '../modules/custom-scrollbar.js';

const DEFAULTS = {
    scrollSpeed: 0.8,
    gap: '15px',
    useCustomScrollbar: false,
    scrollbarOptions: {
        color: '#4CAF50',
        width: '8px'
    }
};

class Kaysa {
    config = new Map();

    /**
     * Initialize Kaysa slider
     * @param {Object} params - Configuration object
     * @param {HTMLElement|string} params.target - Container element or selector
     * @param {Object} [params.config={}] - Configuration options
     */
    constructor (params = {}) {
        // Element seçimi
        if (!params.target) throw new Error('Kaysa: "target" parameter is required');

        this.container = typeof params.target === 'string' ? document.querySelector(params.target) || document.getElementById(params.target.replace('#', '')) : params.target;

        if (!this.container) throw new Error(`Kaysa: Element "${params.target}" not found`);

        // Original config merge logic
        const attributeConfig = this.getConfigFromAttributes();

        [DEFAULTS, params, attributeConfig].forEach(source => {
            Object.entries(source).forEach(([key, value]) => {
                if (DEFAULTS[key] != null && value != null) {
                    this.config.set(key, value);
                }
            });
        });

        // Original initialization flow
        this.prepareStructure();
        this.init();
    }

    /**
     * Get config from data attributes
     * @returns {Object} Configuration from data attributes
     */
    getConfigFromAttributes () {
        if (!this.container) return {};

        return {
            scrollSpeed: parseFloat(this.container.dataset.kaysaScrollSpeed) || undefined,
            gap: this.container.dataset.kaysaGap || undefined,
            useCustomScrollbar: Boolean(this.container.dataset.kaysaUseCustomScrollbar) || undefined
        };
    }

    /**
     * Prepare DOM structure
     */
    prepareStructure () {
        this.itemsContainer = this.container.querySelector('.kaysa-items');

        if (!this.itemsContainer) {
            this.itemsContainer = document.createElement('div');
            this.itemsContainer.className = 'kaysa-items';
            this.itemsContainer.style.gap = this.config.get('gap');

            while (this.container.firstChild) {
                this.itemsContainer.appendChild(this.container.firstChild);
            }

            this.container.appendChild(this.itemsContainer);
        }

        this.container.classList.add('kaysa-container');
    }

    /**
     * Initialize slider components
     */
    init () {
        if (this.config.get('useCustomScrollbar')) {
            this.initScrollbar();
        }
        this.setupButtons();
        this.addEventListeners();
    }

    /**
     * Initialize custom scrollbar
     */
    initScrollbar () {
        try {
            this.customScrollbar = new CustomScrollbar(this.container, this.config.get('scrollbarOptions'));
        } catch (err) {
            console.warn('Scrollbar initialization failed:', err);
        }
    }

    /**
     * Create navigation buttons
     */
    setupButtons () {
        this.prevBtn = this.createButton('left');
        this.nextBtn = this.createButton('right');
        this.updateButtons();
    }

    /**
     * Create a navigation button
     * @param {string} direction - 'left' or 'right'
     * @returns {HTMLElement} Button element
     */
    createButton (direction) {
        const btn = document.createElement('button');
        btn.className = `kaysa-button kaysa-button--${direction}`;
        btn.innerHTML = direction === 'left' ? '&lt;' : '&gt;';
        this.container.appendChild(btn);
        return btn;
    }

    /**
     * Add event listeners
     */
    addEventListeners () {
        this.prevBtn.addEventListener('click', () => this.scroll('left'));
        this.nextBtn.addEventListener('click', () => this.scroll('right'));

        this.container.addEventListener('mouseover', this.handleMouseOver);
        this.container.addEventListener('mouseleave', this.handleMouseLeave);

        this.itemsContainer.addEventListener('scroll', () => this.updateButtons());
    }

    /**
     * Scroll the slider
     * @param {string} direction - 'left' or 'right'
     */
    scroll (direction) {
        console.log('burda');
        const amount = this.itemsContainer.clientWidth * this.config.get('scrollSpeed');
        this.itemsContainer.scrollBy({
            left: direction === 'right' ? amount : -amount,
            behavior: 'smooth'
        });
    }

    /**
     * Update button states based on scroll position
     */
    updateButtons () {
        const { scrollLeft, scrollWidth, clientWidth } = this.itemsContainer;
        const maxScroll = scrollWidth - clientWidth;
        this.prevBtn.disabled = scrollLeft <= 0;
        this.nextBtn.disabled = scrollLeft >= maxScroll;
    }

    handleMouseOver = () => {
        console.log('hover');
    };

    handleMouseLeave = () => {
        console.log('leave');
    };

    static manual () {
        const lines = [
            ['%c📚 Kaysa Manual (v1.0.0)%c\n', ['color: #6c5ce7; font-weight: bold; font-size: 1.2em;', '']],
            ['%c🔧 Configuration Options:%c\n', ['color: #00b894; font-weight: bold;', '']],
            ['  - %cscrollSpeed%c:        Number (0.1–1) \tDefault: 0.8      \t%cHTML: data-kaysa-scroll-speed%c\n', ['color: #fd79a8;', '', 'color: #636e72; font-size: 0.9em;', '']],
            ['  - %cgap%c:                String (CSS)   \tDefault: \'15px\'  \t%cHTML: data-kaysa-gap%c\n', ['color: #fd79a8;', '', 'color: #636e72; font-size: 0.9em;', '']],
            ['  - %cuseCustomScrollbar%c: Boolean        \tDefault: false    \t%cHTML: data-kaysa-use-custom-scrollbar%c\n\n', ['color: #fd79a8;', '', 'color: #636e72; font-size: 0.9em;', '']],
            ['%c📌 Example Usage:%c\n', ['color: #0984e3; font-weight: bold;', '']],
            ['  %c// JavaScript%c\n', ['color: #dfe6e9; background: #2d3436; padding: 2px 4px; border-radius: 3px;', '']],
            ['  new Kaysa({ target: \'.slider\', scrollSpeed: 0.7, gap: \'15px\' });\n\n'],
            ['  %c// HTML Attribute%c\n', ['color: #dfe6e9; background: #2d3436; padding: 2px 4px; border-radius: 3px;', '']],
            ['  <div class="slider" data-kaysa-scroll-speed="0.7" data-kaysa-gap="15px">\n\n'],
            ['%c🌐 GitHub:%c https://github.com/edukah/kaysa', ['color: #74b9ff; text-decoration: underline;', '']]
        ];

        const message = lines.map(([text]) => text).join('');
        const styles = lines.flatMap(([_, styles = []]) => styles);

        console.log(message, ...styles);
    }
}

export default Kaysa;