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

export default smoothScroll;
