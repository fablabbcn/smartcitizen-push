var io = require('socket.io-client')('ws://localhost:8000');

io.on('data-received', function(data){
	console.log(data);
});

io.on('token-received', function(data){
	console.log(data);
});