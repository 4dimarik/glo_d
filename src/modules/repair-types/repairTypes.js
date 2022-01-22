import Swiper from 'swiper';
import Slider from '../ulils/slider';
import Tabs from '../ulils/tabs';
import RepairTypesSlider from './repairTypesSlider';

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

  const swiper = new Swiper('.repair-types-nav', {
    // Optional parameters
    slidesPerView: 3,
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '#nav-arrow-repair-right_base',
      prevEl: '#nav-arrow-repair-left_base',
    },
  });

  // const slider = new Slider({
  //   wrapper: '.nav-wrap-repair',
  //   slider: '.nav-list-repair',
  //   sliderClass: 'nav-list-repair-active',
  //   activeClass: 'active',
  //   slidesPerView: 3,
  //   navigation: {
  //     next: '#nav-arrow-repair-right_base',
  //     prev: '#nav-arrow-repair-left_base',
  //   },
  // });
  // console.log(slider);
  // if (window.innerWidth < 1024) slider.init('formula');

  // const slider2 = new RepairTypesSlider();
  // console.log(slider2);
  // slider2.init();
};

export default repairTypes;
