import contacts from './contacts';
import menu from './menu';

const header = () => {
  const block = document.querySelector('header');
  contacts(block);
  menu(block);
};

export default header;
