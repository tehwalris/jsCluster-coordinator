var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(3210, {transports: ['websocket']});
var log = require('./log');

log.attachLogger(new (require('./consoleLogger'))());
log.attachLogger(new (require('./socketLogger'))(io.of('monitoring')));
var coordinator = new (require('./coordinator'))(io);

log.event('Starting jsCluster coordinator.');
