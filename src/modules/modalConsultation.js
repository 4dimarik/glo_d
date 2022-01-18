import Modal from './modal';

export default class ModalConsultation extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-consultation',
      modalLinkSelector: '.button_wide',
      bodySelector: '.feedback-wrap',
      closeBtnSelector: '.close',
    });
  }

  afterOpen() {}
}
