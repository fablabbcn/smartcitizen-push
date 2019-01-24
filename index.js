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

dataQueue.on("message", function(channel, message){
	var info = JSON.parse(message);
	io.emit('data-received', info);
});

tokenQueue.on("message", function(channel, message){
	var info = JSON.parse(message);
	io.emit('token-received', info);
});

io.listen(8000);

