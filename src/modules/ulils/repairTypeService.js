import sendData from './sendData';

export default class RepairTypeService {
  constructor() {
    this._repairType = [];
    this.send = sendData;
  }

  get repairType() {
    return this._repairType;
  }

  set repairType(repairType) {
    this._repairType = repairType;
  }

  getRepairType() {
    return this.send({ url: 'http://localhost:4545/repairTypes' }).then((res) => res);
  }

  logger() {
    console.log(this._repairType);
  }
}
