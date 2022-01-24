import render from './render';
import RepairTypeService from '../ulils/repairTypeService';

const editRepairTypeField = () => {
  const modalForm = document.querySelector('#modal form');
  const tableContent = document.getElementById('tbody');

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
    if (action === 'change') {
      const repairTypeService = new RepairTypeService();
      const { ok: isChangeOk } = await repairTypeService.editRepairTypes(id, getFormData(form));
      if (isChangeOk) {
        const { ok: isGetOk, data } = await repairTypeService.getRepairTypes();
        if (isGetOk) {
          render(data);
        }
      }
    }
  });
};

export default editRepairTypeField;
