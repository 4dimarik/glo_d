export default class Slider2 {
  constructor({ wrapper, slider, activeClass = null, navigation, counters }) {
    if (wrapper) {
      this.wrapper = {
        selector: wrapper,
        el: document.querySelector(wrapper),
      };

      this.activeClass = activeClass;

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

  init(section) {
    if (!this.activated) {
      this.activated = true;
      this.state = { prev: null, current: 1, total: 0 };
      this.section = section;

      this.state.total = this.slides.length; // Set Total Slides

      //
      this.props = {};
      this.props.slideWidth = getComputedStyle(this.slides[0]).getPropertyValue('width');
      // Set EventListener
      this.wrapper.el.addEventListener('click', this.eventListener.bind(this));

      switch (section) {
        case 'formula':
          this.slider.el.classList.add('formula-slider-active');
          break;
        case 'transparency':
          // Hidden Slides
          this.toggleVisibilitySlides(true);
          break;
        default:
          break;
      }
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

    this.changeSlide(direction);
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
    return this;
  }

  setState(props = {}) {
    this.state.prev = props.current !== this.state.current ? this.state.current : null;
    this.state = { ...this.state, ...props };
    return this;
  }

  changeSlide(direction) {
    switch (this.section) {
      case 'formula':
        break;
      case 'transparency':
        const currentSlideIndex = this.state.current - 1;
        this.slides[currentSlideIndex].style.display = null;
        if (this.state.prev) {
          const prevSlideIndex = this.state.prev - 1;
          this.slides[prevSlideIndex].style.display = 'none';
        }
        // Add/Remove class active slide
        if (this.activeClass) {
          this.toggleActiveClass();
        }
        break;
      default:
        break;
    }
  }

  toggleActiveClass() {
    if (this.state.prev) {
      const prevPopup = this.slides[this.state.prev - 1];
      console.log(prevPopup);
      prevPopup.classList.remove(this.activeClass);
    }
    if (this.state.current) {
      const currentPopup = this.slides[this.state.current - 1];
      console.log(currentPopup);
      currentPopup.classList.add(this.activeClass);
    }
    return this;
  }

  afterChangeSlide(direction) {
    switch (this.section) {
      case 'formula':
        if (direction > 0) {
          this.slider.el.append(this.slides[0]);
        }
        this.slides = this.slider.el.querySelectorAll(':scope > *');
        break;
      case 'transparency':
        break;
      default:
        break;
    }
  }
}
