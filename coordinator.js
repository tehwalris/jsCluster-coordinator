class Coordinator {
  constructor (io) {
    this.io = io;
    this._configureIO();
  }

  _configureIO () {
    this.io.on('connection', function (socket) {
      console.log('Client connected to websocket.');
      socket.on('disconnect', function () {
        console.log('Client disconnected from websocket.');
      });
      socket.on('registerClient', function (clientInfo) {
        console.log('Client ' + clientInfo.uuid + ' registered');
      });
    });
  }
}


module.exports = Coordinator;
