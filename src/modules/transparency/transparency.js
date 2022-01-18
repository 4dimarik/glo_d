import ModalTransparency from './modalTransparency';
import Slider from '../ulils/slider';

const transparency = () => {
  const modalTransparency = new ModalTransparency();

  const slider = new Slider({
    wrapper: '.transparency-slider-wrap',
    slider: '.transparency-slider',
    navigation: {
      next: '#transparency-arrow_right',
      prev: '#transparency-arrow_left',
    },
  });

  const toggleSlider = () => {
    if (window.innerWidth < 1090) {
      slider.init();
    } else {
      slider.destroy();
    }
  };

  toggleSlider();

  window.addEventListener('resize', () => {
    toggleSlider();
  });
};

export default transparency;
