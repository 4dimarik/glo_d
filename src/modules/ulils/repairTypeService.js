import sendData from './sendData';

export default class RepairTypeService {
  constructor() {
    this.send = sendData;
  }

  getRepairType() {
    return this.send({ url: 'http://localhost:4545/repairTypes' }).then((res) => res);
  }
}
