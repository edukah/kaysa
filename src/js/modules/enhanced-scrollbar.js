/**
 * EnhancedScrollbar class provides a custom scrollbar functionality for a container element.
 */
class EnhancedScrollbar {
  /**
   * Configuration map for the scrollbar.
   * @type {Map}
   */
  config = new Map();

  /**
   * Creates an instance of EnhancedScrollbar.
   * @param {HTMLElement} containerElement - The container element that holds the scrollable content.
   * @param {Object} [config={}] - Optional configuration object for the scrollbar.
   */
  constructor (containerElement, config = {}) {
    this.kaysaContainer = containerElement;
    this.kaysaItems = containerElement.querySelector('.kaysa__items');

    this.initScrollbar();
    this.setupEventListeners();
  }

  /**
   * Initializes the scrollbar by creating and appending the necessary DOM elements.
   */
  initScrollbar () {
    this.track = document.createElement('div');
    this.track.className = 'kaysa_enhanced-scrollbar__thumb-track';
    this.scrollbar = document.createElement('div');
    this.scrollbar.className = 'kaysa_enhanced-scrollbar__thumb';
    this.track.appendChild(this.scrollbar);
    this.kaysaItems.parentNode.appendChild(this.track);
    this.updateScrollbar();
  }

  /**
   * Updates the scrollbar's size and position based on the scrollable content.
   */
  updateScrollbar = () => {
    const { clientWidth, scrollWidth, scrollLeft } = this.kaysaItems;
    const shouldShow = scrollWidth > clientWidth;

    this.track.style.display = shouldShow ? 'block' : 'none';

    if (shouldShow) {
      const scrollbarWidth = Math.max(40, (clientWidth / scrollWidth) * clientWidth);
      this.scrollbar.style.width = `${scrollbarWidth}px`;

      const scrollRatio = scrollLeft / (scrollWidth - clientWidth);
      const scrollbarLeft = scrollRatio * (clientWidth - scrollbarWidth);
      this.scrollbar.style.transform = `translateX(${scrollbarLeft}px)`;

      if (scrollbarLeft) {
        this.kaysaContainer.classList.add('is-scrolling');

        globalThis.setTimeout(() => {
          if (this.isDragging) return;

          this.kaysaContainer.classList.remove('is-scrolling');
        }, 1200);
      }
    }
  };

  /**
   * Handles the mousedown event to start dragging the scrollbar.
   * @param {MouseEvent} e - The mousedown event object.
   */
  handleMouseDown = (e) => {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startScrollLeft = this.kaysaItems.scrollLeft;
    document.body.style.cursor = 'grabbing';
    this.kaysaContainer.classList.add('is-scrolling');
    e.preventDefault();

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  /**
   * Handles the mousemove event to update the scroll position while dragging.
   * @param {MouseEvent} e - The mousemove event object.
   */
  handleMouseMove = (e) => {
    if (!this.isDragging) return;

    const { clientWidth, scrollWidth } = this.kaysaItems;
    const scrollbarWidth = parseFloat(this.scrollbar.style.width);
    const deltaX = e.clientX - this.startX;

    this.kaysaItems.scrollLeft =
      this.startScrollLeft +
      (deltaX / (clientWidth - scrollbarWidth)) * (scrollWidth - clientWidth);
  };

  /**
   * Handles the mouseup event to stop dragging the scrollbar.
   */
  handleMouseUp = () => {
    if (!this.isDragging) return;

    this.isDragging = false;
    document.body.style.cursor = '';
    this.kaysaContainer.classList.remove('is-scrolling');

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  /**
   * Sets up event listeners for the scrollbar and scrollable content.
   */
  setupEventListeners () {
    this.scrollbar.addEventListener('mousedown', this.handleMouseDown);
    this.kaysaItems.addEventListener('scroll', this.updateScrollbar);
    new globalThis.ResizeObserver(this.updateScrollbar).observe(this.kaysaItems);
  }

  /**
   * Cleans up the scrollbar by removing event listeners and DOM elements.
   */
  destroy () {
    this.scrollbar.removeEventListener('mousedown', this.handleMouseDown);
    this.kaysaItems.removeEventListener('scroll', this.updateScrollbar);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.track.remove();
  }

  /**
   * Initializes EnhancedScrollbar instances for all matching elements in the document.
   * @param {string} [selector='.kaysa__container'] - CSS selector to find container elements.
   * @returns {EnhancedScrollbar[]} An array of EnhancedScrollbar instances.
   */
  static initAll (selector = '.kaysa__container') {
    return Array.from(document.querySelectorAll(selector)).map((el) => new EnhancedScrollbar(el));
  }
}

export default EnhancedScrollbar;