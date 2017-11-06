$(document).ready(function() {

	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);
	//DESABILITA O BOTAO VOLTAR DO CEL
	document.addEventListener("backbutton", onBackKeyDown, false);

	hostPecas = 'http://mcjapi.montecarlo.com.br:9696/rodesapi/items';
	hostClientes = 'http://mcjapi.montecarlo.com.br:9696/rodesapi/cliente';

	Materialize.updateTextFields();

	//BOTAO CONSULTA PECAS
	$("#btnConsultaPecas").click(function() {

		desabSetores();
		visilSetores('div_consultaPecas', 'Consulta de Peças');

	});

	$('.btnClose').click(function() {
		var resp = confirm("Você deseja sair?");
		if (resp == true) {
			navigator.app.exitApp();
		}
	});

	//BOTAO SAIR
	$('#btnSair').click(function() {

		var resp = confirm("Você deseja sair?");

		if (resp == true) {
			navigator.app.exitApp();
		}

	});


	$('.btnNovaBusca').click(function() {

		$('.formCamps').fadeIn(500);
		$('#pconsultaPecas').fadeOut(500);
		$('#numbers').val('');

	});

	//INSERINDO INFO DA PESSOA ACESSANDO
	var usuario = $.cookie("usuario");
	$('.bemvindo').text('Olá ' + usuario + ', você está logado no McMobile.');

	//INICIANDO TEXTO TOPO
	$('.texto_titulo').text('Principal');

	//ACOES DOS BOTOES NO MENU
	$(".buttonScan").click(function() {

		cordova.plugins.barcodeScanner.scan(

			function(result) {

				resultadoTabela(hostPecas, result.text);

			},
			function(error) {

				alert("Houve um problema: " + error);
			}
		);

	});

	$(".btnBuscarCod").click(function() {

		var numbers = $('#numbers').val();

		if (numbers == '') {

			Materialize.toast('Digite o código da peça.', 4000);
			$('.toast').css('display', 'table');
			$('.shadonw, .find').css('display', 'none');

		} else {

			//SALVA AS RESPOSTAS VIA AJAX
			resultadoTabela(hostPecas, numbers);

		}

	});

});

function onBackKeyDown(e) {
	e.preventDefault();
}

function onOffline() {
	$('.divoff').css('display', 'inline');
}

function onOnline() {
	$('.divoff').css('display', 'none');
}

function desabSetores() {

	$('#div_consultaPecas').fadeOut(500);
}

function visilSetores(classes, titulo) {

	$('#div_principal').fadeOut(500);
	$('#' + classes).fadeIn(500);
	$('.texto_titulo').text(titulo);
	$('.drag-target').click();
}

function resultadoTabela(hostPecas, result) {

	//SALVA AS RESPOSTAS VIA AJAX
	$.ajax({
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: hostPecas + '/' + result,
		beforeSend: function(xhr) {
			xhr.withCredentials = true;
			xhr.setRequestHeader('Access-Control-Allow-Origin', hostPecas);
			xhr.setRequestHeader('token', $.cookie("token"));

			$('.shadonw, .find').css('display', 'inline');
		},
		success: function(data) {

			if (data.CodLoja !== '') {

				$('.shadonw, .find').css('display', 'none');

				$('.codnpeca').html('<span class="badge">' + data.Peca + '</span>Peça:');
				$('.codref').html('<span class="badge">' + data.Referencia + '</span>Referência:');
				$('.codqtd').html('<span class="badge">' + data.Saldo + '</span>Quantidade:');
				$('.codcol').html('<span class="badge">' + data.DescricaoColecao + '</span>Coleção:');
				$('.codsit').html('<span class="badge">' + data.Situacao + '</span>Situação da Peça:');
				$('.codmoed').html('<span class="badge">' + data.DescricaoMoeda + '</span>Moeda:');
				// $('.codcmv').html('<span class="badge">' + data.CMV + '</span>CMV:');
				// $('.codprevend').html('<span class="badge PrecoVenda">' + data.PrecoVenda + '</span>Preço de Venda:');
				$('.codprecesp').html('<span class="badge PrecoEspecial">' + data.PrecoEspecial + '</span>Preço Especial:');
				$('.codmed').html('<span class="badge">' + data.MedidaPecas + '</span>Medida:');

				$('.formCamps').css('display', 'none');
				$('#pconsultaPecas').css('display', 'table');

			} else {

				Materialize.toast('Peça não encontrada, tente novamente.', 4000);
				$('.toast').css('display', 'table');
				$('.shadonw, .find').css('display', 'none');
			}

		},
		error: function(data) {

			if (data.status == 404) {

				$('.shadonw, .find').css('display', 'none');
				Materialize.toast('Peça não foi encontrada. Tente novamente.', 4000);
				$('.toast').css('display', 'table');

			} else if (data.status == 401) {

				alert('Sua sessão terminou, por favor efetue o login novamente.');
				location.href = "index.html";

			} else {

				Materialize.toast('Não foi possivel realizar a consulta, tente novamente.', 4000);
				$('.toast').css('display', 'table');
				$('.shadonw, .find').css('display', 'none');
			}

		}
	});

}