import RepairTypeService from './modules/ulils/repairTypeService';
import ModalEdit from './modules/admin/modalEdit';
import editRepairTypeField from './modules/admin/editRepairTypeField';
import removeRepairTypeField from './modules/admin/removeRepairTypeField';
import addRepairType from './modules/admin/addRepairType';
import render from './modules/admin/render';
import selectType from './modules/admin/selectType';

const repairTypeService = new RepairTypeService();
const modalEdit = new ModalEdit();

const { pathname } = window.location;

const cookies = document.cookie.split(';').reduce((sum, item) => {
  const [key, value] = item.split('=');
  return { ...sum, ...{ [key]: value } };
}, {});

const isAuthorized = cookies.isAuthorized === 'true';

if (pathname.includes('html') && !pathname.includes('index.html')) {
  if (!isAuthorized) window.location.replace('./index.html');
}

const run = async () => {
  const res = await repairTypeService.getRepairTypes();
  if (res.ok) {
    render(res.data);
    await selectType(res.data);
  }
};

if (isAuthorized) {
  editRepairTypeField();
  removeRepairTypeField();
  addRepairType();
  run();
}
