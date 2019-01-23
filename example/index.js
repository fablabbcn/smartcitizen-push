require('socket.io-client')('wss://localhost:8000').on('token-received', function(data){
	console.log(data);
});