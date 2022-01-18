import Modal from '../modal';
import slider from './slider';

export default class ModalTransparency extends Modal {
  constructor() {
    super({
      sectionId: 'transparency',
      modalSelector: '.popup-transparency',
      modalLinkSelector: '.transparency-item',
      bodySelector: '.popup-dialog-transparency',
      closeBtnSelector: '.close',
    });
    this.initSlider();
  }

  afterOpen(target) {
    const items = this.section.querySelectorAll('.transparency-item');
    this.activatedItemIndex = [...items].findIndex((item) => item === target);

    // const sliderElement = document.querySelector('.popup-transparency-slider');
    // const allSlide = document.querySelectorAll('.popup-transparency-slider__slide');
    //
    // sliderElement.dataset.prevSlide = sliderElement.dataset.currentSlide;
    // sliderElement.dataset.currentSlide = `${this.activatedItemIndex + 1}`;
    //
    // allSlide[+sliderElement.dataset.prevSlide - 1].classList.remove('active-slide');
    // allSlide[+sliderElement.dataset.currentSlide - 1].classList.add('active-slide');

    this.slider.setSliderProps({ current: this.activatedItemIndex + 1 });

    this.slider.changeSlide();
  }

  initSlider() {
    this.slider = slider({
      body: this.body,
      counter: true,
      activeSlideClass: 'active-slide',
      wrapper: '.popup-transparency-slider-wrap',
      slider: '.popup-transparency-slider',
      slide: '.popup-transparency-slider__slide',
      prevBtn: '.popup-arrow_transparency_left',
      nextBtn: '.popup-arrow_transparency_right',
      counterCurrent: '.slider-counter-content__current',
      counterTotal: '.slider-counter-content__total',
    });
  }
}
