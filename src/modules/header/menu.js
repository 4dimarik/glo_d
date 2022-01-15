import { smoothScroll } from '../helpers';
import ModalRepairTypes from '../modalRepairTypes';

const menu = (header) => {
  const menuBtnSelector = '.menu__icon';

  const menuBlock = document.querySelector('.popup-menu');
  const dialogMenu = menuBlock.querySelector('.popup-dialog-menu');
  const closeBtnSelector = '.close-menu';
  const menuLinkSelector = '.popup-menu-nav__item';

  const modalRepairTypesLinkSelector = '.repair-types-list';

  const handler = (action = 'close') => {
    let show;
    if (action === 'toggle') {
      show = menuBlock.classList.toggle('active');
    } else if (action === 'close') {
      menuBlock.classList.remove('active');
      show = false;
    }

    const windowOuterWidth = window.outerWidth;
    const { width: dialogMenuWidth } = getComputedStyle(dialogMenu);
    if (windowOuterWidth >= 576) {
      dialogMenu.style.right = show ? dialogMenuWidth : 0;
    } else {
      dialogMenu.style.top = show ? '100vh' : 0;
    }
  };
  // toggle menu
  header.addEventListener('click', (e) => {
    const { target } = e;
    if (target.matches(menuBtnSelector)) {
      handler('toggle');
    }
  });

  menuBlock.addEventListener('click', (e) => {
    e.preventDefault();
    const { target } = e;
    // close menu
    if (target.matches(closeBtnSelector)) {
      handler('close');
    }
    // menu-link
    if (target.closest(menuLinkSelector)) {
      handler('close');
      smoothScroll(target);
    }
    // modalRepairTypes
    if (target.matches(modalRepairTypesLinkSelector)) {
      handler('close');
      const modalRepairTypes = new ModalRepairTypes();
      modalRepairTypes.toggle(true);
    }
  });
};

export default menu;
