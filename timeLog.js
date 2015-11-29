var _ = require('lodash');

class TimeLogService {
  constructor () {
    this._referenceTimes = [];
  }

  log (event) {
    this._referenceTimes.push({event: event, time: process.hrtime()});
  }

  exportMillis () {
    var startReference = this._referenceTimes[0];
    return _.map(this._referenceTimes, (reference) => {
      return {
        event: event,
        time: (reference.time[0] - startReference.time[0]) * 1000 + (reference.time[1] - startReference.time[1]) / 1000000
      };
    });
  }
}

module.exports = TimeLogService;
