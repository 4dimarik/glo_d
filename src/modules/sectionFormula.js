import Slider2 from './ulils/slider2';

const sectionFormula = () => {
  const section = document.getElementById('formula');
  const toggleWrapper = () => {
    return window.innerWidth > 1024
      ? { type: 'desktop', el: section.querySelector('.wrapper_small.tablet-hide') }
      : { type: 'mobile', el: section.querySelector('.wrapper_small.desktop-hide') };
  };
  let wrapper = toggleWrapper();

  const slider = new Slider2({
    wrapper: '#formula .formula-slider-wrap',
    slider: '.formula-slider',
    navigation: {
      prev: '#formula-arrow_left',
      next: '#formula-arrow_right',
    },
  });

  if (wrapper.type === 'mobile') slider.init();

  console.log(slider);

  window.addEventListener('resize', () => {
    wrapper = toggleWrapper();
    console.log(wrapper);
  });
};

export default sectionFormula;
