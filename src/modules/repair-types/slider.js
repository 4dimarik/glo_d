export default class Slider {
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
      this.slider.el.classList.add('formula-slider-active');

      this.sliderWidth = this.slider.el.offsetWidth;
      this.slidesPerView = 3;
      this.slideWidth = +this.sliderWidth / this.slidesPerView + 20;

      this.sliders = [];
      for (let i = 0; i < this.slides.length; ++i) {
        this.sliders[i] = this.slides[i].cloneNode(true);
        this.slides[i].remove();
      }

      this.activeSlide = 0;
      this.prevSlide = null;
      this.offset = 0;

      this.wrapper.el.addEventListener('click', this.eventListener.bind(this));

      this.renderSlide([4, 5, 0, 1, 2, 3]);
      this.toggleActiveClass();
    }
    return this;
  }

  renderSlide(slides) {
    let offset = -1;
    slides.forEach((slideIndex) => {
      const left = `${offset * this.slideWidth}px`;
      this.draw(1, slideIndex, left);
      offset++;
    });
  }

  draw(direction, slideIndex, left) {
    const slide = document.createElement('div');

    slide.className = 'formula-item formula-slider__slide';
    slide.innerHTML = this.sliders[slideIndex].innerHTML;
    slide.style.left = left || `${this.sliderWidth}px`;
    slide.dataset.slideIndex = slideIndex;

    if (direction > 0) {
      this.slider.el.appendChild(slide);
    } else {
      this.slider.el.prepend(slide);
    }
  }

  eventListener({ target }) {
    if (target.closest(this.navigation.next.selector)) {
      // this.left();
      this.changeSlide(1);
    } else if (target.closest(this.navigation.prev.selector)) {
      this.changeSlide(-1);
    }
  }

  changeSlide(direction) {
    let slides = this.slider.el.querySelectorAll(':scope > *');

    const offset = direction > 0 ? -1 * this.slideWidth : this.slideWidth;
    const left = direction > 0 ? slides[this.slides.length - 1].style.left : slides[0].style.left;

    slides.forEach((slide) => {
      const currentLeft = parseInt(slide.style.left, 10);
      slide.style.left = `${currentLeft + offset}px`;
    });

    setTimeout(() => {
      if (direction > 0) {
        const { slideIndex } = slides[0].dataset;
        slides[0].remove();
        this.draw(direction, slideIndex, left);
      } else {
        const i = direction > 0 ? 0 : this.slides.length - 1;
        const { slideIndex } = slides[i].dataset;
        slides[i].remove();
        this.draw(direction, slideIndex, left);
      }
    }, 500);

    this.prevSlide = this.activeSlide;
    if (direction > 0) {
      this.activeSlide = this.activeSlide + 1 === this.slides.length ? 0 : this.activeSlide + 1;
    } else {
      this.activeSlide = this.activeSlide - 1 < 0 ? this.slides.length - 1 : this.activeSlide - 1;
    }

    this.toggleActiveClass(direction);
  }

  getSlide(num) {
    let slides = this.slider.el.querySelectorAll(':scope > *');
    return [...slides].filter((slide) => +slide.dataset.slideIndex === num)[0];
  }

  toggleActiveClass(direction) {
    if (this.prevSlide !== null) {
      const prevSlide = this.getSlide(this.prevSlide);
      prevSlide.classList.remove(this.activeClass);
    }

    const currentSlide = this.getSlide(this.activeSlide);
    currentSlide.classList.add(this.activeClass);
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

  destroy() {
    this.activated = false;
    this.toggleVisibilitySlides(false);
    return this;
  }
}
