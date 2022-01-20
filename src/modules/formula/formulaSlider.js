import Slider from '../ulils/slider';

export default class FormulaSlider extends Slider {
  constructor() {
    super({
      wrapper: '#formula .formula-slider-wrap',
      sliderClass: 'formula-slider-active',
      activeClass: 'formula-slide-active',
      slidesPerView: 3,
      // startOrder: [4, 5, 0, 1, 2, 3],
      slider: '.formula-slider',
      navigation: {
        prev: '#formula-arrow_left',
        next: '#formula-arrow_right',
      },
    });
  }

  // init(section) {
  //   if (!this.activated) {
  //     this.activated = true;
  //     this.slider.el.classList.add('formula-slider-active');
  //
  //     this.sliderWidth = this.slider.el.offsetWidth;
  //     this.slideWidth = +this.sliderWidth / this.slidesPerView + 20;
  //
  //     this.activeSlide = 0;
  //     this.prevSlide = null;
  //     this.offset = 0;
  //
  //     this.wrapper.el.addEventListener('click', this.eventListener.bind(this));
  //
  //     this.renderSlide();
  //     this.toggleActiveClass();
  //   }
  //   return this;
  // }

  // renderSlide() {
  //   const slides = this.getOrderSlide();
  //   console.log('renderSlides', slides);
  //   let offset = -1;
  //   slides.forEach((slideIndex) => {
  //     const left = `${offset * this.slideWidth}px`;
  //     this.draw(1, slideIndex, left);
  //     offset++;
  //   });
  //   return this;
  // }

  // draw(direction, slideIndex, left) {
  //   const slide = this.slides[slideIndex];
  //   slide.style.left = left || `${this.sliderWidth}px`;
  //   slide.dataset.slideIndex = slideIndex;
  //
  //   if (direction > 0) {
  //     this.slider.el.appendChild(slide);
  //   } else {
  //     this.slider.el.prepend(slide);
  //   }
  // }

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

  // getSlide(num) {
  //   let slides = this.slider.el.querySelectorAll(':scope > *');
  //   return [...slides].filter((slide) => +slide.dataset.slideIndex === num)[0];
  // }

  // toggleActiveClass(direction) {
  //   if (this.prevSlide !== null) {
  //     const prevSlide = this.getSlide(this.prevSlide);
  //     prevSlide.classList.remove(this.activeClass);
  //   }
  //
  //   const currentSlide = this.getSlide(this.activeSlide);
  //   currentSlide.classList.add(this.activeClass);
  //   return this;
  // }
}
