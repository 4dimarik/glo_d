import Slider from '../ulils/slider';

export default class RepairTypesSlider extends Slider {
  constructor() {
    super({
      wrapper: '.repair-types-slider-wrap',
      slider: '.repair-types-slider',
      navigation: {
        next: '#repair-types-arrow_right',
        prev: '#repair-types-arrow_left',
      },
      counters: {
        current: '.slider-counter-content__current',
        total: '.slider-counter-content__total',
      },
    });
  }

  init() {
    if (!this.activated) {
      this.activated = true;
      this.state = { prev: null, current: 1, total: 0 };

      this.state.total = this.slides.length; // Set Total Slides

      // Hidden Slides
      this.toggleVisibilitySlides(true);

      // Set EventListener
      this.wrapper.el.addEventListener('click', this.eventListener.bind(this));
    }
    return this;
  }

  destroy() {
    this.activated = false;
    this.toggleVisibilitySlides(false);
    return this;
  }

  eventListener({ target }) {
    let direction = null;
    if (target.closest(this.navigation.next.selector)) {
      direction = 1;
    } else if (target.closest(this.navigation.prev.selector)) {
      direction = -1;
    }
    if (direction) {
      this.state.prev = this.state.current;
      const nextSlide = this.state.current + direction;

      if (direction > 0) {
        this.state.current = nextSlide > this.state.total ? 1 : nextSlide;
      }

      if (direction < 0) {
        this.state.current = nextSlide < 1 ? this.state.total : nextSlide;
      }
    }

    this.changeSlide();
  }

  toggleVisibilitySlides(hidden) {
    if (hidden) {
      [...this.slides].forEach((slide, index) => {
        slide.style.display = index !== this.state.current - 1 ? 'none' : null;
      });
    } else {
      [...this.slides].forEach((slide) => {
        slide.style.display = null;
      });
    }
  }

  setState(props = {}) {
    this.state.prev = props.current !== this.state.current ? this.state.current : null;
    this.state = { ...this.state, ...props };
    return this;
  }

  changeSlide() {
    const currentSlideIndex = this.state.current - 1;
    this.slides[currentSlideIndex].style.display = null;
    if (this.state.prev) {
      const prevSlideIndex = this.state.prev - 1;
      this.slides[prevSlideIndex].style.display = 'none';
    }
    this.afterChangeSlide();
  }

  renderCounter() {
    if (this.counters) {
      this.counters.total.el.textContent = this.state.total;
      this.counters.current.el.textContent = this.state.current;
    }
  }

  afterChangeSlide() {
    this.renderCounter();
  }
}
