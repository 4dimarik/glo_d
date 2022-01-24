import sendData from '../ulils/sendData';

export default class UserService {
  constructor() {
    this.send = sendData;
  }

  getUsers() {
    return this.send({ url: 'http://localhost:4545/users' }).then((res) => res);
  }

  async getUser(login) {
    let { ok, data } = await this.getUsers();
    data = ok ? data.filter((user) => user.login === login)[0] : {};
    return { ok, data };
  }
}
