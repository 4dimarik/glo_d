import Modal from './modal';

export default class ModalRepairTypes extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-repair-types',
      bodySelector: '.dialog-repair-types',
      closeBtnSelector: '.close',
    });
  }
}
