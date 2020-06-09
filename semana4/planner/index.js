const taskInput = document.getElementById("task-input");
const seletor = document.getElementById("dia-da-semana");
const horarios = document.getElementById("horarios");
const tarefas = document.getElementsByClassName("tarefa");

const diasDaSemana = document.getElementsByTagName("ul");
for (i = 0; i < diasDaSemana.length; i++) {
    for (j = 0; j < 25; j++) {
        diasDaSemana[i].innerHTML += `<li class="tarefa" id="${diasDaSemana[i].id}-hora-${j}"><strong>${j}h: </strong></li>`
    }
}

for (i = 0; i < 25; i++) {
    horarios.innerHTML += `<option class="seletor-hora" value=hora-${i}>${i}h</option>`
}

let adicionarTarefa = () => {
    let tarefa = taskInput.value;

    const seletorDia = seletor.value;
    const seletorHorario = horarios.value;
    
    const diasHorario = seletorDia + '-' + seletorHorario;
    const horario = document.getElementById(diasHorario)

    if (tarefa === "" || seletorDia === "" || horario === "") {
        alert("Você precisa digitar uma tarefa e selecionar o dia e o horário!")
    } else {
        horario.innerHTML += `${tarefa}<br>`
    }
    
    taskInput.value = "";
    seletor.value = "";
    horarios.value = "";
}

let riscarTarefa = () => {
    event.target.classList.add('line-through');
}

let apagarTarefas = () => {
    
    for (i = 0; i < diasDaSemana.length; i++) {
        diasDaSemana[i].innerHTML = ""
    }
    
    for (i = 0; i < diasDaSemana.length; i++) {
        for (j = 0; j < 25; j++) {
            diasDaSemana[i].innerHTML += `<li class="tarefa" id="${diasDaSemana[i].id}-hora-${j}"><strong>${j}h: </strong></li>`
        }
    }

    taskInput.value = "";
    seletor.value = "";
    horarios.value = "";
}