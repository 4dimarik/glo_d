import Modal from './modal';
import ModalPopupThank from './modalPopupThank';

export default class ModalConsultation extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-consultation',
      modalLinkSelector: '.button_wide',
      bodySelector: '.feedback-wrap',
      closeBtnSelector: '.close',
    });
  }

  afterOpen() {
    this.modal.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalPopupThank = new ModalPopupThank();
      const form = e.target.closest('form');
      if (form.checkValidity()) {
        this.toggle(false);
        modalPopupThank.toggle(true);
      }
    });
  }
}
