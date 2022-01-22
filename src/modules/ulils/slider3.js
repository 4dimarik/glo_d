export default class Slider3 {
  constructor({
    wrapper,
    slider,
    activeClass,
    slidesPerView = 1,
    startOrder = null,
    duration = '0',
    navigation,
    counters,
    dots,
  }) {
    if (wrapper) {
      this.activated = false;
      this.activeClass = activeClass;
      this.slidesPerView = slidesPerView;
      this.duration = duration;

      this.wrapper = {
        selector: wrapper,
        el: document.querySelector(wrapper),
      };

      if (slider) {
        this.slider = {
          selector: slider,
          el: this.wrapper.el.querySelector(slider),
        };
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

      if (dots) {
        this.dots = {
          block: {
            selector: dots.blockSelector,
            el: document.querySelector(dots.blockSelector),
          },
          class: dots.class,
          activeClass: dots.activeClass,
        };
        this.dots.array = this.dots.block.el.querySelectorAll(':scope > *');
      }

      this.sliderWrapper = {
        class: 'xSlider__slider-wrapper',
        el: null,
      };
      this.sliderHTML = this.slider.el.innerHTML;

      this.wrapper.el.addEventListener('click', this.eventListener.bind(this));
      this?.dots?.block.el.addEventListener('click', this.dotsEventListener.bind(this));
    } else {
      console.error(`Некорректно указан селектор wrapper: ${wrapper}`);
    }
  }

  init(section) {
    if (!this.activated) {
      this.activated = true;

      this.wrapper.el.classList.add('xSlider');
      this.slider.el.classList.add('xSlider__slider');
      this.navigation.prev.el.classList.add('xSlider__btn');
      this.navigation.next.el.classList.add('xSlider__btn');
      this?.dots?.block.el.classList.add('d-flex');

      // const sliderHTML = this.slider.el.innerHTML;
      this.slider.el.innerHTML = `<div class='${this.sliderWrapper.class}'>${this.sliderHTML}</div>`;
      this.sliderWrapper.el = this.wrapper.el.querySelector(`.${this.sliderWrapper.class}`);
      this.slides = this.sliderWrapper.el.querySelectorAll(':scope > *');

      this.props = {};
      this.props.count = this.slides.length;
      this.props.lastIndex = this.props.count - 1;
      this.props.currentIndex = 0;
      this.props.translateX = this.wrapper.el.offsetWidth / this.slidesPerView;

      this.props.startMove = this.slidesPerView > 1 ? this.slidesPerView - 1 : this.slidesPerView;

      this.renderSlide();

      this.moveSlide(this.props.startMove); // this.props.activeSlide

      this.props.activeSlide = this.slidesPerView;
      this.getSlide(this.props.activeSlide).classList.add(this.activeClass);
    }
    // console.log(this.wrapper.selector, this.props);
    return this;
  }

  renderSlide() {
    this.slides.forEach((slide, index) => {
      slide.dataset.slideIndex = index;
      slide.style.minWidth = `${Math.abs(this.props.translateX)}px`;
    });

    for (let i = 0; i < this.slidesPerView; i++) {
      this.sliderWrapper.el.append(this.slides[i].cloneNode(true));
      this.sliderWrapper.el.prepend(this.slides[this.props.lastIndex - i].cloneNode(true));
    }

    const slides = this.sliderWrapper.el.querySelectorAll(':scope > *');
    const count = slides.length;
    [...slides].forEach((slide, index) => {
      if (index === this.slidesPerView - this.props.startMove) {
        slide.classList.add('slide-prevMove');
      }
      if (index === count - this.props.startMove) {
        slide.classList.add('slide-nextMove');
      }
    });
  }

  eventListener({ target }) {
    if (target.closest(this.navigation.next.selector)) {
      this.changeSlide(1);
    } else if (target.closest(this.navigation.prev.selector)) {
      this.changeSlide(-1);
    }
  }

  dotsEventListener({ target }) {
    if (target.classList.contains(this.dots.class)) {
      this.changeSlide(0, [...this.dots.array].indexOf(target));
    }
  }

  moveSlide(n) {
    const translateX = -1 * this.props.translateX * n;
    this.sliderWrapper.el.style.cssText = `transition-duration: 0ms; transform: translateX(${translateX}px);`;
    this.props.currentTranslateX = translateX;
  }

  getSlide(num) {
    let slides = this.sliderWrapper.el.querySelectorAll(':scope > *');
    return slides[num];
  }

  changeSlide(direction, slideIndex = null) {
    // prevSlide
    const prevSlide = this.getSlide(this.props.activeSlide);
    prevSlide.classList.remove(this.activeClass);
    // prevDot
    this?.dots?.array[this.props.currentIndex].classList.remove(this.dots.activeClass);
    if (direction < 0) {
      if (prevSlide.classList.contains('slide-prevMove')) {
        this.moveSlide(this.props.count);
        this.props.activeSlide = this.props.count + (this.props.startMove - 1);
      }
      let translateX = this.props.currentTranslateX + this.props.translateX;
      setTimeout(() => {
        this.sliderWrapper.el.style.cssText = `transition-duration: ${this.duration}ms; transform: translateX(${translateX}px);`;
      }, 0);

      this.props.currentTranslateX = translateX;

      this.props.currentIndex = this.props.currentIndex - 1 < 0 ? this.props.lastIndex : this.props.currentIndex - 1;

      this.props.activeSlide -= 1;
    }
    if (direction > 0) {
      if (prevSlide.classList.contains('slide-nextMove')) {
        this.moveSlide(this.slidesPerView);

        this.props.activeSlide = this.slidesPerView > 1 ? this.slidesPerView + 1 : this.slidesPerView;
      }

      let translateX = this.props.currentTranslateX - this.props.translateX;
      setTimeout(() => {
        this.sliderWrapper.el.style.cssText = `transition-duration: ${this.duration}ms; transform: translateX(${translateX}px);`;
      }, 0);
      this.props.currentTranslateX = translateX;

      this.props.currentIndex = this.props.currentIndex + 1 > this.props.lastIndex ? 0 : this.props.currentIndex + 1;
      this.props.activeSlide += 1;
    }

    if (direction === 0) {
      this.moveSlide(slideIndex + 1);
      this.props.currentIndex = slideIndex;
      this.props.activeSlide = slideIndex + 1;
    }

    // currentSlide
    const currentSlide = this.getSlide(this.props.activeSlide);
    currentSlide.classList.add(this.activeClass);
    // currentDot
    this?.dots?.array[this.props.currentIndex].classList.add(this.dots.activeClass);
  }

  activate() {
    this.activated = true;
    console.log(this);
    return this;
  }

  destroy() {
    this.activated = false;
    // this.slider.el.getElementsByClassName(this.activeClass)[0].classList.remove(this.activeClass);
    // this.slides.forEach((slide) => {
    //   slide.style = null;
    // });
    this.slider.el.innerHTML = this.sliderHTML;
    //
    // this.slides.forEach((slide) => {
    //   this.slider.el.append(slide);
    // });
    return this;
  }
}
