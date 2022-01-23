import sendData from './sendData';

export default class RepairTypeService {
  constructor() {
    this.send = sendData;
  }

  getRepairTypes() {
    return this.send({ url: 'http://localhost:4545/repairTypes' }).then((res) => res);
  }

  async getSomeRepairTypes(type) {
    let { ok, data } = await this.getRepairTypes();
    data = ok ? data.filter((repair) => repair.type === type) : {};
    return { ok, data };
  }
}
