export default class ModalRepairTypes {
  constructor() {
    this.modal = document.querySelector('.popup-repair-types');
    if (this.modal) {
      this.init();
    }
  }

  init() {
    this.dialog = this.modal.querySelector('.dialog-repair-types');
  }

  toggle(show) {
    this.modal.style.visibility = show ? 'visible' : 'hidden';
  }
}
