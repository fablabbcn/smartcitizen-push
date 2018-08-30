var redis = require("redis");
var io = require('socket.io')();

// Use ENV var (for docker) if we have it, else use the default (undefined);
var redis_host = process.env.REDIS_URL || "redis://127.0.0.1:6379/0";
console.log("Connecting to redis_host: " + redis_host);

var dataQueue= redis.createClient(redis_host);
var tokenQueue= redis.createClient(redis_host);

dataQueue.subscribe("data-received");
tokenQueue.subscribe("token-received");

console.log('starting up');

io.on('connection', function(socket){

  console.log("client connected");
  socket.emit('welcome', { message: 'Welcome', id: socket.id });

  socket.on('disconnect', function(){
    console.log('client disconnected')
    socket.disconnect();
  });

  dataQueue.on("message", function(channel, message){
    var info = JSON.parse(message);
    socket.emit('data-received', info);
  });

  tokenQueue.on("message", function(channel, message){
    var info = JSON.parse(message);
    socket.emit('token-received', info);
  });

});

io.listen(8000);

