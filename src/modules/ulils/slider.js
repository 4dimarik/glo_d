export default class Slider {
  constructor({ wrapper, slider, navigation, counters }) {
    if (wrapper) {
      this.wrapper = {
        selector: wrapper,
        el: document.querySelector(wrapper),
      };

      if (slider) {
        this.slider = {
          selector: slider,
          el: this.wrapper.el.querySelector(slider),
        };
        this.slides = this.slider.el.querySelectorAll(':scope > *');
      } else {
        console.error(`Некорректно указан селектор slider: ${slider}`);
      }
      if (navigation) {
        this.navigation = {
          next: {
            selector: navigation.next,
            el: this.wrapper.el.querySelector(navigation.next),
          },
          prev: {
            selector: navigation.prev,
            el: this.wrapper.el.querySelector(navigation.prev),
          },
        };
      } else {
        console.error(`Некорректно указан селектор navigation: ${navigation}`);
      }
      if (counters) {
        this.counters = {
          current: {
            selector: counters.current,
            el: this.wrapper.el.querySelector(counters.current),
          },
          total: {
            selector: counters.total,
            el: this.wrapper.el.querySelector(counters.total),
          },
        };
      }
    } else {
      console.error(`Некорректно указан селектор wrapper: ${wrapper}`);
    }
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
      console.log(this.counters.total.el);
      this.counters.total.el.textContent = this.state.total;
      this.counters.current.el.textContent = this.state.current;
    }
  }

  afterChangeSlide() {
    this.renderCounter();
  }
}
