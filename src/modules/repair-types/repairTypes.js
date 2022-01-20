import Slider from '../ulils/slider';
import Tabs from '../ulils/tabs';

const repairTypes = () => {
  const section = document.getElementById('repair-types');

  const tabs = new Tabs({
    tabPanelSelector: '#repair-types',
    tabPanelItemSelectors: {
      navSelector: '.nav-list-repair',
      navItemSelector: '.repair-types-nav__item',
      tabItemSelector: '.repair-types-slider > div',
    },
  });

  const slider = new Slider({
    wrapper: '.nav-wrap-repair',
    slider: '.nav-list-repair',
    sliderClass: 'nav-list-repair-active',
    activeClass: 'active',
    slidesPerView: 3,
    navigation: {
      next: '#nav-arrow-repair-right_base',
      prev: '#nav-arrow-repair-left_base',
    },
  });
};

export default repairTypes;
