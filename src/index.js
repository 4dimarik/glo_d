import header from './modules/header/header';
import { smoothScroll, sendForm } from './modules/helpers';
import ModalPrivacy from './modules/modalPrivacy';
import ModalRepairTypes from './modules/modalRepairTypes';
import ModalConsultation from './modules/modalConsultation';
import phoneMask from './modules/phoneMask';
// import formulaItemPopup from './modules/formulaItemPopup';
import sectionFormula from './modules/sectionFormula';
import transparency from './modules/transparency/transparency';

const modalRepairTypes = new ModalRepairTypes();
const modalPrivacy = new ModalPrivacy();
const modalConsultation = new ModalConsultation();

header();
phoneMask();
// formulaItemPopup();
sectionFormula();
transparency();
sendForm();

const buttonFooter = document.querySelector('.footer .button-footer');
buttonFooter.addEventListener('click', (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.closest('.button-footer')) {
    smoothScroll(target);
  }
});
