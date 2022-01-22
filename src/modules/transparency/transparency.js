import ModalTransparency from './modalTransparency';
// import Slider from '../ulils/slider';
import Slider3 from '../ulils/slider3';

const transparency = () => {
  const modalTransparency = new ModalTransparency();

  document.querySelectorAll('#transparency .transparency-item').forEach((slide, index) => {
    slide.dataset.slideIndex = index.toString();
  });

  const slider = new Slider3({
    wrapper: '.transparency-slider-wrap',
    slider: '.transparency-slider',
    sliderClass: 'transparency-slider-active',
    activeClass: 'transparency-slide-active',
    duration: 500,
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
