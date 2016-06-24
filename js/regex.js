function executa(event) {

	if (event){

	event.preventDefault();
	}

	limparResultados();
	var valores 	 = pegaValoresDoForm();

    var resultados 	 = executaRegex(valores);
    
    imprimeResultadoNoInput(resultados);
    highlightResultados(resultados, valores.target);
}


function executaRegex(valores) {

	var textoPattern = valores.pattern; //montaPatternDeDataMaisLegivel();
	var textoTarget  = valores.target;
	var mostraIndex  = valores.mostraIndex;
	var mostraGrupos = valores.mostraGrupos;

	var resultados	 = [];
    var resultado 	 = null;


	var objetoRegex  = new RegExp(textoPattern, 'g');

	while (resultado = objetoRegex.exec(textoTarget)) {

		if(resultado[0] === "") {
			throw Error("Regex retornou valor vazio.");
		}

		console.log("Resultado: " + resultado[0]);

		resultados.push(geraResultado(mostraGrupos ? resultado.join(' ||| ') : resultado[0], resultado.index, objetoRegex.lastIndex, mostraIndex));
	}

	logaTempoDeExecucao(textoPattern, textoTarget);

	

	return resultados;
}


function geraResultado(resultado, index, lastIndex, mostraIndex) {

	var textoIndex = mostraIndex ? " [" + index + "-" + lastIndex+ "]" : ""

	return {
		'resultado': resultado + textoIndex,
		'index': index,
		'lastIndex': lastIndex
	};
}


function logaTempoDeExecucao(textoPattern, textoTarget) {
	var pObjetoRegex  = new RegExp(textoPattern, 'g');
    var ini = performance.now();
    pObjetoRegex.test(textoTarget)
	var fim =  performance.now();
	console.log("Tempo de execução (ms) " + (fim-ini));
}

function imprimeResultadoNoInput(resultados) {
	var inputResultado 	= document.querySelector('#resultado');
	var labelResultado 	= document.querySelector('#labelResultados');

    labelResultado.innerHTML = (resultados.length) + " Matches (resultados)";

	var resultadosComoArray = resultados.map(function(item){ 
		return item.resultado;
	});
	
	labelResultado.innerHTML = (resultadosComoArray.length) + " Matches (resultados)";

    if(resultadosComoArray.length > 0) {
    	inputResultado.value = resultadosComoArray.join(' | ');
    	inputResultado.style.borderStyle = 'solid';
    	inputResultado.style.borderColor = 'lime';//verde
    } else {
    	inputResultado.placeholder = 'Sem matches (resultados)';
    	inputResultado.value = '';
    	inputResultado.style.borderStyle = 'solid';
    	inputResultado.style.borderColor = 'red';
    }
}


function highlightResultados(resultados, texto) {	
	var item = null;
	var indexBegin = 0;
	var conteudo = "";

	while((item = resultados.shift()) != null) {
		conteudo += semHighlight(escapeHtml(texto.substring(indexBegin, item.index)));
		conteudo += comHighlight(escapeHtml(texto.substring(item.index, item.lastIndex)));
		indexBegin = item.lastIndex;
	}

	//sobrou algum texto?
	if((texto.length - indexBegin) > 0) {
		conteudo += semHighlight(escapeHtml(texto.substring(indexBegin, texto.length)));
	}
	
	document.querySelector("#highlightText").innerHTML = conteudo;
}

function semHighlight(texto) {
	return texto;
	//return "<s>" + texto + "</s>";
}

function comHighlight(texto) {
	return "<span class='bg-primary'>" + texto + "</span>";
}

function escapeHtml( string ) {
     return string.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}	


function pegaValoresDoForm() {

	var inputTarget 	= document.querySelector('#target');
	var inputPattern 	= document.querySelector('#pattern')
	//inputPattern.focus();

	var checkboxIndex 	= document.querySelector('#mostraIndex');
	var checkboxGroups 	= document.querySelector('#mostraGrupos');

  	_verifiqueInputs(inputTarget, inputPattern);

  	console.log('Target:  ' + inputTarget.value);
  	console.log('Pattern: ' + $("#pattern").text().trim());

  	return {'target': inputTarget.value.trim(), 
  			'pattern': $("#pattern").text(), 
  			'mostraIndex': checkboxIndex.checked, 
  			'mostraGrupos' : checkboxGroups.checked};
}

function _verifiqueInputs(inputTarget, inputPattern) {
	if(!inputTarget.value) {
		inputTarget.placeholder = 'Digite um target';
	}

	/*if(!$("#pattern").text()) {
		inputPattern.placeholder = 'Digite um pattern';
	}*/
/*
	if(!inputTarget.value || !$("#pattern").text()) {
		throw Error('Valores invalidos');
	}*/
}

