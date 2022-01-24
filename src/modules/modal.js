export default class Modal {
  constructor({ modalSelector, sectionId, ...selectors }) {
    this.modalSelector = modalSelector;
    this.modal = document.querySelector(modalSelector);
    if (sectionId) {
      this.section = document.getElementById(sectionId);
    }
    if (this.modal) {
      this.init(selectors);
    }
  }

  init({ bodySelector, closeBtnSelector, modalLinkSelector }) {
    this.body = this.modal.querySelector(bodySelector);

    this.modal.addEventListener('click', (e) => {
      const { target } = e;
      if (target.closest(closeBtnSelector)) {
        this.toggle(false);
        this.afterClose();
      }
    });

    document.addEventListener('click', (e) => {
      const { target } = e;
      if (target.closest(modalLinkSelector)) {
        this.toggle(true, target.closest(modalLinkSelector));
      }
      if (target.matches(this.modalSelector)) {
        this.toggle(false);
        this.afterClose();
      }
    });
  }

  afterOpen() {
    //
  }

  afterClose() {
    //
  }

  toggle(show, target = null) {
    this.modal.style.visibility = show ? 'visible' : 'hidden';
    if (show) {
      this.afterOpen(target);
    }
  }
}
