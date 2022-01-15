import Modal from './modal';

export default class ModalPrivacy extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-privacy',
      modalLinkSelector: '.link-privacy',
      bodySelector: '.popup-dialog-privacy',
      closeBtnSelector: '.close',
    });
  }
}
