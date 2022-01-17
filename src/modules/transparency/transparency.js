import ModalTransparency from './modalTransparency';
import slider from './slider';

const transparency = () => {
  const sectionId = 'transparency';

  const modalTransparency = new ModalTransparency();

  const section = document.getElementById(sectionId);

  const initSlider = () => {
    slider({
      body: section,
      counter: false,
      wrapper: '.transparency-slider-wrap',
      slider: '.transparency-slider',
      slide: '.transparency-item',
      prevBtn: '#transparency-arrow_left',
      nextBtn: '#transparency-arrow_right',
      activeSlideClass: 'transparency-item__active',
    });
  };
  if (window.innerWidth < 1090) {
    initSlider();
  }
};

export default transparency;
