import Modal from './modal';

export default class ModalRepairTypes extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-repair-types',
      modalLinkSelector: '.repair-types-list',
      bodySelector: '.dialog-repair-types',
      closeBtnSelector: '.close',
    });
  }
}
