var _ = require('lodash');
var Q = require('q');
var WorkUnit = require('./workUnit');
var ClientList = require('./clientList');

class Task {
  constructor (definition, input) {
    this.definition = definition;
    this.input = input;
    this.clients = new ClientList();
    this.workUnits = {
      all: {},
      notStarted: {}
    };
  }

  run () {
    if(_.isEmpty(this.clients.get()))
      throw 'No clients assigned to task.';
    this._split();
    this._runWorkUnits()
    .then(() => {
      console.log(this.workUnits.all);
    });
  }

  _split () {
    this.workUnits.all = _.indexBy(this.definition.functions.split(this.input, WorkUnit), 'uuid');
    this.workUnits.notStarted = _.clone(this.workUnits.all);
    var self = this;
    _.forEach(this.workUnits.all, (workUnit) => {
      workUnit.task = self.definition.task;
    });
  }

  _runWorkUnits () {
    var promises = [];
    while(!_.isEmpty(this.workUnits.notStarted)) {
      var workUnit = this._popWorkUnit();
      var client = _.sample(this.clients.get());
      delete this.workUnits.notStarted[workUnit.uuid];
      promises.push(client.run(workUnit));
    }
    return Q.all(promises);
  }

  _popWorkUnit () {
    var workUnit = _.sample(this.workUnits.notStarted);
    if(workUnit)
      delete this.workUnits.notStarted[workUnit.uuid];
    return workUnit;
  }
}

module.exports = Task;