function limparResultados() {
	console.clear();
	document.querySelector('#labelResultados').innerHTML = '0 Matches (resultados)';
	document.querySelector('#resultado').value = '';
	document.querySelector('#resultado').placeholder = 'sem resultado';
	document.querySelector("#highlightText").innerHTML = '<em>sem resultado</em>';

}

function montaPatternDeDataMaisLegivel() {

	var DIA  = "[0123]?\\d";
	var _DE_ = "\\s+(de )?\\s*";
	var MES  = "[A-Za-z][a-zç]{3,8}";
	var ANO  = "[12]\\d{3}";
	return DIA + _DE_ +  MES + _DE_ + ANO;  

}

/**********************************************************************************/

function highlight() {
    $("#pattern").each(function () {
        var p = $(this).text().replace(new RegExp("\d", 'g'), "<span class='char-d'>" + '\d' + "</span>");
        $(this).html(p);

     
    });
}


$( "#target, #pattern" ).keyup(function() {
	if ($( "#pattern" ).val().length > 2){
  		executa(event);
  		
	}
});



$('#pattern').bind("keyup",function(){
	//highlight();
	executa(event);
});



var textBasic1 = "image.png (21) 3216-2345 04013-010 7676.9999.22 15.123.321/8883-22 123.456.789-00 128.126.12.244 255.255.255.255"
var textDateBR = "28 de dezembro de 2008 31   de Janeiro de 1997 05 de janeiro de 1979, 31 de março de 2016"

var accordions = [
	{"name":"basic", "list":[
		{"name":"file", "text":textBasic1, "pattern":".*png"},
		{"name":"cpf", 	"text":textBasic1, "pattern":'\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}'},
		{"name":"cnpj", "text":textBasic1, "pattern":"\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}"},
		{"name":"ip", 	"text":textBasic1, "pattern":/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g},
		{"name":"cep", 	"text":textBasic1, "pattern":/\d{5}-\d{3}/g},
		{"name":"fone", "text":textBasic1, "pattern":"\\(\\d{2}\\) \\d{3,4}-\\d{4}"},
	]},
	{"name":"test1", "list":[
		{"name":"data extenso 1", "text":textDateBR, "pattern":"[0-3]?\\d\\s+de\\s+[A-Za-zç]{4,9}\\s+de\\s+[12]\\d{3}"},
	]},

	
	
	{"name":"test2", "list":[
		{"name":"file", "text":textDateBR, "pattern":"[0-3]?\d\s+de\s+[A-Za-zç]{4,9}\s+de\s+[12]\d{3}"},
	]}
];

var acc = $("#accordion");

$(function() {
	makePanels ();

	$(".action").click(function(event) {
		loadExample($(this));
	});
});

function loadExample(item){
	var group = item.attr("data-group");
	var id = item.attr("data-id");
	
	var item = accordions[group].list[id];

	$("#target").val(item.text);
	$("#pattern").text(String(item.pattern).replace(/[\/|\/g]/g,""));
	//$("#pattern").text(String(item.pattern).substring(1, String(item.pattern).length-2));


	//highlight();
	//executa(event);
}


function makePanels (item){

	for (var i = 0; i < accordions.length; i++) {

		var item = accordions[i];

		var label = item.name;

		var list = $('<ul>').addClass('numerics');

		$(item.list).each(function(index, el) {
			list
				.append(
					$("<li>")
						.append(
							$("<a>")
								.text(el.name)
								.addClass('action')
								.attr("href", "#")
								.attr("data-group", i)
								.attr("data-id", index)
						)	
				)
		});

		var panel = $("<div>").addClass('panel panel-default');

		panel.append(
			$("<div>").addClass('panel-heading')
				.append(
					$('<div>').addClass('panel-title')
						.append(
							$('<a>')
								.attr("data-toggle", "collapse")
								.attr("data-parent", "#accordion")
								.attr("aria-expanded", "false")
								.attr("href", "#collapse" + label)
								.text(label +" ")

								.append(
									$("<span>").addClass('badge').text($(item.list).length)
								)
						)
				)
		);

		panel.append(
			$("<div>").addClass('panel-collapse collapse').attr("id", "collapse" + label)
				.append(
					$('<div>').addClass('panel-body')
						.append(
							$('<ul>').addClass('numerics')
								.append(list)
						)
				)
		)

		acc.append(panel);
	}
}