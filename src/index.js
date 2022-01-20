import header from './modules/header/header';
import { smoothScroll, sendForm } from './modules/helpers';
import ModalPrivacy from './modules/modalPrivacy';
import ModalRepairTypes from './modules/modalRepairTypes';
import ModalConsultation from './modules/modalConsultation';
import phoneMask from './modules/phoneMask';
import sectionFormula from './modules/formula/sectionFormula';
import transparency from './modules/transparency/transparency';
import repairTypes from './modules/repair-types/repairTypes';

const modalRepairTypes = new ModalRepairTypes();
const modalPrivacy = new ModalPrivacy();
const modalConsultation = new ModalConsultation();

header();
phoneMask();
sectionFormula();
transparency();
sendForm();
repairTypes();

const buttonFooter = document.querySelector('.footer .button-footer');
buttonFooter.addEventListener('click', (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.closest('.button-footer')) {
    smoothScroll(target);
  }
});
