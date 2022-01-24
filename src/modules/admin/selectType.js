import render from './render';
import RepairTypeService from '../ulils/repairTypeService';

const selectType = async (data) => {
  const repairTypeService = new RepairTypeService();
  let typeSelect = document.getElementById('typeItem');

  const renderTypeSelect = (types) => {
    typeSelect.innerHTML = '<option value="Все услуги">Все услуги</option>';
    [...types].forEach((item) => {
      typeSelect.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`);
    });
  };

  const filter = async (value) => {
    const res =
      value === 'Все услуги'
        ? await repairTypeService.getRepairTypes()
        : await repairTypeService.getSomeRepairTypes(value);
    if (res.ok) {
      render(res.data);
    }
  };

  const types = data.reduce((sum, item) => sum.add(item.type), new Set());

  renderTypeSelect(types);
  render(data);

  typeSelect.addEventListener('change', ({ target }) => {
    if (target.closest('#typeItem')) {
      filter(target.value);
    }
  });
};

export default selectType;
