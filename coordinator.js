var _ = require('lodash');
var Client = require('./client');
var ClientList = require('./clientList');
var Task = require('./task');
var tasks = require('./tasks');
var log = require('./log');

class Coordinator {
  constructor (io) {
    this.io = io;
    this._configureIO();
    this.clients = new ClientList();
  }

  _configureIO () {
    this.io.on('connection', (socket) => {
      log.event('Client connected to websocket.');
      socket.on('registerClient', (clientInfo) => {
        this._register(socket, clientInfo);
      });
      socket.on('disconnect', () => {
        this._deregister(socket);
      });
      socket.on('startTask', (request, cb) => {
        var task = new Task(tasks[request.task], request.input);
        task.clients = this.clients;
        log.event('Task ' + task.uuid + ' started', {type: 'taskStart', uuid: task.uuid, clientUUID: task.clients.getSocketOwner(socket).uuid});
        task.run()
        .then((data) => {
          cb('resolve', data)
          log.event('Task ' + task.uuid + ' completed', {type: 'taskComplete', uuid: task.uuid, clientUUID: task.clients.getSocketOwner(socket).uuid});
        })
        .catch((error) => cb('reject', error));
      });
      socket.on('getTaskDefinitions', (cb) => {
        cb(tasks);
      });
    });
  }

  _register (socket, clientInfo) {
    this.clients.add(new Client(clientInfo, socket));
    log.event('Client ' + clientInfo.uuid + ' registered.', {type: 'clientRegister', uuid: clientInfo.uuid});
  }

  _deregister (socket) {
    var client = this.clients.removeBySocket(socket);
    if(client)
      log.event('Client ' + client.uuid + ' deregistered.', {type: 'clientDeregister', uuid: client.uuid});
  }
}


module.exports = Coordinator;
