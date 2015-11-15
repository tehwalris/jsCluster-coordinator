class SocketLogger {
  constructor (io) {
    this.io = io;
  }

  write (type, message, data) {
    this.io.emit('log', type, message, data);
  }
}

module.exports = SocketLogger;
