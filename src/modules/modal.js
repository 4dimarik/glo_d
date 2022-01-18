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

  init({ bodySelector, closeBtnSelector, modalLinkSelector, sectionId = null }) {
    this.body = this.modal.querySelector(bodySelector);

    this.modal.addEventListener('click', (e) => {
      e.preventDefault();
      const { target } = e;
      if (target.closest(closeBtnSelector)) {
        this.toggle(false);
      }
    });

    document.addEventListener('click', (e) => {
      e.preventDefault();
      const { target } = e;
      if (target.closest(modalLinkSelector)) {
        this.toggle(true);
        this.afterOpen(target.closest(modalLinkSelector));
      }
      if (target.matches(this.modalSelector)) {
        this.toggle(false);
      }
    });
  }

  afterOpen() {}

  toggle(show) {
    this.modal.style.visibility = show ? 'visible' : 'hidden';
  }
}
