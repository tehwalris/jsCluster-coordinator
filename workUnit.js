var uuid4 = require('uuid4');

class WorkUnit {
  constructor (data) {
    this.uuid = uuid4();
    this.data = data;
  }
}

module.exports = WorkUnit;
