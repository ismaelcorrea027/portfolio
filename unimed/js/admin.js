document.addEventListener("DOMContentLoaded", () => {

  // --- Aplicar estilo aos selects de status ---
  function atualizarEstiloStatus(select) {
    select.style.backgroundColor = "";
    select.style.color = "";
    select.style.borderLeft = "";

    const status = select.value.toLowerCase();
    let cor = "";

    if (status === "pendente") cor = "rgb(175 135 14)";
    else if (status === "confirmado") cor = "rgb(96, 134, 116)";
    else if (status === "cancelado" || status === "rejeitado") cor = "rgb(178, 82, 92)";

    if (cor) {
      select.style.borderLeft = `4px solid ${cor}`;
      select.style.color = cor;
    }
  }

  // --- Abrir modal de edição de agendamento ---
  function abrirModalEdicao(origem) {
    let empresa, data, hora, status, volumes;

    if (origem.matches("tr")) {
      const cells = origem.querySelectorAll("td");
      empresa = cells[0]?.textContent.trim();
      data = cells[1]?.textContent.trim().split("/").reverse().join("-");
      hora = cells[2]?.textContent.trim();
      status = cells[3]?.textContent.trim();
      volumes = cells[4]?.textContent.trim();
    } else if (origem.classList.contains("card-agendamento")) {
      empresa = origem.querySelector(".ag-empresa")?.textContent.trim();
      data = origem.querySelector(".ag-data")?.textContent.trim().split("/").reverse().join("-");
      hora = origem.querySelector(".ag-hora")?.textContent.trim();
      status = origem.querySelector(".ag-status")?.textContent.trim();
      volumes = origem.querySelector(".ag-volumes")?.textContent.trim();
    }

    document.getElementById("modalEmpresa").value = empresa || "";
    document.getElementById("modalData").value = data || "";
    document.getElementById("modalHora").value = hora || "";
    document.getElementById("modalStatus").value = status || "";
    document.getElementById("modalVolumes").value = volumes || "";

    const modal = new bootstrap.Modal(document.getElementById("modalEdicaoAgendamento"));
    modal.show();
  }

  // --- Abrir modal de edição de usuário ---
  function abrirModalUsuario(origem) {
    let nome, email, tipo;

    if (origem.matches("tr")) {
      const cells = origem.querySelectorAll("td");
      nome = cells[0]?.textContent.trim();
      email = cells[1]?.textContent.trim();
      tipo = cells[2]?.textContent.trim().toLowerCase();
    } else if (origem.classList.contains("card-usuario")) {
      nome = origem.querySelector(".us-nome")?.textContent.trim();
      email = origem.querySelector(".us-email")?.textContent.trim();
      tipo = origem.querySelector(".us-tipo")?.textContent.trim().toLowerCase();
    }

    document.getElementById("modalNomeUsuario").value = nome || "";
    document.getElementById("modalEmailUsuario").value = email || "";
    document.getElementById("modalTipoUsuario").value = tipo || "";

    atualizarVisibilidadeFornecedor();

    const modal = new bootstrap.Modal(document.getElementById("modalEdicaoUsuario"));
    modal.show();
  }

  // --- Visibilidade do bloco fornecedor ---
  const tipoSelect = document.getElementById("modalTipoUsuario");
  const blocoFornecedor = document.getElementById("dadosFornecedor");

  function atualizarVisibilidadeFornecedor() {
    if (tipoSelect?.value === "fornecedor") {
      blocoFornecedor.style.display = "block";
    } else {
      blocoFornecedor.style.display = "none";
      document.getElementById("modalEmpresaFornecedor").value = "";
      document.getElementById("modalCNPJFornecedor").value = "";
      document.getElementById("modalTelefoneFornecedor").value = "";
    }
  }

  tipoSelect?.addEventListener("change", atualizarVisibilidadeFornecedor);
  document.getElementById("modalEdicaoUsuario")?.addEventListener("show.bs.modal", atualizarVisibilidadeFornecedor);

  // --- Tabela de agendamentos ---
  const tabelaAgendamentos = document.getElementById("tabelaAgendamentos");
  if (tabelaAgendamentos) {
  // Atualiza estilo dos selects de status
  tabelaAgendamentos.querySelectorAll(".status-select").forEach(select => {
    atualizarEstiloStatus(select);
    select.addEventListener("change", function () {
      atualizarEstiloStatus(this);
    });
  });

  // Clique no botão de editar da tabela
  tabelaAgendamentos.querySelectorAll("button.btn-success").forEach(botao => {
    botao.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const row = this.closest("tr");
      if (row) abrirModalEdicao(row);
    });
  });

  // Filtros
  document.getElementById("filtroData")?.addEventListener("change", filtrarAgendamentos);
  document.getElementById("filtroEmpresa")?.addEventListener("input", filtrarAgendamentos);
  document.getElementById("filtroStatus")?.addEventListener("change", filtrarAgendamentos);

  // Chamada inicial
  filtrarAgendamentos();
}


  // --- Botões dos cards de agendamento ---
  document.querySelectorAll(".card-agendamento .btn-editar-agendamento").forEach(botao => {
    botao.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const card = this.closest(".card-agendamento");
      if (card) abrirModalEdicao(card);
    });
  });

  // --- Tabela de usuários ---
  const tabelaUsuarios = document.getElementById("tabelaUsuarios");
  if (tabelaUsuarios) {
  // Clique no botão de editar dentro da tabela de usuários
  tabelaUsuarios.querySelectorAll("button.btn-editar-usuario").forEach(botao => {
    botao.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const row = this.closest("tr");
      if (row) abrirModalUsuario(row);
    });
  });
}

