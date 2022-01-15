const menu = (block) => {
  const menuBtnSelector = '.menu__icon';

  const menuBlock = document.querySelector('.popup-menu');
  const dialogMenu = menuBlock.querySelector('.popup-dialog-menu');
  const closeBtnSelector = '.close-menu';

  const handlerMenu = (show) => {
    const windowOuterWidth = window.outerWidth;
    const { width: dialogMenuWidth } = getComputedStyle(dialogMenu);
    console.log(windowOuterWidth, dialogMenuWidth);
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
      const active = menuBlock.classList.toggle('active');
      handlerMenu(active);
    }
  });
  // close menu
  menuBlock.addEventListener('click', (e) => {
    const { target } = e;
    if (target.matches(closeBtnSelector)) {
      menuBlock.classList.toggle('active');
      handlerMenu(false);
    }
  });
};

module.exports = menu;
