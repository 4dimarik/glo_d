const contacts = require('./contacts');
const menu = require('./menu');

const header = () => {
  const block = document.querySelector('header');
  contacts(block);
  menu(block);
};

module.exports = header;
