class EnhancedScrollbar {
  config = new Map();
  
  constructor (containerElement, config = {}) {
    this.kaysaContainer = containerElement;
    this.kaysaItems = containerElement.querySelector('.kaysa-items');

    this.initScrollbar();
    this.setupEventListeners();
  }

  initScrollbar () {
    this.track = document.createElement('div');
    this.track.className = 'enhanced-scrollbar-track';
    this.scrollbar = document.createElement('div');
    this.scrollbar.className = 'enhanced-scrollbar';
    this.track.appendChild(this.scrollbar);
    this.kaysaItems.parentNode.appendChild(this.track);
    this.updateScrollbar();
  }

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
        this.kaysaContainer.classList.add('scrolling');

        window.setTimeout(() => {
          if (this.isDragging) return;

          this.kaysaContainer.classList.remove('scrolling');
        }, 1200);
      }
    }
  };

  handleMouseDown = (e) => {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startScrollLeft = this.kaysaItems.scrollLeft;
    document.body.style.cursor = 'grabbing';
    this.kaysaContainer.classList.add('scrolling');
    e.preventDefault();

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseMove = (e) => {
    if (!this.isDragging) return;

    const { clientWidth, scrollWidth } = this.kaysaItems;
    const scrollbarWidth = parseFloat(this.scrollbar.style.width);
    const deltaX = e.clientX - this.startX;

    this.kaysaItems.scrollLeft = this.startScrollLeft +
    (deltaX / (clientWidth - scrollbarWidth)) * (scrollWidth - clientWidth);
  };

  handleMouseUp = () => {
    if (!this.isDragging) return;

    this.isDragging = false;
    document.body.style.cursor = '';
    this.kaysaContainer.classList.remove('scrolling');

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  setupEventListeners () {
    this.scrollbar.addEventListener('mousedown', this.handleMouseDown);
    this.kaysaItems.addEventListener('scroll', this.updateScrollbar);
    new window.ResizeObserver(this.updateScrollbar).observe(this.kaysaItems);
  }

  destroy () {
    this.scrollbar.removeEventListener('mousedown', this.handleMouseDown);
    this.kaysaItems.removeEventListener('scroll', this.updateScrollbar);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.track.remove();
  }

  static initAll (selector = '.kaysa-container') {
    return Array.from(document.querySelectorAll(selector))
      .map(el => new EnhancedScrollbar(el));
  }
}

export default EnhancedScrollbar;