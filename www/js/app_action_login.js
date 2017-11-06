$(document).ready(function() {

	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);

	Materialize.updateTextFields();

	$('.btnClose').click(function() {
		var resp = confirm("Você deseja sair?");
		if (resp == true) {
			navigator.app.exitApp();
		}
	});

	$('.btn').click(function() {

		var usu = $('#user').val();
		var senha = $('#senha').val();

		if ((usu == '') || (senha == '')) {

			Materialize.toast('Preencha todos os campos.', 4000);
			$('.toast').css('display', 'table');

		} else {

			//SALVA AS RESPOSTAS VIA AJAX
			$.ajax({
				contentType: "application/json; charset=utf-8",
				type: 'GET',
				url: '',
				beforeSend: function(xhr) {
					xhr.withCredentials = true;
					xhr.setRequestHeader('Access-Control-Allow-Origin', '');
					xhr.setRequestHeader('login', usu);
					xhr.setRequestHeader('pass', senha);

					$('.shadonw, .find').css('display', 'inline');
				},
				success: function(data) {

					if (data.Token !== '') {

						$('.shadonw, .find').css('display', 'none');
						$.cookie("usuario", data.UserName);
						$.cookie("token", data.Token);
						location.href = "forms.html";

					} else {

						$('.shadonw, .find').css('display', 'none');
						Materialize.toast('Dados informados incorretos. Tente novamente.', 4000);
						$('.toast').css('display', 'table');
					}
				},
				error: function(data) {

					if (data.status == 404) {

						$('.shadonw, .find').css('display', 'none');
						Materialize.toast('Dados informados incorretos. Tente novamente.', 4000);
						$('.toast').css('display', 'table');

					} else {

						$('.shadonw, .find').css('display', 'none');
						Materialize.toast('Não foi possivel realizar a identificação,<br />tente novamente.', 4000);
						$('.toast').css('display', 'table');
					}

				}
			});
		}

	});

});

function onOffline() {
	$('.divoff').css('display', 'inline');
}

function onOnline() {
	$('.divoff').css('display', 'none');
}