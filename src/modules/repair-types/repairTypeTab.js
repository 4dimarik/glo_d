import Tabs from '../ulils/tabs';
import sendData from '../ulils/sendData';

export default class RepairTypeTab extends Tabs {
  constructor() {
    super({
      tabPanelSelector: '.popup-dialog-repair-types',
      tabPanelItemSelectors: {
        navSelector: '.nav-list-popup-repair',
        navItemSelector: '.popup-repair-types-nav__item',
        tabItemSelector: '.popup-repair-types-content-table > table',
      },
    });

    this.tabItems.forEach((tab) => {
      tab.querySelector('tbody').innerHTML = '';
    });

    this.renderTab(0);
  }

  afterChoose(index) {
    this.renderTab(index);
  }

  renderTab(index) {
    const tabHeader = this.tabPanel.querySelector('#switch-inner');
    const type = this.navItems[index].textContent;
    tabHeader.textContent = type;
    sendData({ url: './db/db.json', method: 'GET' }).then((res) => {
      if (res.ok) {
        const repairs = res.data.repairTypes.filter((item) => item.type === type);
        this.renderTableRow(repairs, index);
      }
    });
  }

  renderTableRow(repairs, index) {
    const tBody = this.tabItems[index].querySelector('tbody');
    tBody.innerHTML = '';
    repairs.forEach((repair) => {
      tBody.insertAdjacentHTML('beforeend', this.getTableRow(repair));
    });
  }

  getTableRow(repairType) {
    // showHide
    return `<tr class="mobile-row">
  <td class="repair-types-name">${repairType.name}</td>
  <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
  <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
  <td class="repair-types-value">${repairType.units === 'm2' ? 'м<sup>2</sup>' : repairType.units}</td>
  <td class="repair-types-value">${repairType.cost} руб.</td>
</tr>`;
  }
}
