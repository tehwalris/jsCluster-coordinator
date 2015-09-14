var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log('Started jsCluster coordinator.');

app.get('/', function (req, res) {
  res.send('JsCluster coordinator is running. <br/> Listening for websocket connections.');
});

http.listen(3210, function () {
  console.log('HTTP up.');
});

io.on('connection', function (socket) {
  console.log('Client connected to websocket.');
  socket.on('disconnect', function () {
    console.log('Client disconnected from websocket.');
  });
  socket.on('registerClient', function (clientInfo) {
    console.log('Client ' + clientInfo.uuid + ' registered');
  });
});
