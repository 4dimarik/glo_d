import Modal from '../modal';
import RepairTypeTab from './repairTypeTab';

import sendData from '../ulils/sendData';
import Slider3 from '../ulils/slider3';

export default class ModalRepairTypesList extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-repair-types',
      modalLinkSelector: '.repair-types-list',
      bodySelector: '.dialog-repair-types',
      closeBtnSelector: '.close',
    });

    const tabs = new RepairTypeTab();
    this.slider = new Slider3({
      wrapper: '.popup-repair-types-tab .nav-wrap-repair',
      slider: '.nav-list-popup-repair',
      duration: 500,
      slidesPerView: 3,
      loop: false,
      setMinWidth: false,
      navigation: {
        next: '#nav-arrow-popup-repair_right',
        prev: '#nav-arrow-popup-repair_left',
      },
    });

    if (window.innerWidth < 1024) {
      this.slider.init('repair-types');
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        this.slider.init('repair-types');
      } else if (this.slider.activated) {
        this.slider.destroy();
      }
    });
  }
}
