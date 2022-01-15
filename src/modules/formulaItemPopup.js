const formulaItemPopup = () => {
  const block = document.getElementById('formula');
  const windowOuterWidth = window.outerWidth;
  const wrapper =
    windowOuterWidth > 1024
      ? block.querySelector('.wrapper_small.tablet-hide')
      : block.querySelector('.wrapper_small.desktop-hide');

  const toggle = (formulaItem, action) => {
    const ItemPopup = formulaItem.querySelector('.formula-item-popup');
    const ItemPopupHeightNum = parseFloat(getComputedStyle(ItemPopup).getPropertyValue('height'));
    const formulaItemHeightNum = parseFloat(getComputedStyle(formulaItem).getPropertyValue('height'));
    // const { top: formulaItemTop } = formulaItem.getBoundingClientRect();

    const getItemPopupProps = (popupAction, popupPosition) => {
      let props;
      if (popupAction === 'show') {
        props = { opacity: '1', visibility: 'visible' };
        if (popupPosition === 'bottom') {
          const ItemPopupTop = ItemPopupHeightNum + formulaItemHeightNum + 15;
          props = {
            ...props,
            transform: `translate3d(0, ${ItemPopupTop}px, 0)`,
          };
        }
      } else if (popupAction === 'hide') {
        props = { opacity: '0.1', visibility: 'hidden', transform: 'translate3d(0, -5px, 0)' };
      }
      return props;
    };

    const { top: topItemPopup } = ItemPopup.getBoundingClientRect();
    let position;
    if (topItemPopup > 0) {
      position = 'top';
      ItemPopup.classList.remove('bottom');
    } else {
      position = 'bottom';
      ItemPopup.classList.add('bottom');
    }

    const { opacity, visibility, transform } = getItemPopupProps(action, position);
    ItemPopup.style.opacity = opacity;
    ItemPopup.style.visibility = visibility;
    ItemPopup.style.transform = transform;
  };

  wrapper.addEventListener('mouseover', (e) => {
    const { target } = e;
    const formulaItemIcon = target.closest('.formula-item__icon');
    if (formulaItemIcon) {
      const formulaItem = formulaItemIcon.closest('.formula-item');
      formulaItem.style.zIndex = '2';
      toggle(formulaItem, 'show');
    }
  });
  wrapper.addEventListener('mouseout', (e) => {
    const { target } = e;
    const formulaItemIcon = target.closest('.formula-item__icon');
    if (formulaItemIcon) {
      const formulaItem = formulaItemIcon.closest('.formula-item');
      formulaItem.style.zIndex = '0';
      toggle(formulaItem, 'hide');
    }
  });
};

export default formulaItemPopup;
