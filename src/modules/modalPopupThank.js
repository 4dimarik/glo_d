import Modal from './modal';

export default class ModalPopupThank extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-thank',
      bodySelector: '.feedback-wrap',
      closeBtnSelector: '.close',
    });
  }

  afterOpen() {
    setTimeout(() => {
      this.toggle(false);
    }, 2000);
  }
}
