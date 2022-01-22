import Modal from '../modal';
import Slider3 from '../ulils/slider3';

export default class ModalTransparency extends Modal {
  constructor() {
    super({
      sectionId: 'transparency',
      modalSelector: '.popup-transparency',
      modalLinkSelector: '.transparency-item__img',
      bodySelector: '.popup-dialog-transparency',
      closeBtnSelector: '.close',
    });

    this.slider = new Slider3({
      wrapper: '.popup-transparency-slider-wrap',
      slider: '.popup-transparency-slider',
      navigation: {
        prev: '.popup-arrow_transparency_left',
        next: '.popup-arrow_transparency_right',
      },
      counters: {
        current: '.slider-counter-content__current',
        total: '.slider-counter-content__total',
      },
    });
  }

  afterOpen(target) {
    this.slider.init();
    const { slideIndex } = target.closest('.transparency-item').dataset;
    this.slider.changeSlide(0, +slideIndex);
  }

  afterClose() {
    this.slider.destroy();
  }
}
