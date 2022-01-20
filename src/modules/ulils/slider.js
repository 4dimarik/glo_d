export default class Slider {
  constructor({
    wrapper,
    slider,
    sliderClass = null,
    activeClass = null,
    slidesPerView = 1,
    startOrder = null,
    navigation,
    counters,
  }) {
    if (wrapper) {
      this.activated = false;
      this.sliderClass = sliderClass;
      this.activeClass = activeClass;
      this.slidesPerView = slidesPerView;

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

  init(section) {
    if (!this.activated) {
      this.activated = true;
      if (this.sliderClass) this.slider.el.classList.add(this.sliderClass);

      this.sliderWidth = this.slider.el.offsetWidth;
      this.slideWidth = +this.sliderWidth / this.slidesPerView;
      this.slideLeft = this.slideWidth + 20;

      this.activeSlide = 0;
      this.prevSlide = null;
      this.offset = 0;

      this.wrapper.el.addEventListener('click', this.eventListener.bind(this));

      this.renderSlide();
      this.toggleActiveClass();
    }
    return this;
  }

  renderSlide() {
    const slides = this.getOrderSlide();
    let offset = -1;
    slides.forEach((slideIndex) => {
      const left = `${offset * this.slideLeft}px`;
      this.draw(1, slideIndex, left);
      offset++;
    });
    return this;
  }

  getOrderSlide() {
    let IndexSlide = this.slidesPerView + 1;
    const order = [];
    for (let i = 0; i < this.slides.length; i++) {
      order.push(IndexSlide);
      IndexSlide = IndexSlide + 1 === this.slides.length ? 0 : IndexSlide + 1;
    }
    return order;
  }

  draw(direction, slideIndex, left) {
    const slide = this.slides[slideIndex];
    // slide.style.width = `${this.slideWidth}px`;
    slide.style.left = left || `${this.slideLeft}px`;
    slide.dataset.slideIndex = slideIndex;

    if (direction > 0) {
      this.slider.el.appendChild(slide);
    } else {
      this.slider.el.prepend(slide);
    }
  }

  eventListener({ target }) {
    if (!this.block) {
      if (target.closest(this.navigation.next.selector)) {
        this.changeSlide(1);
      } else if (target.closest(this.navigation.prev.selector)) {
        this.changeSlide(-1);
      }
    }
  }

  changeSlide(direction) {
    this.block = true;
    let slides = this.slider.el.querySelectorAll(':scope > *');

    const offset = direction > 0 ? -1 * this.slideLeft : this.slideLeft;
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
      this.block = false;
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

  activate() {
    this.activated = true;
    console.log(this);
    return this;
  }

  destroy() {
    this.activated = false;
    this.slider.el.classList.remove(this.sliderClass);
    this.slider.el.getElementsByClassName(this.activeClass)[0].classList.remove(this.activeClass);
    this.slides.forEach((slide) => {
      slide.style = null;
    });
    this.slider.el.innerHTML = '';
    this.slides.forEach((slide) => {
      this.slider.el.append(slide);
    });

    return this;
  }
}
