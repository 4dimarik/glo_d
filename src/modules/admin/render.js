const render = (data) => {
  const tableContent = document.getElementById('tbody');

  const setTableRow = (repairType) => {
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
        <button class="button action-change btn-modal" data-action="change" data-id="${repairType.id}"><span class="svg_ui"><svg class="action-icon_change"><use xlink:href="./img/sprite.svg#change"></use></svg></span><span>Изменить</span>
    </button>
    <button class="button action-remove" data-action="remove" data-id="${repairType.id}"><span class="svg_ui"><svg class="action-icon_remove"><use xlink:href="./img/sprite.svg#remove"></use></svg></span><span>Удалить</span>
    </button>
    </div>
    </td>
    </tr>`;
  };

  tableContent.innerHTML = '';

  data.forEach((row) => {
    tableContent.insertAdjacentHTML('beforeend', setTableRow(row));
  });
};

export default render;
