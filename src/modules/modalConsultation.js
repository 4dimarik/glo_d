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

  afterOpen() {
    // this.modal.addEventListener('click', ({ target }) => {
    //   const privacyCheckbox = target.closest('input[name=privacy]');
    //   if (privacyCheckbox) {
    //     const submitBtn = this.modal.querySelector('.button-consultation');
    //     const phone = this.modal.querySelector('input[name=phone]').value;
    //
    //     const isValidPhone = /\+7 \(\d\d\d\) \d\d\d-\d\d-\d\d/g.test(phone);
    //     const privacyCheckboxChecked = privacyCheckbox.checked;
    //     privacyCheckbox.setCustomValidity('Jib,rf');
    //   }
    // });
  }
}
