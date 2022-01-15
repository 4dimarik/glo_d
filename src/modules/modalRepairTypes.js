const modalRepairTypes = (show) => {
  const modal = document.querySelector('.popup-repair-types');
  const dialog = modal.querySelector('.dialog-repair-types');
  // repair-types-list
  modal.style.visibility = show ? 'visible' : 'hidden';
};

export default modalRepairTypes;
