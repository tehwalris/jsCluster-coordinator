var Q = require('q');

class Client {
  constructor (clientInfo, socket) {
    this.uuid = clientInfo.uuid;
    this.socket = socket;
  }

  run (workUnit) {
    var defered = Q.defer();
    setTimeout(defered.reject.bind(this, 'Client timed out running work unit.', 'client'), 60000); 
    this.socket.emit('newWorkUnit', workUnit, (response) => {
      if(response.type == 'success') {
        workUnit.result = response.body;
        defered.resolve(response.body);
      } else {
        defered.reject(response.body, response.origin);
      }
    });
    return defered.promise;
  }
}

module.exports = Client;
