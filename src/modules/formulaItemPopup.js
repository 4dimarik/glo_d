const formulaItemPopup = () => {
  const block = document.getElementById('formula');
  const windowOuterWidth = window.outerWidth;
  const wrapper =
    windowOuterWidth > 1024
      ? block.querySelector('.wrapper_small .tablet-hide')
      : block.querySelector('.wrapper_small .desktop-hide');

  console.log(wrapper);
};

export default formulaItemPopup;
