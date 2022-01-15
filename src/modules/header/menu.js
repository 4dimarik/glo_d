import { smoothScroll } from '../helpers';

const menu = (block) => {
  const menuBtnSelector = '.menu__icon';

  const menuBlock = document.querySelector('.popup-menu');
  const dialogMenu = menuBlock.querySelector('.popup-dialog-menu');
  const closeBtnSelector = '.close-menu';
  const menuLinkSelector = '.menu-link';

  const handlerMenu = (action = 'close') => {
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
  block.addEventListener('click', (e) => {
    const { target } = e;
    if (target.matches(menuBtnSelector)) {
      handlerMenu('toggle');
    }
  });

  menuBlock.addEventListener('click', (e) => {
    e.preventDefault();
    const { target } = e;
    // close menu
    if (target.matches(closeBtnSelector)) {
      handlerMenu('close');
    }
    // menu-link
    if (target.matches(menuLinkSelector)) {
      handlerMenu('close');
      smoothScroll(target);
    }
  });
};

export default menu;
