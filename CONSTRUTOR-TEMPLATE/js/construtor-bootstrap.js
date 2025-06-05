/*ISMAEL CORREA - Impeto Informática - 08/10/2021*/
	
//variáveis que armazenam as colunas do bootstrap
var firstColumn   = '<fieldset><div class="row new-row"><div class="cl col-md-12"><div class="container-empty container-cl"></div></div></fieldset>';	
var oneColumn 	  = '<div class="row new-row"><div class="cl col-md-12"><div class="container-empty container-cl"></div></div>';	
var twoColumns    = '<div class="row new-row"><div class="cl col-md-6"><div class="container-empty container-cl"></div></div><div class="cl col-md-6"><div class="container-empty container-cl"></div></div>';	
var twoThirds     = '<div class="row new-row"><div class="cl col-md-9"><div class="container-empty container-cl"></div></div><div class="cl col-md-3"><div class="container-empty container-cl"></div></div>';	
var oneThird      = '<div class="row new-row"><div class="cl col-md-3"><div class="container-empty container-cl"></div></div><div class="cl col-md-9"><div class="container-empty container-cl"></div></div>';	
var threeColumns  = '<div class="row new-row"><div class="cl col-md-4"><div class="container-empty container-cl"></div></div><div class="cl col-md-4"><div class="container-empty container-cl"></div></div><div class="cl col-md-4"><div class="container-empty container-cl"></div>';	
var fourColumns   = '<div class="row new-row"><div class="cl col-md-3"><div class="container-empty container-cl"></div></div><div class="cl col-md-3"><div class="container-empty container-cl"></div></div><div class="cl col-md-3"><div class="container-empty container-cl"></div></div><div class="cl col-md-3"><div class="container-empty container-cl"></div>';	
var btnControl    = '<div class="editMode action-group create-group"><button title="Excluir Linha" class="btnAction  btnDelete"><span class="material-symbols-outlined">delete</span></button><button title="Clonar" class="btnAction btnClone"><span class="material-symbols-outlined">content_copy</span></button><select class="field-column"><option>1</option><option>1/4</option><option>2</option><option>3/4</option><option>3</option><option>4</option></select><button title="Criar Linha" class="btnAction btnCreate"><span class="material-symbols-outlined">add</span></button></div>';

var btnCreateEdit = '<div class="editMode btnCreateEdit"><div class="area"><span class="icon"></span></div></div>'; 

var btnControlGroup  = '<div class="editMode action-group createFieldset"><button title="Excluir Grupo" class="btnAction  btnDeleteGrupo"><span class="material-symbols-outlined">delete</span></button><button title="Editar Grupo" class="btnAction btnEditarGrupo"><span class="material-symbols-outlined">edit</span></button><button title="Criar Grupo" class="btnAction btnCreateGrupo"><span class="material-symbols-outlined">add</span></button></div>';

function openModal() {
	$('.bg-modal' ).show();
}

