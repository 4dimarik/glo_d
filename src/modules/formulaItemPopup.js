const formulaItemPopup = () => {
  const block = document.getElementById('formula');
  const windowInnerWidth = window.innerWidth;
  const wrapper =
    windowInnerWidth > 1024
      ? block.querySelector('.wrapper_small.tablet-hide')
      : block.querySelector('.wrapper_small.desktop-hide');

  const toggle = (formulaItem) => {
    const ItemPopup = formulaItem.querySelector('.formula-item-popup');

    const getTransform = () => {
      const ItemPopupHeightNum = parseFloat(getComputedStyle(ItemPopup).getPropertyValue('height'));
      const formulaItemHeightNum = parseFloat(getComputedStyle(formulaItem).getPropertyValue('height'));

      const ItemPopupTop = ItemPopupHeightNum + formulaItemHeightNum + 15;
      return `translate3d(0, ${ItemPopupTop}px, 0)`;
    };

    const { top: topItemPopup } = ItemPopup.getBoundingClientRect();
    if (topItemPopup > 0) {
      ItemPopup.classList.remove('bottom');
      ItemPopup.style.transform = 'translate3d(0, -5px, 0)';
    } else {
      ItemPopup.classList.add('bottom');
      ItemPopup.style.transform = getTransform();
    }
  };
  wrapper.addEventListener('mouseover', (e) => {
    const { target } = e;
    const formulaItemIcon = target.closest('.formula-item__icon');
    if (formulaItemIcon) {
      const formulaItem = formulaItemIcon.closest('.formula-item');
      formulaItem.classList.add('active');
      toggle(formulaItem);
    }
  });
  wrapper.addEventListener('mouseout', (e) => {
    const { target } = e;
    const formulaItemIcon = target.closest('.formula-item__icon');
    if (formulaItemIcon) {
      const formulaItem = formulaItemIcon.closest('.formula-item');
      formulaItem.classList.remove('active');
      toggle(formulaItem);
    }
  });
};

export default formulaItemPopup;
