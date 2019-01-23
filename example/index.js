require('socket.io-client')('ws://localhost:8000').on('data-received', function(data){
	console.log(data);
});