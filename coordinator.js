var _ = require('lodash');
var Client = require('./client');
var ClientList = require('./clientList');
var Task = require('./task');
var tasks = require('./tasks');

class Coordinator {
  constructor (io) {
    this.io = io;
    this._configureIO();
    this.clients = new ClientList();
  }

  _configureIO () {
    var self = this;
    this.io.on('connection', (socket) => {
      console.log('Client connected to websocket.');
      socket.on('registerClient', (clientInfo) => {
        self._register(socket, clientInfo);
      });
      socket.on('disconnect', () => {
        self._deregister(socket);
      });
      socket.on('startTask', (request, cb) => {
        var task = new Task(tasks[request.task], request.input);
        task.clients = self.clients;
        task.run()
        .then((data) => cb('resolve', data))
        .catch((error) => cb('reject', error));
      });
      socket.on('getTaskDefinitions', (cb) => {
        cb(tasks);
      });
    });
  }

  _register (socket, clientInfo) {
    this.clients.add(new Client(clientInfo, socket));
    console.log('Client ' + clientInfo.uuid + ' registered.');
  }

  _deregister (socket) {
    var client = this.clients.removeBySocket(socket);
    if(client)
      console.log('Client ' + client.uuid + ' deregistered.');
  }
}


module.exports = Coordinator;
