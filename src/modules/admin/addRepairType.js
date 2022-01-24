import render from './render';
import RepairTypeService from '../ulils/repairTypeService';

const addRepairType = (toggleModal) => {
  const modalForm = document.querySelector('#modal form');

  const getFormData = (form) => {
    let formData = new FormData(form);
    const data = {};
    formData.forEach((val, key) => {
      data[key] = val;
    });
    return data;
  };

  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const { action, id } = form.dataset;
    if (action === 'add') {
      const repairTypeService = new RepairTypeService();
      const { ok: isAddOk } = await repairTypeService.addRepairTypes(getFormData(form));
      if (isAddOk) {
        form.reset();
        toggleModal(false);
        const { ok: isGetOk, data } = await repairTypeService.getRepairTypes();
        if (isGetOk) {
          render(data);
        }
      }
    }
  });
};

export default addRepairType;
