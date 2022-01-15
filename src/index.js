import header from './modules/header/header';
import { smoothScroll } from './modules/helpers';
import ModalPrivacy from './modules/modalPrivacy';
import ModalRepairTypes from './modules/modalRepairTypes';
import phoneMask from './modules/phoneMask';
import formulaItemPopup from './modules/formulaItemPopup';

const modalRepairTypes = new ModalRepairTypes();
const modalPrivacy = new ModalPrivacy();

header();
phoneMask();
formulaItemPopup();

const buttonFooter = document.querySelector('.footer .button-footer');
buttonFooter.addEventListener('click', (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.closest('.button-footer')) {
    smoothScroll(target);
  }
});
