var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var coordinator = new (require('./coordinator'))(io);

console.log('Starting jsCluster coordinator.');
http.listen(3210, () => {console.log('Websocket up.');});
