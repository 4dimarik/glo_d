import ModalTransparency from './modalTransparency';
import Slider from '../ulils/slider';

const transparency = () => {
  const modalTransparency = new ModalTransparency();

  const slider = new Slider({
    wrapper: '.transparency-slider-wrap',
    slider: '.transparency-slider',
    sliderClass: 'transparency-slider-active',
    activeClass: 'transparency-slide-active',
    slidesPerView: 1,
    navigation: {
      next: '#transparency-arrow_right',
      prev: '#transparency-arrow_left',
    },
  });

  const toggleSlider = () => {
    if (window.innerWidth < 1090) {
      slider.init();
    } else if (slider.activated) {
      slider.destroy();
    }
  };

  toggleSlider();

  window.addEventListener('resize', () => {
    toggleSlider();
  });
};

export default transparency;
