var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	var timestampMoment = moment.utc(message.time);

	console.log('New Message:');
	console.log(message.text);

	$('.messages').append('<p><strong>' + timestampMoment.local().format('h:mm a') + ':</strong> ' + message.text + '</p>');
});

// Handles submitting a new message
var $form = $('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('').focus();
});