import header from './modules/header/header';
import { smoothScroll, sendForm } from './modules/helpers';
import ModalPrivacy from './modules/modalPrivacy';
import ModalRepairTypes from './modules/modalRepairTypes';
import ModalConsultation from './modules/modalConsultation';
import phoneMask from './modules/phoneMask';
import sectionFormula from './modules/sectionFormula';
import transparency from './modules/transparency/transparency';
import repairTypes from './modules/repairTypes';
import Slider3 from './modules/ulils/slider3';
import sectionPortfolio from './modules/sectionPortfolio';
import sectionFAQ from './modules/sectionFAQ';

const modalRepairTypes = new ModalRepairTypes();
const modalPrivacy = new ModalPrivacy();
const modalConsultation = new ModalConsultation();

header();
phoneMask();
sectionFormula();
transparency();
sendForm();
repairTypes();
sectionPortfolio();
sectionFAQ();

const buttonFooter = document.querySelector('.footer .button-footer');
buttonFooter.addEventListener('click', (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.closest('.button-footer')) {
    smoothScroll(target);
  }
});

const reviewsSlider = new Slider3({
  wrapper: '.reviews-slider-wrap',
  slider: '.reviews-slider',
  activeClass: 'x-active',
  slidesPerView: 1,
  duration: 500,
  loop: true,
  navigation: {
    next: '#reviews-arrow_right',
    prev: '#reviews-arrow_left',
  },
  dots: {
    blockSelector: '#reviews .slider-dots-reviews',
    class: 'dot-reviews',
    activeClass: 'dot_active',
  },
});

reviewsSlider.init();
