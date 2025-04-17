import EnhancedScrollbar from '../modules/enhanced-scrollbar.js';
import manualData from './manual.json';

class Kaysa {
  static DEFAULTS = {
    scrollSpeed: 0.8, // Scroll speed (default: 0.8)
    gap: '15px', // Gap between items (default: '15px')
    enhancedScrollbar: false, // Use custom scrollbar (default: false)
    prevButtonContent: '<', // Default content for the left button
    nextButtonContent: '>', // Default content for the right button
  };

  config = new Map();

  /**
   * Initialize Kaysa slider
   * @param {HTMLElement|Object} input - HTML element or configuration object
   */
  constructor (targetOrConfig = {}) {
    // If targetOrConfig is an HTMLElement, accept it as the target
    if (targetOrConfig instanceof window.HTMLElement) {

      this.container = targetOrConfig;
      this.config.set('target', targetOrConfig);
    } else if (typeof targetOrConfig === 'object') {
      if (!targetOrConfig.target) throw new Error('Kaysa: "target" parameter is required');
      
      this.container = typeof targetOrConfig.target === 'string'? document.querySelector(targetOrConfig.target) || document.getElementById(targetOrConfig.target.replace('#', '')): targetOrConfig.target;

      if (!this.container) throw new Error(`Kaysa: Element "${targetOrConfig.target}" not found`);
      
      // Merge configuration
      this.mergeConfig(targetOrConfig);
    } else {
      throw new TypeError('Kaysa: Input must be an HTMLElement or a configuration object');
    }

    // Prepare and initialize slider structure
    this.prepareStructure();
    this.init();

    // Make content visible
    this.showContent();
  }

  showContent () {
    this.container.classList.add('visible');
  }

  /**
   * Merge configuration with defaults
   * @param {Object} customConfig - User-provided configuration
   */
  mergeConfig (customConfig) {
  // data-attributes → config keys
    const configFromAttributes = {};

    Object.entries(this.container.dataset).forEach(([key, value]) => {
      const rawKey = key.replace('kaysa', '');
      const keyToConfig = rawKey.charAt(0).toLowerCase() + rawKey.slice(1);
      configFromAttributes[keyToConfig] = value;
    });

    [Kaysa.DEFAULTS, customConfig, configFromAttributes].forEach(source => {
      Object.entries(source).forEach(([key, value]) => {
        this.config.set(key, value);
      });
    });

    console.log(this.config);
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
    if (this.config.get('enhancedScrollbar')) {
      this.initScrollbar();
    }
    this.initButtons();
    this.addEventListeners();
  }

  /**
     * Initialize custom scrollbar
     */
  initScrollbar () {
    try {
      this.enhancedScrollbar = new EnhancedScrollbar(this.container, this.config.get('scrollbarOptions'));
    } catch (err) {
      console.warn('Scrollbar initialization failed:', err);
    }
  }

  /**
     * Create navigation buttons
     */
  initButtons () {
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
    
    // Get button content from configuration
    const content = this.config.get(`${direction === 'left' ? 'prevButtonContent' : 'nextButtonContent'}`);
    btn.innerHTML = content || (direction === 'left' ? '<' : '>'); // Default values

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
    
    // Update state of buttons
    this.prevBtn.disabled = scrollLeft <= 0;
    this.nextBtn.disabled = scrollLeft >= maxScroll;

    // Update style properties
    /* if (scrollLeft <= 0) {
      this.prevBtn.style.opacity = '0.3';
      this.prevBtn.style.cursor = 'initial';
    } else {
      this.prevBtn.style.opacity = '1';
      this.prevBtn.style.cursor = 'pointer';
    }

    if (scrollLeft >= maxScroll) {
      this.nextBtn.style.opacity = '0.3';
      this.nextBtn.style.cursor = 'initial';
    } else {
      this.nextBtn.style.opacity = '1';
      this.nextBtn.style.cursor = 'pointer';
    } */
  }

  handleMouseOver = () => {
    // console.log('hover');
  };

  handleMouseLeave = () => {
    // console.log('leave');
  };

  /**
   * Static method to display documentation in the console.
   */
  static manual () {
    // Automatically add '\n' to each line
    const lines = manualData.map(({ text, style = "" }) => [`%c${text}\n`, style]);

    console.log(lines);

    // Separate texts and styles
    const messages = lines.map(([text]) => text); // Texts
    const styles = lines.flatMap(([_, style]) => style || ''); // Styles

    // Print to console
    console.log(messages.join(''), ...styles);
  }
}

export default Kaysa;