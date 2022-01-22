import Modal from './modal';
import Slider3 from './ulils/slider3';

export default class ModalPortfolio extends Modal {
  constructor() {
    super({
      modalSelector: '.popup-portfolio',
      modalLinkSelector: '.portfolio-slider__slide-frame',
      bodySelector: '.popup-dialog-portfolio',
      closeBtnSelector: '.close',
    });

    this.slider = new Slider3({
      wrapper: '.popup-portfolio-slider-wrap',
      slider: '.popup-portfolio-slider',
      navigation: {
        prev: '#popup_portfolio_left',
        next: '#popup_portfolio_right',
      },
      counters: {
        current: '.slider-counter-content__current',
        total: '.slider-counter-content__total',
      },
    });

    this.portfolioTextArray = document.querySelectorAll('.popup-dialog-portfolio .popup-portfolio-text');
    this.slider.wrapper.el.addEventListener('click', ({ target }) => {
      this.prevPortfolioText = document.querySelector('.popup-dialog-portfolio .popup-portfolio-text.d-block');
      if (
        target.closest(this.slider.navigation.next.selector) ||
        target.closest(this.slider.navigation.prev.selector)
      ) {
        const { currentIndex } = this.slider.props;
        this.changePortfolioText(currentIndex);
      }
    });
  }

  changePortfolioText(currentIndex) {
    if (this.prevPortfolioText) {
      this.prevPortfolioText.classList.remove('d-block');
    }
    this.portfolioTextArray[currentIndex].classList.add('d-block');
  }

  afterOpen(target) {
    this.slider.init();
    const slide = target.closest('.portfolio-slider__slide');
    const { slideIndex } = slide.dataset;
    const slideFrame = target.closest('.portfolio-slider__slide-frame');
    const frameIndex = [...slide.querySelectorAll('.portfolio-slider__slide-frame')].indexOf(slideFrame);

    const currentSlideIndex = +slideIndex * 2 + +frameIndex;

    this.slider.changeSlide(0, currentSlideIndex);
    this.changePortfolioText(currentSlideIndex);
  }

  afterClose() {
    this.slider.destroy();
  }
}
