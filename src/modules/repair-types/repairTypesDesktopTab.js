import Tabs from '../ulils/tabs';
import Slider3 from '../ulils/slider3';

export default class RepairTypesDesktopTab extends Tabs {
  constructor() {
    super({
      tabPanelSelector: '.row_reverse',
      tabPanelItemSelectors: {
        navSelector: '.nav-list-repair',
        navItemSelector: '.repair-types-nav__item',
        tabItemSelector: '.repair-types-slider > div',
      },
    });

    this.sliderProps = {
      wrapper: '.repair-types-slider-wrap',
      slider: '.types-repair1',
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
    this.slider = new Slider3(this.sliderProps);

    this.slider.init();
  }

  changeSlider() {
    this.slider.destroy();
    this.slider = new Slider3(this.sliderProps);
    this.slider.init();
  }

  afterChoose(activeTabIndex) {
    this.sliderProps.slider = `.types-repair${+activeTabIndex + 1}`;
    this.changeSlider();
  }
}
