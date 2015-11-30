var _ = require('lodash');
var Q = require('q');
var TimeLog = require('./timeLog');

class Client {
  constructor (clientInfo, socket) {
    this.uuid = clientInfo.uuid;
    this.socket = socket;
  }

  run (workUnit) {
    var defered = Q.defer();
    var timeLog = new TimeLog();
    timeLog.log('send');
    setTimeout(defered.reject.bind(this, 'Client timed out running work unit.', 'client'), 60000); 
    this.socket.emit('newWorkUnit', workUnit, (response) => {
      if(response.type == 'success') {
        timeLog.log('receive');
        workUnit.timeLog = timeLog.exportMillis();
        _.forEach(response.times, (time, event) => {workUnit.timeLog.push({event: event, time: time});});
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
