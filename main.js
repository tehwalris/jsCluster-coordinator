var app = require('express')();
var http = require('http').Server(app);

console.log('Started jsCluster coordinator.');

app.get('/', function (req, res) {
  res.send('JsCluster coordinator is running. <br/> Listening for websocket connections.');
});

http.listen(3210, function () {
  console.log('HTTP up.');
});
