const smoothScroll = (link) => {
  const id = link.getAttribute('href').substring(1);
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

const sendForm = () => {
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit');
    const form = e.target.closest('form');
    if (!form.privacy.checked) {
      form.privacy.setCustomValidity('Вы должны согласиться с политикой конфиденнцияльности');
    }
    console.log(form.data);
    console.log(form.checkValidity());
    // if (form.checkValidity()) {
    // }
  });
};

export { smoothScroll, sendForm };
