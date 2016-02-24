var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message){
	var timestampMoment = moment.utc(message.time);
	var $message = $('.messages')
	console.log('New Message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + timestampMoment.local().format('h:mm a') + '<p><strong>');
	$message.append('<p>' + message.text + '</p>');
});

// Handles submitting a new message
var $form = $('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('').focus();
});