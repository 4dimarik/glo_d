import Modal from '../modal';
import RepairTypeService from '../ulils/repairTypeService';

export default class ModalEdit extends Modal {
  constructor() {
    super({
      modalSelector: '#modal',
      modalLinkSelector: '.btn-modal',
      bodySelector: '.modal',
      closeBtnSelector: '.button__close',
    });

    this.header = this.modal.querySelector('.modal__header');
    this.saveBtn = this.modal.querySelector('.button-ui_firm');
    this.form = this.modal.querySelector('form');
    this.modal.addEventListener('click', this.clickEventListener.bind(this));

    this.repairTypeService = new RepairTypeService();
  }

  clickEventListener(e) {
    if (e.target.closest('.cancel-button')) {
      e.preventDefault();
      this.toggle(false);
    }
  }

  async afterOpen(target) {
    if (target) {
      const { action, id } = target.dataset;
      if (action === 'add') {
        this.header.textContent = 'Добавление новой услуги';
        this.form.dataset.action = 'add';
        this.form.dataset.id = id;
      } else if (action === 'change') {
        this.header.textContent = 'Редактировать услугу';
        this.form.dataset.action = 'change';
        this.form.dataset.id = id;

        const { ok, data } = await this.repairTypeService.getRepairType(id);
        if (ok) {
          Object.keys(data).forEach((name) => {
            const field = this.form.querySelector(`*[name=${name}]`);
            if (field) {
              field.value = data[name];
            }
          });
        }
      }
    }
  }
}
