import Modal from '../modal';

export default class ModalEdit extends Modal {
  constructor() {
    super({
      modalSelector: '#modal',
      modalLinkSelector: '.btn-addItem',
      bodySelector: '.modal',
      closeBtnSelector: '.button__close',
    });

    this.modal.addEventListener('click', this.eventListener.bind(this));
  }

  eventListener(e) {
    e.preventDefault();
    const btn = e.target.closest('button');
    if (btn) {
      const { action } = btn.dataset;
      if (action === 'close') {
        this.toggle(false);
      } else if (action === 'save') {
        console.log('save');
      }
    }
  }

  afterOpen(target) {
    console.log(target);
    if (target) {
      const { action } = target.dataset;
      if (action === 'add') {
        this.actionAdd();
      } else if (action === 'change') {
        this.actionChange();
      }
    }
  }

  actionAdd() {
    console.log('add');
  }

  actionChange() {
    console.log('change');
  }
}
