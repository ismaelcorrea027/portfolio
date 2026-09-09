document.addEventListener("DOMContentLoaded", function () {
  const selectMes = document.getElementById("selectMes");
  const selectAno = document.getElementById("selectAno");
  const calendarBody = document.getElementById("calendarBody");
  const agendamentosDoDia = document.getElementById("agendamentosDoDia");

  // ⚠️ Proteção contra ausência dos elementos (ex: desktop)
  if (!selectMes || !selectAno || !calendarBody || !agendamentosDoDia) return;

  const hoje = new Date();

  // Preenche os anos no select
  for (let a = 2020; a <= 2030; a++) {
    const opt = document.createElement("option");
    opt.value = a;
    opt.textContent = a;
    if (a === hoje.getFullYear()) opt.selected = true;
    selectAno.appendChild(opt);
  }

  selectMes.value = hoje.getMonth();

  function criarCalendario(mes, ano) {
    calendarBody.innerHTML = "";

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    let dataAtual = 1;

    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if (i === 0 && j < primeiroDia) {
          cell.textContent = "";
        } else if (dataAtual > diasNoMes) {
          break;
        } else {
          const btn = document.createElement("button");
          btn.className = "btn btn-sm btn-outline-success rounded-pill w-100";
          btn.textContent = dataAtual;
          btn.addEventListener("click", () => renderAgendamentos(dataAtual, mes, ano));
          cell.appendChild(btn);
          dataAtual++;
        }

        row.appendChild(cell);
      }

      calendarBody.appendChild(row);
    }
  }

  function renderAgendamentos(dia, mes, ano) {
    agendamentosDoDia.innerHTML = "";

    const mock = [
      {
        empresa: "Unimed Teste",
        hora: "10:30",
        volumes: 8,
        status: "Confirmado"
      },
      {
        empresa: "Fornecedor XYZ",
        hora: "15:00",
        volumes: 3,
        status: "Pendente"
      }
    ];

    mock.forEach((ag) => {
      const card = document.createElement("div");
      card.className = "card shadow-sm mb-3 border-0 agenda-card rounded-4";
      card.innerHTML = `
        <div class="card-header">
          <h6 class="mb-1"><i class="bi bi-building"></i> ${ag.empresa}</h6>
          <p class="mb-1"><i class="bi bi-clock"></i> ${ag.hora}</p>
        </div>
        <div class="card-body">
          <p class="mb-1"><i class="bi bi-info-circle"></i> Status: <strong>${ag.status}</strong></p>
          <p class="mb-2"><i class="bi bi-box"></i> Volumes: ${ag.volumes}</p>
          <div class="dropdown text-end">
            <button class="btn btn-light rounded-circle shadow-sm" type="button" data-bs-toggle="dropdown">
              <i class="bi bi-three-dots"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Visualizar</a></li>
              <li><a class="dropdown-item" href="#">Editar</a></li>
              <li><a class="dropdown-item text-danger" href="#">Cancelar</a></li>
            </ul>
          </div>
        </div>
      `;
      agendamentosDoDia.appendChild(card);
    });
  }

  // Eventos de mudança dos selects
  selectMes.addEventListener("change", () =>
    criarCalendario(+selectMes.value, +selectAno.value)
  );
  selectAno.addEventListener("change", () =>
    criarCalendario(+selectMes.value, +selectAno.value)
  );

  // Renderiza calendário inicial
  criarCalendario(hoje.getMonth(), hoje.getFullYear());
});
