// - Nome completo;
// - Tipo de jogo: IN indica internacional; e DO indica doméstico;
// - Etapa do jogo: SF indica semi-final; DT indica decisão de terceiro lugar; e FI indica final
// - Categoria: pode ser as opções 1, 2, 3 ou 4;
// - Quantidade de ingressos

// O seu sistema deve solicitar estas informações ao usuário, através do `prompt` . Além disso, ele deve imprimir tudo isso, junto com o valor de cada ingresso e o valor total que o usuário tem que pagar (ou seja, o valor unitário do ingresso multiplicado pela quantidade). Abaixo, há a tabela com os valores de cada ingresso e exemplos de execução do programa. Lembrando que o valor de jogos internacionais é o mesmo de jogos domésticos, mas seus preços devem ser dados em dólar (considerar a cotação de U$1,00 = R$4,10)

const nomeDoCliente = prompt("Qual é o seu nome completo?")
const tipoDeJogo = prompt("Qual é o tipo de jogo?")
const etapa = prompt("Qual é a etapa do jogo?")
const categoria = Number(prompt("Qual é a categoria cadeira?"))
const quantidade = Number(prompt("Quantos ingressos você quer?"))

let templateNota = `
    ---Dados da compra--- 
    Nome do cliente: ${nomeDoCliente} 
    Tipo do jogo: ${tipoDeJogo} 
    Etapa do jogo:  ${etapa}
    Categoria:  ${categoria} 
    Quantidade de Ingressos:  ${quantidade} ingressos 
    ---Valores---
`

if(nomeDoCliente === "" || tipoDeJogo === "" || etapa === "" || categoria === "" || quantidade === "") {
    alert("Você deve responder todas as perguntas. Atualize a página e responda novamente.")
} else if(nomeDoCliente.length < 6) {
    alert("Você deve escrever seu nome completo.")
} else if(tipoDeJogo !== "internacional" && tipoDeJogo !== "doméstico") {
    alert("Você deve escolher entre internacional ou doméstico")
} else if(etapa !== "semifinal" && etapa !== "terceiro lugar" && etapa !== "final") {
    alert("Você deve escolher entre semifinal, terceiro lugar e final.")
} else if(categoria > 4) {
    alert("Você deve escolher entre as categorias 1 e 4.")
} else if(etapa === "semifinal") {
    let valorDoJogo
    switch (categoria) {
        case 1:
            valorDoJogo = 1320
            break;
        case 2:
            valorDoJogo = 880
            break;
        case 3:
            valorDoJogo = 550
            break;
        case 4:
            valorDoJogo = 220
            break;
    }    

    if(tipoDeJogo === "internacional") {
        valorDoJogo = valorDoJogo * 4,1
        let valorTotal = valorDoJogo * quantidade
        alert(templateNota + ` Valor do ingresso:  U$ ${valorDoJogo}
            Valor total:  U$ ${valorTotal} `
        )
    } else {
        let valorTotal = valorDoJogo * quantidade
        alert(templateNota + ` Valor do ingresso:  R$ ${valorDoJogo}
            Valor total:  R$ ${valorTotal} `
        )
    }

} else if(etapa === "terceiro lugar") {
    let valorDoJogo
    switch (categoria) {
        case 1:
            valorDoJogo = 660
            break;
        case 2:
            valorDoJogo = 440
            break;
        case 3:
            valorDoJogo = 330
            break;
        case 4:
            valorDoJogo = 170
            break;
    }
    
    if(tipoDeJogo === "internacional") {
        valorDoJogo = valorDoJogo * 4,1
        let valorTotal = valorDoJogo * quantidade
        alert(templateNota + ` Valor do ingresso:  U$ ${valorDoJogo}
            Valor total:  U$ ${valorTotal} `
        )
    } else {
        let valorTotal = valorDoJogo * quantidade
        alert(templateNota + ` Valor do ingresso:  R$ ${valorDoJogo}
            Valor total:  R$ ${valorTotal} `
        )
    }
    
} else if(etapa === "final") {
    let valorDoJogo
    switch (categoria) {
        case 1:
            valorDoJogo = 1980
            break;
        case 2:
            valorDoJogo = 1320
            break;
        case 3:
            valorDoJogo = 880
            break;
        case 4:
            valorDoJogo = 330
            break;
    }
    
    if(tipoDeJogo === "internacional") {
        valorDoJogo = valorDoJogo * 4,1
        let valorTotal = valorDoJogo * quantidade
        alert(templateNota + ` Valor do ingresso:  U$ ${valorDoJogo}
            Valor total:  U$ ${valorTotal} `
        )
    } else {
        let valorTotal = valorDoJogo * quantidade
        alert(templateNota + ` Valor do ingresso:  R$ ${valorDoJogo}
            Valor total:  R$ ${valorTotal} `
        )
    }
}
