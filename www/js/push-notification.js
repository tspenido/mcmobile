$(document).ready(function() {

	// Configura a notificação, altere o senderID
	var push = PushNotification.init({
		"android": {
			"senderID": "XXXXXX",
			icon: "icon"
		},
		"ios": {
			"alert": "true",
			"badge": "true",
			"sound": "true"
		},
		"windows": {}
	});

	// veja a explicação seguir
	push.on('registration', function(data) {
		console.log(data.registrationId);
	});

	// O que fazer quando clicar em uma notificação
	push.on('notification', function(data) {
		alert('Notificação acionada, agora deve-se implementar a navegação no app de acordo com os dados: ' + JSON.stringify(data));
	});

	// erro caso não possa registrar (veja a explicação seguir)
	push.on('error', function(e) {
		alert('registration error: ' + e.message);
	});


});