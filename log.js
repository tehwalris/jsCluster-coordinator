var _ = require('lodash');

class LogService {
  constructor () {
    this.loggers = [];
  }

  attachLogger (logger) {
    this.loggers.push(logger);
  }

  event (message, data) {
    this._writeToLoggers('event', message, data);
  }

  _writeToLoggers (type, message, data) {
    _.forEach(this.loggers, (logger) => {logger.write(type, message, data)});
  }
}

var log = new LogService();
module.exports = log;