// --- Clique nos botões de edição dos cards de usuário ---
document.querySelectorAll(".card-usuario .btn-editar-usuario").forEach(botao => {
  botao.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const card = this.closest(".card-usuario");
    if (card) abrirModalUsuario(card);
  });
});


  // --- Botão "Novo Agendamento" ---
  document.getElementById("addAgendamento")?.addEventListener("click", () => {
    document.getElementById("modalEmpresa").value = "";
    document.getElementById("modalData").value = "";
    document.getElementById("modalHora").value = "";
    document.getElementById("modalStatus").value = "";
    document.getElementById("modalVolumes").value = "";

    const modal = new bootstrap.Modal(document.getElementById("modalEdicaoAgendamento"));
    modal.show();
  });

  // --- Botão "Novo Usuário" ---
  document.getElementById("addUsuario")?.addEventListener("click", () => {
    document.getElementById("modalNomeUsuario").value = "";
    document.getElementById("modalEmailUsuario").value = "";
    document.getElementById("modalTipoUsuario").value = "";
    document.getElementById("modalEmpresaFornecedor").value = "";
    document.getElementById("modalCNPJFornecedor").value = "";
    document.getElementById("modalTelefoneFornecedor").value = "";

    if (blocoFornecedor) blocoFornecedor.style.display = "none";

    const modal = new bootstrap.Modal(document.getElementById("modalEdicaoUsuario"));
    modal.show();
  });

  // --- Filtro de agendamentos ---
  function filtrarAgendamentos() {
    const dataFiltro = document.getElementById("filtroData").value;
    const empresaFiltro = document.getElementById("filtroEmpresa").value.toLowerCase();
    const statusFiltro = document.getElementById("filtroStatus").value.toLowerCase();

    document.querySelectorAll("#tabelaAgendamentos tbody tr").forEach(row => {
      const empresa = row.cells[0].textContent.toLowerCase();
      const data = row.cells[1].textContent;
      const status = row.cells[3].textContent.toLowerCase();

      const dataOK = !dataFiltro || data === new Date(dataFiltro).toLocaleDateString("pt-BR");
      const empresaOK = !empresaFiltro || empresa.includes(empresaFiltro);
      const statusOK = !statusFiltro || statusFiltro === "todos" || status.includes(statusFiltro);

      row.style.display = dataOK && empresaOK && statusOK ? "" : "none";
    });
  }

});
