const contacts = (block) => {
  const firstNumberBlock = block.querySelector('.header-contacts__phone-number-wrap');
  const secondNumberBlock = block.querySelector('.header-contacts__phone-number-accord');
  const arrowSelector = '.header-contacts__arrow';

  const hiddenPhoneNumber = secondNumberBlock.querySelector('.header-contacts__phone-number');

  const handlerSecondNumber = (show, top) => {
    return show
      ? { top, opacity: 1, transform: 'rotate(180deg)' }
      : { top: 0, opacity: 0, transform: 'none' };
  };

  block.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(arrowSelector)) {
      const { height: firstNumberBlockHeight } = getComputedStyle(firstNumberBlock);
      const active = secondNumberBlock.classList.toggle('active');
      /* eslint no-console: "off" */
      console.log(active);
      const { top, opacity, transform } = handlerSecondNumber(active, firstNumberBlockHeight);
      target.style.transform = transform;
      secondNumberBlock.style.top = top;
      hiddenPhoneNumber.style.opacity = opacity;
    }
  });
};

export default contacts;
