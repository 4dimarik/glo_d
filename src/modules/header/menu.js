import { smoothScroll } from '../helpers';

const menu = (header) => {
  const menuBtnSelector = '.menu__icon';

  const menuBlock = document.querySelector('.popup-menu');
  const dialogMenu = menuBlock.querySelector('.popup-dialog-menu');
  const closeBtnSelector = '.close-menu';
  const navItemSelector = '.popup-menu-nav__item';
  const menuLinkSelector = '.menu-link';

  const handler = (action = 'close') => {
    let show;
    if (action === 'toggle') {
      show = menuBlock.classList.toggle('active');
    } else if (action === 'close') {
      menuBlock.classList.remove('active');
      show = false;
    }

    const windowInnerWidth = window.innerWidth;
    const { width: dialogMenuWidth } = getComputedStyle(dialogMenu);
    if (windowInnerWidth >= 576) {
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
    if (target.matches(menuLinkSelector)) {
      handler('close');
      if (target.closest(navItemSelector)) {
        smoothScroll(target);
      }
    }
  });
};

export default menu;
