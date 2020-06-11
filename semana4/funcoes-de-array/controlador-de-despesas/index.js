const valor = document.getElementById("valor");
const tipo = document.getElementById("tipo");
const descricao = document.getElementById("descricao");

const filtroTipo = document.getElementById("filtro-tipo");
const filtroMinimo = document.getElementById("filtro-minimo");
const filtroMaximo = document.getElementById("filtro-maximo");

const listaDespesas = document.getElementById("lista-despesas");
const valorTotal = document.getElementById("valor-total");

let despesas;
let todasDespesas = [];

let cadastraDespesa = () => {
    despesas = {
        valor: Number(valor.value),
        tipo: tipo.value,
        descricao: descricao.value
    }
    
    if (despesas.valor === "" || despesas.descricao === "" || despesas.tipo === "") {
        alert("Você precisa preencher todos os campos!")
    } else {
        todasDespesas.push(despesas);
        valor.value = ""
        tipo.value = ""
        descricao.value = ""
        criaLista();
        calculaTotal();
    }
}

let limpaLista = () => {
    listaDespesas.innerHTML = "";
}

let filtra = () => {
    if (filtroTipo.value === "" || filtroMinimo.value === "" || filtroMaximo.value === "") {
        alert("Você precisa preencher todos os campos!")
    } else {
        limpaLista();

        let listaFiltrada = todasDespesas.filter((despesas, idx, arr) => {
            return (despesas.tipo === filtroTipo.value) && (despesas.valor >= Number(filtroMinimo.value)) || ((despesas.valor <= Number(filtroMaximo.value)))
        })

        listaFiltrada.forEach((despesas, index, array) => {
            criaLista();
        })
        
    }
}

let limpaFiltro = () => {
    filtroTipo.value = ""
    filtroMinimo.value = ""
    filtroMaximo.value = ""
}

let criaLista = () => {
    listaDespesas.innerHTML += `
    <div class="despesa">
        <p><strong>Valor: </strong>${despesas.valor}</p>
        <p><strong>Tipo: </strong>${despesas.tipo}</p>
        <p><strong>Descrição: </strong>${despesas.descricao}</p>
    </div>
    `
}

let calculaTotal = () => {
    let soma = 0;
    
    soma = todasDespesas.reduce((total, despesas) => {
        return total + despesas.valor;
    }, 0);

    valorTotal.innerHTML = "Valor total: "+ soma;
}

let colocaEmOrdem = () => {
    listaDespesas.innerHTML = ""

    todasDespesasOrdenada = todasDespesas.sort((a, b) => {
        return a.valor - b.valor
    })

    todasDespesasOrdenada.forEach((despesas) => {
        listaDespesas.innerHTML += `
        <div class="despesa">
            <p><strong>Valor: </strong>${despesas.valor}</p>
            <p><strong>Tipo: </strong>${despesas.tipo}</p>
            <p><strong>Descrição: </strong>${despesas.descricao}</p>
        </div>
        `
     })
}