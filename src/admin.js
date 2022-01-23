import login from './modules/admin/login';
import RepairTypeService from './modules/ulils/repairTypeService';
import ModalEdit from './modules/admin/modalEdit';

login().then();

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

const getTableRow = (repairType) => {
  return `<tr class="table__row">
    <td class="table__id table__cell">${repairType.id}</td>
    <td class="table-type table__cell">${repairType.type}</td>
    <td class="table-name table__cell">
        ${repairType.name}
    </td>
    <td class="table-units table__cell">
        ${repairType.units}
        </td>
        <td class="table-cost table__cell">
        ${repairType.cost} руб
    </td>
    <td>
    <div class="table__actions table__cell">
        <button class="button action-change" data-action="change" data-id="${repairType.id}"><span class="svg_ui"><svg class="action-icon_change"><use xlink:href="./img/sprite.svg#change"></use></svg></span><span>Изменить</span>
    </button>
    <button class="button action-remove" data-action="remove" data-id="${repairType.id}"><span class="svg_ui"><svg class="action-icon_remove"><use xlink:href="./img/sprite.svg#remove"></use></svg></span><span>Удалить</span>
    </button>
    </div>
    </td>
    </tr>`;
};

const renderTable = (data) => {
  const tableContent = document.getElementById('tbody');
  tableContent.innerHTML = '';
  data.forEach((row) => {
    tableContent.insertAdjacentHTML('beforeend', getTableRow(row));
  });
};

let typeSelect = document.getElementById('typeItem');

const renderTypeSelect = (types) => {
  typeSelect.innerHTML = '<option value="Все услуги">Все услуги</option>';
  [...types].forEach((item) => {
    typeSelect.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`);
  });
};

const filter = async (value) => {
  console.log('filter');
  const res =
    value === 'Все услуги'
      ? await repairTypeService.getRepairTypes()
      : await repairTypeService.getSomeRepairTypes(value);
  console.log(res);
  if (res.ok) {
    renderTable(res.data);
  }
};

const run = async () => {
  const res = await repairTypeService.getRepairTypes();
  console.log(res);
  if (res.ok) {
    const types = res.data.reduce((sum, item) => sum.add(item.type), new Set());

    renderTypeSelect(types);
    renderTable(res.data);

    document.addEventListener('change', ({ target }) => {
      if (target.closest('#typeItem')) {
        filter(target.value);
      }
    });
  }
};

if (isAuthorized) {
  const table = document.getElementById('table');

  table.addEventListener('click', (e) => {
    e.preventDefault();
    const btn = e.target.closest('.action-change, .action-remove');
    if (btn) {
      const { id, action } = btn.dataset;
      console.log(id, action);
      if (action === 'change') {
        modalEdit.toggle(true, btn);
      }
    }
  });

  run();
}
