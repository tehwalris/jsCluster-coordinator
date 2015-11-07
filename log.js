class LogService {
  constructor () {
  }

  event (message, data) {
    console.log(message);
    if(data)
      console.log(data);
  }
}

var log = new LogService();
module.exports = log;
