import Modal from '../modal';
import TransparencySlider from './transparencySlider';

export default class ModalTransparency extends Modal {
  constructor() {
    super({
      sectionId: 'transparency',
      modalSelector: '.popup-transparency',
      modalLinkSelector: '.transparency-item__img',
      bodySelector: '.popup-dialog-transparency',
      closeBtnSelector: '.close',
    });

    this.slider = new TransparencySlider();
    console.log(this.slider);
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
