var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var log = require('./log');

log.attachLogger(new (require('./consoleLogger'))());
log.attachLogger(new (require('./socketLogger'))(io.of('monitoring')));
var coordinator = new (require('./coordinator'))(io);

log.event('Starting jsCluster coordinator.');
http.listen(3210, () => {log.event('Websocket up.');});
