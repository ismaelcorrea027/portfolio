# Construtor de Templates

Aplicação visual em JavaScript, jQuery e Bootstrap para construir e diagramar templates HTML diretamente no navegador.

## Recursos

- linhas responsivas com 1 a 4 colunas;
- edição de conteúdo rico e inclusão de campos de formulário;
- criação, renomeação, duplicação e exclusão de grupos e linhas;
- personalização de tipografia, cores e título;
- modo de visualização sem os controles do editor;
- exportação do resultado em um arquivo HTML independente.

## Decisões de experiência

O editor usa um fluxo de seleção contextual: a coluna ativa permanece destacada enquanto o painel lateral mostra o conteúdo correspondente. Ações que precisam de contexto adicional usam diálogos; a edição principal permanece ao lado do canvas no desktop para preservar a visualização do resultado. Em telas menores, painel e canvas passam a ser empilhados.

O JavaScript da interface está centralizado em `js/app.js`, com delegação de eventos para os elementos criados dinamicamente, estados explícitos de seleção e alterações pendentes, feedback por mensagens não bloqueantes e suporte básico a teclado (`Esc` para cancelar e `Ctrl/Cmd + Enter` para aplicar).

Abra `index.html` em um navegador com acesso à internet para carregar as dependências de edição utilizadas pelo projeto.
