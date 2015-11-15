class ConsoleLogger {
  constructor () {
  }

  write (type, message, data) {
    console.log(type + ': ' + message);
    if(data)
      console.log(data);
  }
}

module.exports = ConsoleLogger;
