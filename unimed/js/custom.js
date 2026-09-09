document.addEventListener("DOMContentLoaded", function () {
    // Inicializar Datepicker com jQuery
    $('#dataPicker').datepicker({
      autoHide: true,
      format: 'dd/mm/yyyy'
    });

    // Avançar para aba de agendamento
    document.getElementById("avancarParaAgendamento").addEventListener("click", function () {
      const tabTrigger = new bootstrap.Tab(document.querySelector('#agenda-tab'));
      tabTrigger.show();
    });

    // Botão novo agendamento
    document.getElementById("novoAgendamentoBtn").addEventListener("click", function () {
      const tabTrigger = new bootstrap.Tab(document.querySelector('#form-tab'));
      tabTrigger.show();
    });

    // Adicionar novo campo CHAVE NF-e
    document.getElementById("addNfeBtn").addEventListener("click", function () {
      const container = document.getElementById("nfeContainer");
      const div = document.createElement("div");
      div.className = "input-group mb-2";
      div.innerHTML = `
        <input type="text" class="form-control" name="nfe[]">
        <button class="btn btn-outline-danger remove-nfe" type="button">–</button>
      `;
      container.appendChild(div);
    });

    // Remover campo CHAVE NF-e
    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.contains("remove-nfe")) {
        e.target.parentElement.remove();
      }
    });

    // Exibir horários ao selecionar uma data
    $('#dataPicker').on('changeDate', function () {
      const horariosDiv = document.getElementById("horarios");
      const listaHorarios = document.getElementById("listaHorarios");
      horariosDiv.style.display = "block";
      listaHorarios.innerHTML = "";

      const horarios = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
      horarios.forEach(h => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary";
        btn.textContent = h;
        btn.type = "button";
        btn.addEventListener("click", () => {
          document.querySelectorAll("#listaHorarios button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        });
        listaHorarios.appendChild(btn);
      });
    });

    // Enviar solicitação e mostrar aba de Meus Agendamentos
    document.getElementById("enviarSolicitacao").addEventListener("click", function () {
      alert("Solicitação enviada com sucesso!");
      const tabTrigger = new bootstrap.Tab(document.querySelector('#meus-tab'));
      tabTrigger.show();
    });
  });
  
  //calendario 
  
  document.addEventListener('DOMContentLoaded', function () {
  const calendarBody = document.getElementById('calendarBody');
  const calendarMonthYear = document.getElementById('calendarMonthYear');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const timeSlotsDiv = document.getElementById('timeSlots');
  const slotContainer = document.getElementById('slotContainer');
  const selectedDateDisplay = document.getElementById('selectedDateDisplay');

  let currentDate = new Date();

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    calendarMonthYear.textContent = `${monthNames[month]} ${year}`;
    calendarBody.innerHTML = '';

    let row = document.createElement('tr');

    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement('td');
      row.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement('td');
      cell.textContent = day;
      cell.classList.add('calendar-day');
      cell.style.cursor = 'pointer';

      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        cell.classList.add('bg-primary', 'text-white');
        cell.style.fontWeight = 'bold';
        cell.style.borderRadius = '8px';
      }

      cell.addEventListener('click', function () {
        document.querySelectorAll('.calendar-day').forEach(d =>
          d.classList.remove('bg-success', 'text-white')
        );
        this.classList.add('bg-success', 'text-white');

        const selectedDate = new Date(year, month, day);
        selectedDateDisplay.textContent = selectedDate.toLocaleDateString('pt-BR');

        showTimeSlots(selectedDate);
      });

      row.appendChild(cell);

      if ((startDay + day) % 7 === 0 || day === totalDays) {
        calendarBody.appendChild(row);
        row = document.createElement('tr');
      }
    }
  }

  function showTimeSlots(date) {
    timeSlotsDiv.classList.remove('d-none');
    slotContainer.innerHTML = '';

    // Horários fixos (pode personalizar)
    const hours = [
      '08:00', '09:00', '10:00', '11:00',
      '13:00', '14:00', '15:00', '16:00'
    ];

    hours.forEach(hour => {
      const slot = document.createElement('button');
      slot.classList.add('btn', 'btn-outline-secondary', 'slot-btn');
      slot.textContent = hour;

      slot.addEventListener('click', function () {
        document.querySelectorAll('.slot-btn').forEach(btn =>
          btn.classList.remove('active', 'btn-success')
        );
        slot.classList.add('active', 'btn-success');
        console.log(`Horário selecionado: ${hour}`);
      });

      slotContainer.appendChild(slot);
    });
  }

  prevMonthBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
    timeSlotsDiv.classList.add('d-none');
  });

  nextMonthBtn.addEventListener('click', function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
    timeSlotsDiv.classList.add('d-none');
  });

  renderCalendar(currentDate);
});
