const taskInput = document.getElementById("task-input");
const seletor = document.getElementById("dia-da-semana");
const horarios = document.getElementById("horarios");
const tarefas = document.getElementsByClassName("tarefa");

let mostrarHorarios = () => {
    for (i = 0; i < 25; i++) {
        horarios.innerHTML += `<option class="seletor-hora" value=${i}>${i}h</option>`
    }
}

let adicionarTarefa = () => {
    let tarefa = taskInput.value;

    const seletorDia = seletor.value;
    const dia = document.getElementById(seletorDia);
    
    const horario = horarios.value;

    if (tarefa === "" || seletorDia === "" || horario === "") {
        alert("Você precisa digitar uma tarefa e selecionar o dia e o horário!")
    } else {
        dia.innerHTML += `<li class="tarefa" onclick="riscarTarefa()"><strong>${horario}h:</strong> ${tarefa}</li>`
    }
    
    taskInput.value = "";
    seletor.value = "";
    horarios.value = "";
}

let riscarTarefa = () => {
    event.target.classList.add('line-through');
}

let apagarTarefas = () => {
    for (i = 0; i < tarefas.length; i++) {
        console.log(tarefas[i])
        tarefas[i].innerHTML = ""
    }

    taskInput.value = "";
    seletor.value = "";
    horarios.value = "";
}