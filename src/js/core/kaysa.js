import EnhancedScrollbar from '../modules/enhanced-scrollbar.js';
import manualData from './manual.json';

class Kaysa {
  static DEFAULTS = {
    scrollSpeed: 0.8, // Kaydırma hızı (varsayılan: 0.8)
    gap: '15px', // Öğeler arasındaki boşluk (varsayılan: '15px')
    enhancedScrollbar: false, // Özel kaydırma çubuğu kullanımı (varsayılan: false)
    prevButtonContent: '<', // Sol buton için varsayılan içerik
    nextButtonContent: '>', // Sağ buton için varsayılan içerik
  };

  config = new Map();

  /**
   * Initialize Kaysa slider
   * @param {HTMLElement|Object} input - HTML element or configuration object
   */
  constructor (targetOrConfig = {}) {
    // Eğer targetOrConfig bir HTMLElement ise, target olarak kabul et
    if (targetOrConfig instanceof window.HTMLElement) {

      this.container = targetOrConfig;
      this.config.set('target', targetOrConfig);
    } else if (typeof targetOrConfig === 'object') {
      if (!targetOrConfig.target) throw new Error('Kaysa: "target" parameter is required');
      
      this.container = typeof targetOrConfig.target === 'string'? document.querySelector(targetOrConfig.target) || document.getElementById(targetOrConfig.target.replace('#', '')): targetOrConfig.target;

      if (!this.container) throw new Error(`Kaysa: Element "${targetOrConfig.target}" not found`);
      
      // Yapılandırmayı birleştir
      this.mergeConfig(targetOrConfig);
    } else {
      throw new TypeError('Kaysa: Input must be an HTMLElement or a configuration object');
    }

    // Slider yapısını hazırla ve başlat
    this.prepareStructure();
    this.init();

    // İçeriği görünür hale getir
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
    [Kaysa.DEFAULTS, customConfig, this.getConfigFromAttributes()].forEach(source => {
      Object.entries(source).forEach(([key, value]) => {
        if (Kaysa.DEFAULTS[key] != null && value != null) {
          this.config.set(key, value);
        }
      });
    });
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
      enhancedScrollbar: Boolean(this.container.dataset.kaysaUseEnhancedScrollbar) || undefined,
      prevButtonContent: this.container.dataset.kaysaPrevButtonContent || undefined,
      nextButtonContent: this.container.dataset.kaysaNextButtonContent || undefined,
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
    
    // Buton içeriğini yapılandırmadan al
    const content = this.config.get(`${direction === 'left' ? 'prevButtonContent' : 'nextButtonContent'}`);
    btn.innerHTML = content || (direction === 'left' ? '<' : '>'); // Varsayılan değerler

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
    
    // Butonların aktif/pasif durumunu güncelle
    this.prevBtn.disabled = scrollLeft <= 0;
    this.nextBtn.disabled = scrollLeft >= maxScroll;

    // Buton stillerini güncelle
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
    // Her satıra otomatik olarak '\n' ekleme
    const lines = manualData.map(({ text, style }) => [`%c${text}\n`, style]);

    // Metinleri ve stilleri ayır
    const messages = lines.map(([text]) => text); // Metinler
    const styles = lines.flatMap(([_, style]) => style || ''); // Stiller

    // Console'a yazdır
    console.log(messages.join(''), ...styles);
  }
}

export default Kaysa;