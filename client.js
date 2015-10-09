class Client {
  constructor (clientInfo, socket) {
    this.uuid = clientInfo.uuid;
    this.socket = socket;
  }

  run (workUnit, task) {
    console.log('Pretending to send work to client.');
    task(workUnit);
  }
}

module.exports = Client;
