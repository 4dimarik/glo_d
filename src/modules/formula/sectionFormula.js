import FormulaSlider from './formulaSlider';

const sectionFormula = () => {
  const section = document.getElementById('formula');

  const wrapperDesktop = section.querySelector('.wrapper_small.tablet-hide');
  const wrapperMobile = section.querySelector('.wrapper_small.desktop-hide');

  const slider = new FormulaSlider();
  console.log(slider);

  if (window.innerWidth < 1024) slider.init('formula');

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      slider.init('formula');
    } else if (slider.activated) {
      slider.destroy();
    }
  });

  // Desktop
  const toggle = (formulaItem, action) => {
    const ItemPopup = formulaItem.querySelector('.formula-item-popup');
    const ItemPopupHeightNum = parseFloat(getComputedStyle(ItemPopup).getPropertyValue('height'));
    const formulaItemHeightNum = parseFloat(getComputedStyle(formulaItem).getPropertyValue('height'));

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

  wrapperDesktop.addEventListener('mouseover', (e) => {
    const { target } = e;
    const formulaItemIcon = target.closest('.formula-item__icon');
    if (formulaItemIcon) {
      formulaItemIcon.classList.add('active');
      const formulaItem = formulaItemIcon.closest('.formula-item');
      formulaItem.style.zIndex = '2';
      toggle(formulaItem, 'show');
    }
  });
  wrapperDesktop.addEventListener('mouseout', (e) => {
    const { target } = e;
    const formulaItemIcon = target.closest('.formula-item__icon');
    if (formulaItemIcon) {
      formulaItemIcon.classList.remove('active');
      const formulaItem = formulaItemIcon.closest('.formula-item');
      formulaItem.style.zIndex = '0';
      toggle(formulaItem, 'hide');
    }
  });
};

export default sectionFormula;
