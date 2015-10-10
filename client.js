var Q = require('q');

class Client {
  constructor (clientInfo, socket) {
    this.uuid = clientInfo.uuid;
    this.socket = socket;
  }

  run (workUnit) {
    console.log('Sending work unit ' + workUnit.uuid + ' to client ' + this.uuid + '.');
    var defered = Q.defer();
    this.socket.emit('newWorkUnit', workUnit, defered.resolve);
    return defered.promise;
  }
}

module.exports = Client;
