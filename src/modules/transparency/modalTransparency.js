import Modal from '../modal';
import Slider from '../ulils/slider';

export default class ModalTransparency extends Modal {
  constructor() {
    super({
      sectionId: 'transparency',
      modalSelector: '.popup-transparency',
      modalLinkSelector: '.transparency-item__img',
      bodySelector: '.popup-dialog-transparency',
      closeBtnSelector: '.close',
    });

    this.slider = new Slider({
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
    const items = this.section.querySelectorAll('.transparency-item__img');
    this.activatedItemIndex = [...items].findIndex((item) => item === target);
    this.slider.setState({ current: this.activatedItemIndex + 1 }).changeSlide();
  }

  afterClose() {
    this.slider.destroy();
  }
}
