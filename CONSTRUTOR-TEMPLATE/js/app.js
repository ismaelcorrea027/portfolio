/* Construtor de templates — interface e eventos centralizados */
(function ($) {
  'use strict';

  var dirty = false;
  var editingColumn = null;
  var selectedColumn = null;
  var pendingDelete = null;
  var pendingGroupRow = null;

  var layouts = {
    '1': [12], '1/4': [3, 9], '2': [6, 6],
    '3/4': [9, 3], '3': [4, 4, 4], '4': [3, 3, 3, 3]
  };
  var rowControls = '<div class="editMode action-group create-group"><button type="button" title="Excluir linha" class="btnAction btnDelete"><span class="material-symbols-outlined">delete</span></button><button type="button" title="Duplicar linha" class="btnAction btnClone"><span class="material-symbols-outlined">content_copy</span></button><select title="Colunas da nova linha" class="field-column"><option>1</option><option>1/4</option><option>2</option><option>3/4</option><option>3</option><option>4</option></select><button type="button" title="Adicionar linha" class="btnAction btnCreate"><span class="material-symbols-outlined">add</span></button></div>';
  var groupControls = '<div class="editMode action-group createFieldset"><button type="button" title="Excluir grupo" class="btnAction btnDeleteGrupo"><span class="material-symbols-outlined">delete</span></button><button type="button" title="Renomear grupo" class="btnAction btnEditarGrupo"><span class="material-symbols-outlined">edit</span></button><button type="button" title="Criar grupo" class="btnAction btnCreateGrupo"><span class="material-symbols-outlined">add</span></button></div>';
  var editControl = '<button type="button" class="editMode btnCreateEdit" aria-label="Selecionar e editar coluna"><span class="area"><span class="empty-action"><span class="material-symbols-outlined">add</span><b>Adicionar conteúdo</b></span><span class="filled-action"><span class="material-symbols-outlined">edit</span><b>Editar conteúdo</b></span></span></button>';

  function makeRow(type) {
    var row = $('<div class="row new-row"></div>');
    (layouts[type] || layouts['1']).forEach(function (size) {
      row.append('<div class="cl col-md-' + size + '"><div class="container-empty container-cl"></div>' + editControl + '</div>');
    });
    return row.append(rowControls);
  }
  function setDirty() { dirty = true; updateActions(); }
  function hasContent() { return $('.full-template .container-cl').filter(function(){ return $.trim($(this).text()) || $(this).children().length; }).length > 0; }
  function updateActions() { $('.btnPreview,.btnReadOnly').toggle(hasContent()); }
  function columnName(column) {
    var row = column.closest('.new-row');
    return 'Linha ' + (row.index() + 1) + ' · Coluna ' + (column.closest('.cl').index() + 1);
  }
  function selectColumn(column) {
    selectedColumn = column;
    editingColumn = column.find('.container-cl');
    $('.cl').removeClass('is-selected');
    column.addClass('is-selected');
    editorHtml(editingColumn.html());
    $('.blockControl').hide();
    $('.btnSalvar').prop('disabled', false);
    $('.selection-status').addClass('has-selection').find('strong').text(columnName(column));
    $('.selection-status small').text('Adicione ou edite componentes e aplique as alterações.');
    if (window.innerWidth < 981) document.querySelector('.Componentes').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function clearSelection() {
    editingColumn = selectedColumn = null;
    $('.cl').removeClass('is-selected');
    editorHtml('');
    $('.blockControl').css('display','flex');
    $('.btnSalvar').prop('disabled', true);
    $('.selection-status').removeClass('has-selection').find('strong').text('Nenhuma coluna selecionada');
    $('.selection-status small').text('Clique em uma coluna do template para começar.');
  }
  function toast(message) {
    var item = $('.app-toast');
    item.find('span').text(message); item.addClass('is-visible');
    window.clearTimeout(item.data('timer'));
    item.data('timer', window.setTimeout(function(){ item.removeClass('is-visible'); }, 2600));
  }
  function showModal(selector) { $('.bg-modal').addClass('is-open'); $(selector).addClass('is-open'); }
  function closeModals() { $('.modal').removeClass('is-open'); $('.bg-modal').removeClass('is-open'); $('.currentDelete').removeClass('currentDelete'); pendingDelete = null; }
  function editorHtml(value) { $('.summernote').summernote('code', value || '<p><br></p>'); }
  function applyAppearance(showFeedback) {
    var background = $('#color-picker').val() || '#ffffff';
    var border = $('#color-picker2').val() || '#dbe6f5';
    var color = $('#color-picker3').val() || '#666666';
    var size = $('#font-size').val() || '14px';
    var family = $('#font-family').val() || 'Arial';
    var title = $.trim($('#titleForm').val()) || 'Título do Formulário';
    var template = $('.Formulario');

    template.css({'background-color':background,color:color,'font-family':family,'font-size':size});
    template.find('.full-template').css('background-color',background);
    template.find('fieldset').css('border-color',border);
    template.find('.titleForm').text(title).css({color:color,'font-family':family,'font-size':size});
    template.find('.container-cl, .container-cl p, .container-cl span, .container-cl label, .container-cl input, .container-cl textarea, .container-cl select, legend').css({color:color,'font-family':family,'font-size':size});

    setDirty();
    if (showFeedback) toast('Aparência do template atualizada');
  }
  function downloadHtml() {
    var clone = $('.Formulario').clone();
    clone.find('.editMode,.container-empty').remove();
    clone.find('[style]').each(function(){ if (!$(this).attr('style')) $(this).removeAttr('style'); });
    var title = $('.titleForm').text() || 'Template';
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + $('<div>').text(title).html() + '</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet"></head><body>' + clone[0].outerHTML + '</body></html>';
  }

  $(function () {
    $('.summernote').summernote({height:190,placeholder:'Digite um texto ou adicione um campo…'});
    ['#color-picker','#color-picker2','#color-picker3'].forEach(function(id){ $(id).spectrum({type:'component'}); });
    var first = $('<fieldset></fieldset>').append(makeRow('1')).append(groupControls);
    $('.full-template').empty().append(first);
    $('.btnSalvar').prop('disabled', true);
    $('#titleForm').val($('.titleForm').text());
    updateActions();

    $('#titleForm').on('input', function(){ applyAppearance(false); });
    $('#font-family,#font-size').on('change', function(){ applyAppearance(true); });
    $('#color-picker,#color-picker2,#color-picker3').on('change change.spectrum', function(){ applyAppearance(true); });
    $(document).on('click','.btnCreate',function(){ makeRow($(this).siblings('.field-column').val()).insertAfter($(this).closest('.new-row')); setDirty(); toast('Nova linha adicionada'); });
    $(document).on('click','.btnClone',function(){ $(this).closest('.new-row').clone().removeClass('is-selected').insertAfter($(this).closest('.new-row')); setDirty(); toast('Linha duplicada'); });
    $(document).on('click','.btnCreateEdit',function(){ selectColumn($(this).closest('.cl')); });
    $('.btnSalvar').on('click',function(){ if(!editingColumn)return; var html=$('.summernote').summernote('code'); editingColumn.html(html); var filled=$.trim(editingColumn.text()) || editingColumn.children().length; editingColumn.toggleClass('container-empty',!filled); editingColumn.closest('.cl').toggleClass('has-content',!!filled); applyAppearance(false);setDirty(); toast('Conteúdo aplicado em ' + columnName(selectedColumn)); });
    $('.cancelCreate').on('click',clearSelection);
    $(document).on('click','.btnDelete,.btnDeleteGrupo',function(){ var target=$(this).hasClass('btnDeleteGrupo')?$(this).closest('fieldset'):$(this).closest('.new-row'); if(target.find('.container-cl').filter(function(){return $.trim($(this).text())||$(this).children().length;}).length){pendingDelete=target;target.addClass('currentDelete');showModal('.modalDelete');}else{target.remove();setDirty();} });
    $('.btnModalDeleteRow').on('click',function(){ if(pendingDelete)pendingDelete.remove();closeModals();clearSelection();setDirty();toast('Item excluído'); });
    $('.cancelDelete,.closeModal,.bg-modal').on('click',closeModals);
    $(document).on('click','.btnCreateGrupo',function(){ pendingGroupRow=makeRow($(this).closest('fieldset').find('.field-column').first().val()||'1'); $('.tituloGrupo').val(''); showModal('.modalNomeGrupo'); });
    $(document).on('click','.btnEditarGrupo',function(){ pendingGroupRow=$(this).closest('fieldset'); $('.tituloGrupo').val(pendingGroupRow.find('> legend').text()); showModal('.modalNomeGrupo'); pendingGroupRow.data('editing',true); });
    $('.saveGrupo').on('click',function(){ var name=$.trim($('.tituloGrupo').val())||'Novo grupo'; if(pendingGroupRow.data('editing')){pendingGroupRow.find('> legend').text(name);pendingGroupRow.removeData('editing');}else{var group=$('<fieldset><legend></legend></fieldset>');group.find('legend').text(name);group.append(pendingGroupRow,groupControls);$('.full-template').append(group);}pendingGroupRow=null;closeModals();setDirty();toast('Grupo salvo'); });
    $('.btnPreview').on('click',function(){ var active=$('body').toggleClass('preview-mode').hasClass('preview-mode'); $('.Formulario .editMode').toggleClass('no-visible',active); $(this).attr('aria-pressed',active).find('label').text(active?'Voltar à edição':'Visualizar'); });
    $('.btnReadOnly').on('click',function(){ var blob=new Blob([downloadHtml()],{type:'text/html;charset=utf-8'}); $(this).attr('href',URL.createObjectURL(blob)); dirty=false;toast('HTML preparado para download'); });
    $('.btnInputText').on('click',function(){ $('.summernote').summernote('pasteHTML','<input class="form-control" type="text" placeholder="Campo de texto">'); });
    $('.btnTextArea').on('click',function(){ $('.summernote').summernote('pasteHTML','<textarea class="form-control" rows="4" placeholder="Texto"></textarea>'); });
    $('.btnInputDate').on('click',function(){ $('.summernote').summernote('pasteHTML','<input class="form-control" type="date">'); });
    $('.btnInputFile').on('click',function(){ $('.summernote').summernote('pasteHTML','<input class="form-control" type="file">'); });
    $('.btnCheckBox').on('click',function(){ showModal('.modalCheckBox:first'); });
    $('.btnRadioButton').on('click',function(){ showModal('.modalRadioButton'); });
    $('.modalCheckBox:first .plusItem').on('click',function(){ var label=$.trim($('.modalCheckBox:first .tituloCampo').val())||'Opção';$('.summernote').summernote('pasteHTML','<label><input type="checkbox"> '+$('<div>').text(label).html()+'</label>');closeModals(); });
    $('.modalRadioButton .plusItem').on('click',function(){ var label=$.trim($('.modalRadioButton .tituloCampo').val())||'Opção',name=$.trim($('.modalRadioButton .nomeGrupo').val())||'grupo';$('.summernote').summernote('pasteHTML','<label><input type="radio" name="'+$('<div>').text(name).html()+'"> '+$('<div>').text(label).html()+'</label>');closeModals(); });
    $('.btnAddCombo').on('click',function(){ $('.modalCombo .newSelect').remove();$('.modalCombo').prepend('<select class="newSelect form-select"></select>');showModal('.modalCombo'); });
    $('#addOptionsBtn').on('click',function(){ var text=window.prompt('Digite as opções separadas por vírgula:');if(text)text.split(',').forEach(function(v){v=$.trim(v);if(v)$('<option>').text(v).val(v).appendTo('.modalCombo .newSelect');}); });
    $('.AddCombo').on('click',function(){ var select=$('.modalCombo .newSelect').clone();if(select.children().length)$('.summernote').summernote('pasteHTML',select[0].outerHTML);closeModals(); });
    $('#btnAddImage').on('click',function(){ $('#image-upload:first').trigger('click'); });
    $('#image-upload:first').on('change',function(){ var file=this.files[0];if(!file)return;var reader=new FileReader();reader.onload=function(e){$('.summernote').summernote('pasteHTML','<img alt="Imagem adicionada" style="max-width:100%" src="'+e.target.result+'">');};reader.readAsDataURL(file);this.value=''; });
    $(document).on('keydown','.btnCreateEdit',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();selectColumn($(this).closest('.cl'));} });
    $(document).on('keydown',function(e){ if(e.key==='Escape'){closeModals();if(selectedColumn)clearSelection();} if((e.ctrlKey||e.metaKey)&&e.key==='Enter'&&editingColumn){e.preventDefault();$('.btnSalvar').trigger('click');} });
    window.addEventListener('beforeunload',function(e){if(!dirty)return;e.preventDefault();e.returnValue='';});
  });
}(jQuery));
