var _ = require('lodash');
var Client = require('./client');
var ClientList = require('./clientList');
var Task = require('./task');

class Coordinator {
  constructor (io) {
    this.io = io;
    this._configureIO();
    this.clients = new ClientList();
  }

  _configureIO () {
    var self = this;
    this.io.on('connection', function (socket) {
      console.log('Client connected to websocket.');
      socket.on('registerClient', function (clientInfo) {
        self._register(socket, clientInfo);
      });
      socket.on('disconnect', function () {
        self._deregister(socket);
      });
      socket.on('runTestTask', function () {
        var definition = {
          functions: {
            split: function (input, WorkUnit) {
              console.log('Splitting.');
              return _.map(input, function(item) {return new WorkUnit(item);});
            },
            work: function (workUnit) {
              console.log('Working on ' + workUnit.data + '.');
            }
          }
        };
        var task = new Task(definition, ['a', 'b', 'c']);
        task.clients = self.clients;
        task.run();
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
