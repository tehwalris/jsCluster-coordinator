var _ = require('lodash');
var Q = require('q');
var uuid4 = require('uuid4');
var WorkUnit = require('./workUnit');
var ClientList = require('./clientList');
var log = require('./log');
var TimeLog = require('./timeLog');

class Task {
  constructor (definition, input) {
    this.uuid = uuid4();
    this.definition = definition;
    this.input = input;
    this.clients = new ClientList();
    this.workUnits = {
      all: {},
      notStarted: {}
    };
    this.distribution = {};
    this.timeLog = new TimeLog();
  }

  run () {
    this.timeLog.log('startTask');
    if(_.isEmpty(this.clients.get()))
      throw 'No clients assigned to task.';
    this._split();
    return this._runWorkUnits()
    .then(() => this._join());
  }

  _split () {
    this.timeLog.log('startSplit');
    this.workUnits.asGiven = this.definition.functions.split(this.input, WorkUnit);
    this.workUnits.all = _.indexBy(this.workUnits.asGiven, 'uuid');
    this.workUnits.notStarted = _.clone(this.workUnits.all);
    var self = this;
    _.forEach(this.workUnits.all, (workUnit) => {
      workUnit.task = self.definition.task;
    });
    this.timeLog.log('endSplit');
  }

  _runWorkUnits () {
    this.timeLog.log('startDistribution');
    var promises = [];
    while(!_.isEmpty(this.workUnits.notStarted)) {
      var workUnit = this._popWorkUnit();
      var client = _.sample(this.clients.get());
      delete this.workUnits.notStarted[workUnit.uuid];
      promises.push(client.run(workUnit));
      this.distribution[client.uuid] = (this.distribution[client.uuid] || 0) + 1;
    }
    log.event('Distributed task ' + this.uuid + '.', {type: 'taskDistribute', uuid: this.uuid, distribution: this.distribution});
    var allPromises = Q.all(promises);
    this.timeLog.log('endDistribution');
    return allPromises;
  }

  _join () {
    this.timeLog.log('startJoin');
    var result = this.definition.functions.join(_.map(this.workUnits.asGiven, 'result'));
    log.event('Joined task ' + this.uuid + '.', {type: 'taskJoin', uuid: this.uuid, distribution: this.distribution});
    this.timeLog.log('endJoin');
    return result;
  }

  _popWorkUnit () {
    var workUnit = _.sample(this.workUnits.notStarted);
    if(workUnit)
      delete this.workUnits.notStarted[workUnit.uuid];
    return workUnit;
  }
}

module.exports = Task;
