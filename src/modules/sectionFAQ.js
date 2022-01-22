const sectionFAQ = () => {
  const section = document.getElementById('faq');

  const accordion = () => {
    const accordionEl = section.querySelector('.accordion');
    const activeClass = 'msg-active';
    const itemSelector = '.title_block';

    section.addEventListener('click', ({ target }) => {
      if (target.matches(itemSelector)) {
        target.classList.toggle(activeClass);
      }
    });
  };

  accordion();
};

export default sectionFAQ;
