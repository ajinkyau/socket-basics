var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

$('.room-title').text(room);

socket.on('message', function(message){
	var timestampMoment = moment.utc(message.time);
	var $messages = $('.messages')
	var $message = $('<li class="list-group-item"></li>');

	console.log('New Message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + timestampMoment.local().format('h:mm a') + '<p><strong>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
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