function closeModal() {
	$('.bg-modal' ).hide();
	$('.btnConfirmModal').click(function () {
		$(this).parent('.modal').hide();
	});
}
function styleTemplate() {
	newColorBg = $('#color-picker').val();
	newColorBorder = $('#color-picker2').val();
	newColorText = $('#color-picker3').val();
	newFontSize  = $('#font-size').val();
	newFontFamily  = $('#font-family').val();
	titleForm = $('#titleForm').val();
	$('.container-construtor .full-template, .container-construtor').css('background-color', newColorBg);
	$('.container-construtor .full-template fieldset').css('border-color', newColorBorder);
	$('.container-construtor, .full-template p, .full-template fieldset legend').css('color', newColorText);
	$('.container-construtor, .full-template p,.container-construtor .full-template p span, full-template fieldset legend').css('font-family', newFontFamily);
	$('.container-construtor .full-template p, .container-construtor .full-template p span').css('font-size', newFontSize);
	$('.container-construtor .titleForm').text(titleForm);
}
	$(document).ready(function () {
		var newSelect = '';
		var newOption = '';
		var newTitle = '';
		
		$('.modalCreate .btnSalvar').prop("disabled", true);
		
		//cria o componente de cor e adiciona no template
		$('#color-picker').spectrum({
		  type: "component"
		});
		$('#color-picker2').spectrum({
		  type: "component"
		});
		$('#color-picker3').spectrum({
		  type: "component"
		});


		$('.addStyleTemplate').unbind().on('click', function () {
			styleTemplate();			
		});
		
		//exibe ou oculta os botoes de ação caso haja conteudo na pagina
		if ($('.container-cl').text().length > 0 ||  $('.container-cl').find('img').length)  {
			$('.btnSaveEditable, .btnPreview').show();
		} else {
			$('.btnSaveEditable, .btnPreview').hide();
			
			//inicializa o componente de edicao no modal
			$('.summernote').summernote();

			//adiciona a primeira coluna como header
			$(firstColumn).appendTo('.full-template');
			
			//adiciona os botoes de ação na lateral da linha
			$('fieldset:first-child').append(btnControlGroup);

			//adiciona os botoes de ação na lateral da linha
			$('.new-row:first-child').append(btnControl);

			//adiciona o botao que chama a modal de edicao de conteudo na primeira linha
			$('.new-row:first-child .cl').append(btnCreateEdit);
		}


		//se clicar no botao de "+" ao lado da linha , captura o valor escolhido na combo
		//e adiciona o html abaixo
		$(document).on("click", '.btnCreate', function() {	
			//armazena o valor escolhido na combo
			var numColumns = $(this).parents('.new-row').find($('.field-column')).val();		
						
			if (numColumns == '1') { 
				$(oneColumn).addClass('thisRow').insertAfter($(this).parents('.new-row')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			}
			else if (numColumns == '1/4') { 
				$(oneThird).addClass('thisRow').insertAfter($(this).parents('.new-row')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			} 
			else if (numColumns == '2') { 
				$(twoColumns).addClass('thisRow').insertAfter($(this).parents('.new-row')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			} 
			else if (numColumns == '3/4') { 
				$(twoThirds).addClass('thisRow').insertAfter($(this).parents('.new-row')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			} 
			else if (numColumns == '3') { 
				$(threeColumns).addClass('thisRow').insertAfter($(this).parents('.new-row')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			} 
			else if (numColumns == '4') { 
				
				$(fourColumns).addClass('thisRow').insertAfter($(this).parents('.new-row')).append(btnControl);	
				
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
				
			}
			$('.full-template').find('.thisRow').removeClass('thisRow');			
		});	
		
		//Criação de fildset pra grupos 
		$(document).on("click", '.btnCreateGrupo', function() {
					
			$('.modalNomeGrupo, .bg-modal' ).show();
			
			//armazena o valor escolhido na combo
			var numColumns = $(this).parents('fieldset').find($('.field-column')).val();		
						
			if (numColumns == '1') { 
				$(oneColumn).addClass('thisRow').insertAfter($(this).parents('fieldset')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			}
			else if (numColumns == '1/4') { 
				$(oneThird).addClass('thisRow').insertAfter($(this).parents('fieldset')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			} 
			else if (numColumns == '2') { 
				$(twoColumns).addClass('thisRow').insertAfter($(this).parents('fieldset')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			} 
			else if (numColumns == '3/4') { 
				$(twoThirds).addClass('thisRow').insertAfter($(this).parents('fieldset')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			} 
			else if (numColumns == '3') { 
				$(threeColumns).addClass('thisRow').insertAfter($(this).parents('fieldset')).append(btnControl);
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
			} 
			else if (numColumns == '4') { 
				
				$(fourColumns).addClass('thisRow').insertAfter($(this).parents('fieldset')).append(btnControl);	
				
				//adiciona o botao que chama a modal
				$('.thisRow').find('.cl').append(btnCreateEdit);
				
			}
			//Criaçaõ de grupo Fildset
			$(document).on("click", '.saveGrupo', function() {

				var nomeLegenda = $(this).parents('.modalNomeGrupo').find('.tituloGrupo').val();
				var legenda = '<legend>' + nomeLegenda +'</legend>';
				
				$('.thisRow').wrap(function() {
				  return "<fieldset></fieldset>";
				  
				});
				$('.thisRow').parents('fieldset').append(btnControlGroup);
				
				$('.thisRow').parents('fieldset').prepend(legenda);
				
				$('.modalNomeGrupo, .bg-modal' ).hide(); 
				$('.full-template').find('.thisRow').removeClass('thisRow');
				
				styleTemplate();	
			});
			
			$(document).on("click", '.cancelDelete', function() {
				closeModal();
				$('.full-template').find('.thisRow').removeClass('thisRow');
			});	
					
		});	
		
				
		//Abre a modal de edicao ao clicar na coluna
		//$('.btnCreateEdit').unbind().on('click', function () {
		$(document).on("click", '.btnCreateEdit', function() {

			//inicializa o componente de edicao no modal
			$('.summernote').summernote();
			
			//adiciona uma classe que marca a linha corrente q receberá as ações
			$('.full-template').find('.current-Cl').removeClass('current-Cl');
			$('.modalCreate').find('.note-editable').empty().append('<p><br></p>');
			$(this).parents('.cl').toggleClass('current-Cl');
						
			$('.blockControl' ).hide();
			//$('body').css('overflow','hidden');
			
			//habilita o botao de salvar edição
			$('.modalCreate .btnSalvar').prop("disabled", false);
			
			//variavel q recebe o html da coluna clicada
			var htmlCurrent = $('.current-Cl').find('.container-cl').html();
			
			//se existir conteudo, insere o mesmo na modal pra edicao
			if ($(htmlCurrent).text().length > 0 ||  $(htmlCurrent).is('img') ||  $(htmlCurrent).is('input') 
				|| $(htmlCurrent).is('textarea')||  $(htmlCurrent).is('select')||  $(htmlCurrent).find('iframe').length > 0) {
				$('.modalCreate .note-editable').empty();
				$(htmlCurrent).appendTo('.modalCreate .note-editable');
				$('.current-Cl').find('.container-cl').removeClass('container-empty');
			}

			//salvar conteudo editado
			$(document).on("click", '.btnSalvar', function() {	
			
				//armazena o conteudo editado na modal
				var content = $('.modalCreate').find('.note-editable').html();
				var htmlCurrent = $('.current-Cl').find('.container-cl').html();
				//apaga o conteudo possa existir na coluna 
				$('.current-Cl .container-cl').empty();
				
				//e insere o novo editado no modal
				$(content).appendTo('.current-Cl .container-cl');
				
				$('.blockControl' ).show();
				//$('body').css('overflow','auto');
				
				//se a coluna estiver com conteudo tira o layout de coluna vazia
				if ($(htmlCurrent).text().length > 0 ||  $(htmlCurrent).is('img') ||  $(htmlCurrent).is('input') 
				|| $(htmlCurrent).is('textarea')||  $(htmlCurrent).is('select')||  $(htmlCurrent).find('iframe').length > 0){		
					$('.current-Cl').find('.container-cl').removeClass('container-empty');	
					//adiciona botao icone de lapis na edicao
					$('.current-Cl').find('.icon').addClass('iconEdit');
				}
				//verifica se tem conteudo na modal de edição 
				if ($(content).text().length > 0 ||  $(content).is('img') ||  $(content).is('input') 
				|| $(content).is('textarea')||  $(content).is('select')||  $(content).find('iframe').length > 0){		
					$('.current-Cl').find('.container-cl').removeClass('container-empty');	

				}
				else {
					$('.current-Cl').find('.container-cl').addClass('container-empty');
					//remove o icone de lapis , mantendo o de "+"
					$('.current-Cl').find('.icon').removeClass('iconEdit');
				}
				//remove  a classe corrente que marca as ações pra linha clicada
				$('.full-template').find('.current-Cl').removeClass('current-Cl');
				
				//após salvar , limpa o editor e adiciona o paragrafo q o componente usa pra
				//inserir o conteudo
				$('.modalCreate').find('.note-editable').empty().append('<p><br></p>');
				
				//a partir da primeira adicao de conteudo exibe os botoes de preview e publicação
				$('.btnShow').show();
				
				$('.modalCreate .btnSalvar').prop("disabled", true);
				$('.current-Cl').find('.container-cl').removeClass('container-empty');
				
				//aplica os estilos q o usuário definiu
				styleTemplate();			
				
			});	

			//cancelar criacao de conteudo
			$(document).on("click", '.cancelCreate', function() {	
				$('blockControl').show(); 
				$('.full-template').find('.current-Cl').removeClass('current-Cl');
				$('.blockControl' ).show();
				//limpa a modal de criacao caso o usuario clique em
				//cancelar em um modal ja com conteudo
				$('.modalCreate').find('.note-editable').empty().append('<p><br></p>');
				
				$('.modalCreate .btnSalvar').prop("disabled", true);
			});			
			
		});
				
		//Editar um grupo do template
		$(document).on("click", '.btnEditarGrupo', function() {	
			var legendaCorrente= $(this).parents('fieldset').addClass('thisFieldSet').find('legend').text();
			
			$('.modalNomeGrupo, .bg-modal').show();
			
			$('.tituloGrupo').val(legendaCorrente);
			
			$('.saveGrupo').unbind().on('click', function () {
				
				var newLegend = $('.tituloGrupo').val();
				
				$('.full-template').find('.thisFieldSet legend').text();
				
				$('.thisFieldSet').find('legend').text(newLegend);
				$('.modalNomeGrupo, .bg-modal').hide(); 
				//$(this).parents('fieldset').removeClass('thisFieldSet');
			});	
			$('.cancelDelete').unbind().on('click', function () {
				$('.full-template').find('.thisFieldSet').removeClass('thisFieldSet');

			});
		});
		
		//clonar uma linha do template
		$(document).on("click", '.btnClone', function() {	

			var rowClone = $(this).parents('.new-row').clone();	
			$(rowClone).insertAfter($(this).parents('.new-row'));	
		});
		
		//Excluir Grupo
		$(document).on("click", '.btnDeleteGrupo', function() {	
	
			//se houver conteudo na coluna da linha clicada pede pra confirmar exclusão
			if ( $(this).parents('fieldset').find('.container-cl').text().length > 0  ||  $(this).parents('.new-row').find('.container-cl').find('img').length
					||  $(this).parents('.new-row').find('.container-cl').find('iframe').length) {
				
				//adiciona uma classe que marca a linha a ser excluida e pinta de cor diferente
				$(this).parents('fieldset').addClass('currentDelete');
				
				//abre a modal de confirmação de exclusão
				$('.modalDelete, .bg-modal').show();
				
				//se clicar em cancelar nao exclui a linha
				$('.cancelDelete').on('click', function () {
					$(this).parents('.modal').hide(); 
					$('.bg-modal').hide();
					$('.full-template').find('.currentDelete').removeClass('currentDelete');
					$('.full-template').find('.current-Cl').removeClass('current-Cl');
				});
				//clicando em confirmar , apaga a linha
				$('.btnModalDeleteRow').on('click', function () {
					$('.currentDelete').remove();
					$('.modalDelete, .bg-modal').hide();
				});
				
			} else {
				//caso não haja conteudo exclui direto.
				$(this).parents('fieldset').remove();
			}
		});
		
		//Excluir linha
		$(document).on("click", '.btnDelete', function() {		
			//se houver conteudo na coluna da linha clicada pede pra confirmar exclusão
			if ( $(this).parents('.new-row').find('.container-cl').text().length > 0  ||  $(this).parents('.new-row').find('.container-cl').find('img').length
					||  $(this).parents('.new-row').find('.container-cl').find('iframe').length) {
				
				//adiciona uma classe que marca a linha a ser excluida e pinta de cor diferente
				$(this).parents('.new-row').addClass('currentDelete');
				
				//abre a modal de confirmação de exclusão
				$('.modalDelete, .bg-modal').show();
				
				//se clicar em cancelar nao exclui a linha
				$('.cancelDelete').on('click', function () {
					$(this).parents('.modal').hide(); 
					$('.bg-modal').hide();
					$('.full-template').find('.currentDelete').removeClass('currentDelete');
					$('.full-template').find('.current-Cl').removeClass('current-Cl');
				});
				//clicando em confirmar , apaga a linha
				$('.btnModalDeleteRow').on('click', function () {
					$('.currentDelete').remove();
					$('.modalDelete, .bg-modal').hide();
				});
				
			} else {
				//caso não haja conteudo exclui direto.
				$(this).parents('.new-row').remove();
			}
		});

		//adiciona em qualquer link inserido no conteudo atributo pra abrir em nova aba
		$('.container-cl a').attr('target','_blank');
		
		//prévia da pagina
		$(document).on("click", '.btnPreview', function() {		
			//oculta os botoes de ação e edição de conteudo
			$('.action-group, .btnCreateEdit, .btnReadOnly, .btnSaveEditable').toggleClass('no-visible');	
			$('.cl').find('.container-empty').toggleClass('no-visible');
			$(this).toggleClass('bgEdit');
			$('.full-template').find('.current-Cl').toggleClass('activeCL');	
			//troca o icone pro lapis de edicao
			$('.btnPreview .glyphicon').toggleClass('glyphicon-pencil');
			
		});	
		
		//salvar editavel da pagina
		$(document).on("click", '.btnSaveEditable', function() {		
			//oculta os botoes de ação e edição de conteudo
			$('.action-group, .btnCreateEdit, .btnDownload').removeClass('no-visible');	
			
			$(this).attr('href', 'data:text/html;charset=UTF-8,'
				/*Ao clicar no botao donload, captura o html da pagina*/	
				+encodeURIComponent($('.Formulario').clone()
				.find('.note-editor').remove()
				.end()[0].outerHTML)
			);
		
		});	
					
		//donload da página somente leitura sem os controles
		$('.btnReadOnly').on('click', function () {
			
			$(this).attr('href', 'data:text/html;charset=UTF-8,'
				//clona o html corrent removendo os controles de edição
				+encodeURIComponent($('.Formulario').clone()
				.find('.editMode, .container-empty').remove()
				.end()[0].outerHTML)
			);
		});	
		
		$(document).on("click", '.closeModal', function() {	
			$(this).parents('.modal').hide(); 
		});
		
		//adicionar campo
		$(document).on("click", '.AddCampo', function() {	
			//variavel q recebe o html da coluna clicada
			var NewCampo = $(this).parents('.newCampo').find('.card-body').html();
			$(NewCampo).appendTo('.modalCreate .note-editable');
			$(this).parents('.modal').hide(); 

		});	

		//adicionar campo texto
		$(document).on("click", '.btnInputText', function() {	
			var newItem = '<input class="form-input" type="TEXT" />';
			$(newItem).appendTo('.modalCreate .note-editable');	
		});
		
		//adicionar textarea
		$(document).on("click", '.btnTextArea', function() {	
			var newItem = '<textarea class="form-textarea" style="width:100%; height:200px"></textarea>';
			$(newItem).appendTo('.modalCreate .note-editable');	
		});
		
		//adicionar checkbox
		$(document).on("click", '.btnCheckBox', function() {
			$('.modalCheckBox, .bg-modal' ).show();
			$('.plusItem').unbind().on('click', function () {
				var titleItem = $(this).parents('.comboItem').find('.tituloCampo').val();
				var newItem = '<div class="col-md-3">\
			                    <input class="form-check-input" type="checkbox" />\
								<label>'+ titleItem +'</label></div>';
								
				$(newItem).appendTo('.modalCreate .note-editable');	
				$('.tituloCampo').val('');
			});
			
		});
		
		//adicionar radiobutton
		$(document).on("click", '.btnRadioButton', function() {
			$('.modalRadioButton, .bg-modal' ).show();
			$('.plusItem').unbind().on('click', function () {
				var nameGroup = $('.modalRadioButton .nomeGrupo').val();
				var titleItem = $(this).parents('.comboItem').find('.tituloCampo').val();
				var newItem = '<input type="radio" class="form-check-input" name='+ nameGroup +' value='+ titleItem + ' id='+ titleItem +' />\
							   <label class="labelRadio" for='+ titleItem +' >'+ titleItem +'</label>';
								
				$(newItem).appendTo('.modalCreate .note-editable');		
				$('.tituloCampo').val('');
			});
			
		});
		
		//adicionar inputFile
		$(document).on("click", '.btnInputFile', function() {
			var newItem = '<input type="file" id="" name="" accept="image/png, image/jpeg">';
			$(newItem).appendTo('.modalCreate .note-editable');	
		});
		
		//adicionar Campo DATA
		$(document).on("click", '.btnInputDate', function() {
			var newItem = '<input id="date" type="date">';
			$(newItem).appendTo('.modalCreate .note-editable');	
		});
				
		//adicionar options na combobox dinamicamente (Incompleto!)
		$('.btnAddCombo').unbind().on('click', function () {
			
			$('.modalCombo, .bg-modal' ).show();
			
			//cria uma combo vazia e insere na modal de criação de combobox
			newSelect = '<select class="newSelect"></select>';
			$('.modalCombo').prepend(newSelect);			
				

			//construindo o option com o valor inserido na combo
			/*$('.insertItem').unbind().on('click', function () {					
				var title = $(this).parents('.insertOption').find('.newOption').val();
				newTitle = '<option class="newTitle">'+ title + '</option>';		
				$(newTitle).appendTo('.newSelect');
			});*/
				

			//forma mais eficiente gerada pelo GPT
			$(document).on("click", '#addOptionsBtn', function() {
			
				// Create a prompt for the user to enter options
				var optionsText = prompt('Digite as opções separadas por vírgula:');
				if (optionsText != null && optionsText.trim() != '') {
				  // Split the user's input into an array of options
				  var optionsArray = optionsText.split(',');
				  // Get the select element
				  var select = $('.modalCombo .newSelect');
				  // Add each option to the select element
				  $.each(optionsArray, function(index, value) {
					// Trim the value to remove any leading or trailing whitespace
					value = value.trim();
					// Create a new option element and append it to the select element
					$('<option>').val(value).text(value).appendTo(select);
				  });
				}
			  });
			
			//adiciona a nova combo criada no modal de edição das colunas
			$('.AddCombo').unbind().on('click', function () {						
				$('.modalCombo').find('.newSelect').appendTo('.modalCreate .note-editable');
				$('.modalCombo, .bg-modal' ).hide();	
			});	
		});
		
		$(document).on("click", '#btnAddImage', function() {
			
		  $('#image-upload').click();
		  

		  $('#image-upload').change(function() {
			var file = this.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
			 $('<img style="max-width:100%" src="' + e.target.result + '">').appendTo('.modalCreate .note-editable');
			};
			reader.readAsDataURL(file);
		  });
		});
	});	


//alerta o fechamento de aba do navegador
window.addEventListener('beforeunload', function (e) {
	e.preventDefault();
	e.returnValue = '';
});