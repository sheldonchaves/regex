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
  	console.log('Pattern: ' + inputPattern.value.trim());

  	return {'target': inputTarget.value.trim(), 
  			'pattern': inputPattern.value, 
  			'mostraIndex': checkboxIndex.checked, 
  			'mostraGrupos' : checkboxGroups.checked};
}

function _verifiqueInputs(inputTarget, inputPattern) {
	if(!inputTarget.value) {
		inputTarget.placeholder = 'Digite um target';
	}

	if(!inputPattern.value) {
		inputPattern.placeholder = 'Digite um pattern';
	}

	if(!inputTarget.value || !inputPattern.value) {
		throw Error('Valores invalidos');
	}
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



$( "#target, #pattern" ).keyup(function() {
	if ($( "#pattern" ).val().length > 2){
  		executa(event);
	}
});

var accordions = [
	{"name":"basic", "list":[
		{"name":"file", "text":"image.png", "pattern":".*png"},
		{"name":"filho2", "text":"texto", "pattern":"xxxx"},
		{"name":"filho3", "text":"texto", "pattern":"xxxx"},
		{"name":"filho4", "text":"texto", "pattern":"xxxx"},
	]},
	{"name":"test1"},
	{"name":"test2"}
];

var acc = $("#accordion");

$(function() {
	makePanels ();
});


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