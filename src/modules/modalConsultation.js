import Modal from './modal';
import ModalPopupThank from './modalPopupThank';
import sendData from './ulils/sendData';

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
        let formData = new FormData(form);
        const data = {};
        formData.forEach((val, key) => {
          data[key] = val;
        });

        sendData({ url: 'https://jsonplaceholder.typicode.com/posts', method: 'POST', data }).then((res) => {
          if (res.ok) {
            console.log('Форма отправлена.');
          }
        });
        this.toggle(false);
        modalPopupThank.toggle(true);
      }
    });
  }
}
