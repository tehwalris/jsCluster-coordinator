var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var log = require('./log');
var coordinator = new (require('./coordinator'))(io);

log.event('Starting jsCluster coordinator.');
http.listen(3210, () => {log.event('Websocket up.');});
