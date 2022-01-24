import render from './render';
import RepairTypeService from '../ulils/repairTypeService';

const removeRepairTypeField = () => {
  const tableContent = document.getElementById('tbody');

  tableContent.addEventListener('click', async (e) => {
    e.preventDefault();
    const btn = e.target.closest('.action-remove');
    if (btn) {
      const { id, action } = btn.dataset;
      if (action === 'remove') {
        const repairTypeService = new RepairTypeService();
        const { ok: isDeleteOk } = await repairTypeService.removeRepairTypes(id);
        if (isDeleteOk) {
          const { ok: isGetOk, data } = await repairTypeService.getRepairTypes();
          if (isGetOk) {
            render(data);
          }
        }
      }
    }
  });
};

export default removeRepairTypeField;
