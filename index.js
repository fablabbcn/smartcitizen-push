var redis = require("redis");
var io = require('socket.io')();

var dataQueue= redis.createClient();
var tokenQueue= redis.createClient();


dataQueue.subscribe("data-received");
tokenQueue.subscribe("token-received");


token_received
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

io.listen(9000);

