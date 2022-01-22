import Slider3 from './ulils/slider3';

const sectionPortfolio = () => {
  const section = document.getElementById('portfolio');

  const slider = new Slider3({
    wrapper: '#portfolio .portfolio-slider-wrap',
    duration: 500,
    slidesPerView: 3,
    slider: '.portfolio-slider',
    slideMinWidth: 352,
    loop: false,
    navigation: {
      prev: '#portfolio-arrow_left',
      next: '#portfolio-arrow_right',
    },
  });
  slider.init();
  console.log('portfolio', slider);
};

export default sectionPortfolio;
