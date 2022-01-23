import header from './modules/header/header';
import smoothScroll from './modules/ulils/smoothScroll';
import ModalPrivacy from './modules/modalPrivacy';
import ModalRepairTypesList from './modules/repair-types/modalRepairTypesList';
import ModalConsultation from './modules/modalConsultation';
import phoneMask from './modules/phoneMask';
import sectionFormula from './modules/sectionFormula';
import transparency from './modules/transparency/transparency';
import repairTypes from './modules/repair-types/repairTypes';
import Slider3 from './modules/ulils/slider3';
import sectionPortfolio from './modules/sectionPortfolio';
import sectionFAQ from './modules/sectionFAQ';
import validation from './modules/validation';
import ModalPopupThank from './modules/modalPopupThank';
import RepairTypeService from './modules/ulils/repairTypeService';

window.repairTypeService = new RepairTypeService();

const modalRepairTypes = new ModalRepairTypesList();
const modalPrivacy = new ModalPrivacy();
const modalConsultation = new ModalConsultation();

header();
phoneMask();
sectionFormula();
transparency();
repairTypes();
sectionPortfolio();
sectionFAQ();
validation();

const buttonFooter = document.querySelector('.footer .button-footer');
buttonFooter.addEventListener('click', (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.closest('.button-footer')) {
    smoothScroll(target);
  }
});

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!e.target.closest('.popup')) {
    const modalPopupThank = new ModalPopupThank();
    const form = e.target.closest('form');
    if (form.checkValidity()) {
      modalPopupThank.toggle(true);
    }
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
