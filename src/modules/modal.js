export default class Modal {
  constructor({ modalSelector, ...selectors }) {
    this.modal = document.querySelector('.popup-repair-types');
    if (this.modal) {
      this.init(selectors);
    }
  }

  init({ bodySelector, closeBtnSelector }) {
    this.body = this.modal.querySelector(bodySelector);
    this.closeBtn = this.modal.querySelector(closeBtnSelector);

    this.modal.addEventListener('click', (e) => {
      e.preventDefault();
      const { target } = e;
      if (target === this.closeBtn) {
        this.toggle(false);
      }
    });
  }

  toggle(show) {
    this.modal.style.visibility = show ? 'visible' : 'hidden';
  }
}
