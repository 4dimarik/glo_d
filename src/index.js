import header from './modules/header/header';
import { smoothScroll } from './modules/helpers';
import ModalRepairTypes from './modules/modalRepairTypes';
import ModalPrivacy from './modules/modalPrivacy';

const modalRepairTypes = new ModalRepairTypes();
const modalPrivacy = new ModalPrivacy();

header();

const buttonFooter = document.querySelector('.footer .button-footer');
buttonFooter.addEventListener('click', (e) => {
  e.preventDefault();
  const { target } = e;
  if (target.closest('.button-footer')) {
    smoothScroll(target);
  }
});
