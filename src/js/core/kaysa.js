import EnhancedScrollbar from '../modules/enhanced-scrollbar.js';
import helpData from '../docs/help.json';

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
    if (targetOrConfig instanceof globalThis.HTMLElement) {

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
    this.container.classList.add('is-visible');
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

  }

  /**
     * Prepare DOM structure
     */
  prepareStructure () {
    this.itemsContainer = this.container.querySelector('.kaysa__items');

    if (!this.itemsContainer) {
      this.itemsContainer = document.createElement('div');
      this.itemsContainer.className = 'kaysa__items';
      this.itemsContainer.style.gap = this.config.get('gap');

      while (this.container.firstChild) {
        this.itemsContainer.appendChild(this.container.firstChild);
      }

      this.container.appendChild(this.itemsContainer);
    }

    this.container.classList.add('kaysa__container');
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
    btn.className = `kaysa__button kaysa__button--${direction}`;
    
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

    new ResizeObserver(() => this.updateButtons()).observe(this.itemsContainer);
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
    const hasScroll = scrollWidth > clientWidth;

    this.prevBtn.style.display = hasScroll ? '' : 'none';
    this.nextBtn.style.display = hasScroll ? '' : 'none';

    if (hasScroll) {
      const maxScroll = scrollWidth - clientWidth;
      this.prevBtn.disabled = scrollLeft <= 0;
      this.nextBtn.disabled = scrollLeft >= maxScroll;
    }

    if (this.enhancedScrollbar) {
      this.enhancedScrollbar.updateScrollbar();
    }

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

  /**
     * Add an element to the slider
     * @param {HTMLElement} element - Element to add
     * @param {number} [index] - Position to insert at (default: end)
     */
  add (element, index) {
    const { children } = this.itemsContainer;

    if (index !== undefined && children[index]) {
      this.itemsContainer.insertBefore(element, children[index]);
    } else {
      this.itemsContainer.appendChild(element);
    }

    this.updateButtons();
  }

  /**
     * Remove an element from the slider
     * @param {number} [index] - Index of the element to remove (default: last)
     */
  remove (index) {
    const { children } = this.itemsContainer;
    if (!children.length) return;

    const item = index !== undefined ? children[index] : children[children.length - 1];
    if (item) {
      item.remove();
      this.updateButtons();
    }
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
  static help () {
    const lines = helpData.map(({ text, style }) => [`%c${text}\n`, style]);
    const messages = lines.map(([text]) => text);
    const styles = lines.flatMap(([_, style]) => style || '');

    console.log(messages.join(''), ...styles);
  }
}

export default Kaysa;