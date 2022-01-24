import sendData from './sendData';

export default class RepairTypeService {
  constructor() {
    this.send = sendData;
  }

  getRepairTypes() {
    return this.send({ url: 'http://localhost:4545/repairTypes' }).then((res) => res);
  }

  getRepairType(id) {
    return this.send({ url: `http://localhost:4545/repairTypes/${id}` }).then((res) => res);
  }

  async getSomeRepairTypes(type) {
    let { ok, data } = await this.getRepairTypes();
    data = ok ? data.filter((repair) => repair.type === type) : {};
    return { ok, data };
  }

  async addRepairTypes(data) {
    let res = await this.send({ url: 'http://localhost:4545/repairTypes', method: 'POST', data });
    return res;
  }

  async removeRepairTypes(id) {
    let res = await this.send({ url: `http://localhost:4545/repairTypes/${id}`, method: 'DELETE' });
    return res;
  }

  async editRepairTypes(id, data) {
    let res = await this.send({ url: `http://localhost:4545/repairTypes/${id}`, method: 'PUT', data });
    return res;
  }
}
