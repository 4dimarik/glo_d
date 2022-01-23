import Tabs from '../ulils/tabs';
import Slider3 from '../ulils/slider3';

const repairTypes = () => {
  const section = document.getElementById('repair-types');

  const sliderProps = {
    wrapper: '.repair-types-slider-wrap',
    slider: '.types-repair1',
    activeClass: 'active',
    slidesPerView: 1,
    navigation: {
      next: '#repair-types-arrow_right',
      prev: '#repair-types-arrow_left',
    },
    counters: {
      current: '.slider-counter-content__current',
      total: '.slider-counter-content__total',
    },
  };

  let slider = new Slider3(sliderProps);

  slider.init();

  const tabs = new Tabs({
    tabPanelSelector: '#repair-types',
    tabPanelItemSelectors: {
      navSelector: '.nav-list-repair',
      navItemSelector: '.repair-types-nav__item',
      tabItemSelector: '.repair-types-slider > div',
    },
  });

  tabs.afterChoose = (activeTabIndex) => {
    slider.destroy();
    sliderProps.slider = `.types-repair${+activeTabIndex + 1}`;
    slider = new Slider3(sliderProps);
    slider.init();
  };

  const tabSlider = new Slider3({
    wrapper: '.nav-wrap-repair',
    slider: '.nav-list-repair',
    duration: 500,
    activeClass: 'active',
    slidesPerView: 3,
    navigation: {
      next: '#nav-arrow-repair-right_base',
      prev: '#nav-arrow-repair-left_base',
    },
  });
  if (window.innerWidth < 1024) tabSlider.init('repair-types');

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      tabSlider.init('repair-types');
    } else if (slider.activated) {
      tabSlider.destroy();
    }
  });
};

export default repairTypes;
