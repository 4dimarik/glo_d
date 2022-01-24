import Tabs from '../ulils/tabs';
import Slider3 from '../ulils/slider3';
import RepairTypesDesktopTab from './repairTypesDesktopTab';

const repairTypes = () => {
  const section = document.getElementById('repair-types');
  const repairTypesDesktopTab = new RepairTypesDesktopTab();

  const tabSlider = new Slider3({
    wrapper: '.nav-wrap-repair',
    slider: '.nav-list-repair',
    duration: 500,
    slidesPerView: 3,
    loop: false,
    setMinWidth: false,
    navigation: {
      next: '#nav-arrow-repair-right_base',
      prev: '#nav-arrow-repair-left_base',
    },
  });
  if (window.innerWidth < 1024) {
    tabSlider.init('repair-types');
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      tabSlider.init('repair-types');
    } else if (tabSlider.activated) {
      tabSlider.destroy();
    }
  });
};

export default repairTypes;
