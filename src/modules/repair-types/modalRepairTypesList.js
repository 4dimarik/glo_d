import Modal from '../modal';
import RepairTypeTab from './repairTypeTab';

import sendData from '../ulils/sendData';

export default class ModalRepairTypesList extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-repair-types',
      modalLinkSelector: '.repair-types-list',
      bodySelector: '.dialog-repair-types',
      closeBtnSelector: '.close',
    });

    // const tabs = new RepairTypeTab();
  }

  afterOpen() {}
}
