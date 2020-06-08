// **Exercícios de interpretação de código**

// EXERCÍCIO 1

// Leia o código abaixo:

// const minhaFuncao = (quantidade) => {
// 	const array = []
// 	for(let i = 0; i < quantidade; i+=2) {
//             // 0
//             // 0 2 4
//             // 0 2 4 6
//             for(let j = 0; j < i; j++) {
//                 // 0, 1
//                 // 0, 1, 2, 3
//                 // 0, 1, 2, 3, 4, 5
// 				array.push(j)
// 			}
// 	}
// 	return array
// }

// RESPOSTAS

// a. Indique qual será o resultado da função caso ela seja chamada como `minhaFuncao(2)`
// retornará um array vazio, pois i = 0 e j = 0, logo j não é < que i.

// b. Indique qual será o resultado da função caso ela seja chamada como `minhaFuncao(5)`
// retornará [0, 1, 0, 1, 2, 3]

// c. Indique qual será o resultado da função caso ela seja chamada como `minhaFuncao(8)`
// retornará [0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 4, 5]


// EXERCÍCIO 2

// Leia o código abaixo:

// let arrayDeNomes = ["Darvas", "Goli", "João", "Paulinha", "Soter"];

// const funcao = (lista, nome) => {
//   for (let i = 0; i < lista.length; i++) {
//     if (lista[i] === nome) {
//       return i;
//     }
//   }
// };

// console.log(funcao(arrayDeNomes, "Darvas"));
// console.log(funcao(arrayDeNomes, "João"));
// console.log(funcao(arrayDeNomes, "Paula"));

// REPOSTAS

// a. Explicite quais são as saídas impressas no console
// 0
// index.js:45 2
// index.js:46 undefined
// A função retorna o índice em que aparece o elemento no array, caso ele seja igual à variável nome. Como Paula não está no array, não há como identificar um índice (undefined)

// b. O código funcionaria se a `lista` fosse um array de números (ao invés de um array de `string`)  e o `nome` fosse um número, ao se chamar a função? Justifique sua resposta.
// Sim, pois ambos seriam Number, logo, são comparáveis (podem ser iguais)

// EXERCÍCIO 3

// O código abaixo mostra uma função que recebe um array e devolve outro array. Explique rapidamente o que ela faz e sugira um nome melhor para ela!

// function somaEmultiplicacao(array) {
//   let resultadoA = 0;
//   let resultadoB = 1;
//   let arrayFinal = [];

//   for (let x of array) {
//     resultadoA += x;
//     resultadoB *= x;
//   }

//   arrayFinal.push(resultadoA);
//   arrayFinal.push(resultadoB);
//   return arrayFinal;
// }

// RESPOSTA

// O resultadoA soma os elementos do array, enquando o resultadoB multiplica os elementos. A função gera um novo array com os valores da soma e da multiplicação. Melhor nome: somaEmultiplicacao.

// **Exercícios de escrita de código**

// EXERCÍCIO 4

// Escreva as funções explicadas abaixo:

// a. A função deve receber um número correspondente aos "anos humanos" que um cachorro tem e calcular a "idade de cachorro" dele. Considere que 1 ano humano equivale a 7 anos de cachorro

// - Exemplo

//     Para a entrada `4`, deve devolver `28`

const idadeDeCachorro = (idade) => {
    return idade * 7
}

// b.  Escreva uma função que receba 4 parâmetros que correspondem às informações de uma pessoa: o nome (`string`), a idade (`number`), o endereço (`string`) e um `boolean` que representa se é estudante ou não. Ela deve retornar uma `string` que unifique todas as informações da pessoa em uma só mensagem com o template

const informacoes = (nome, idade, endereco, estudante) => {
    if (estudante) {
        estudante = "sou estudante"
    } else {
        estudante = "não sou estudante"
    }

    return `Eu sou ${nome}, tenho ${idade} anos, moro em ${endereco} e ${estudante}.`
}

const resultado = informacoes("Anna", "32", "Av Rouxinol", true)
console.log(resultado)


// EXERCÍCIO 5

// O propósito desse exercício é que você determine a qual século um ano pertence. Para isso, considere as seguintes afirmações:

// 1. A sua função só precisa funcionar entre os anos 1000dc até 2020dc (se você quiser, pode implementar para um intervalo maior)
// 2. Ela deve retornar uma `string` com a mensagem: `O ano [ANO] pertence ao século [SÉCULO EM ALGARISMOS ROMANOS]`
//     - Algarismos Romanos
// 3. As regras de século normalmente confundem, então leiam os exemplos para entender melhor

// - Exemplo

//     Para o ano 1100, a saída seria: `O ano 1100 pertence ao século XI`

//     Para o ano 1101, a saída seria: `O ano 1101 pertence ao século XII`

//     Para o ano 1534, a saída seria: `O ano 1534 pertence ao século XVI`

//     Para o ano 1630, a saída seria: `O ano 1630 pertence ao século XVII`

const calculoSeculo = (ano) => {
    let seculo;

    if ((ano > 1000) && (ano < 1101)) {
        seculo = "XI"
    } else if ((ano > 1100) && (ano < 1201)) {
        seculo = "XII"
    } else if ((ano > 1200) && (ano < 1301)) {
        seculo = "XIII"
    } else if ((ano > 1300) && (ano < 1401)) {
        seculo = "XIV"
    } else if ((ano > 1400) && (ano < 1501)) {
        seculo = "XV"
    } else if ((ano > 1500) && (ano < 1601)) {
        seculo = "XVI"
    } else if ((ano > 1600) && (ano < 1701)) {
        seculo = "XVII"
    } else if ((ano > 1700) && (ano < 1801)) {
        seculo = "XVIII"
    } else if ((ano > 1800) && (ano < 1901)) {
        seculo = "XIX"
    } else if ((ano > 1900) && (ano < 2001)) {
        seculo = "XX"
    } else if ((ano > 2000) && (ano < 2101)) {
        seculo = "XXI"
    }
    
    return `O ano ${ano} pertence ao século ${seculo}`
}

const resultadoSeculo = calculoSeculo(2020)
console.log(resultadoSeculo)


// EXERCÍCIO 6

// Para os itens a seguir, considere o seguinte array para os seus testes:

const array = [10, 23, 45, 78, 90, 52, 35, 67, 84, 22]

// a. Escreva uma função que receba um array de números e devolva a quantidade de elementos nele

const quantidadeArray = (array) => {
    return array.length
}

const resultadoQuantidadeArray = quantidadeArray(array)
console.log(resultadoQuantidadeArray)

// b. Escreva uma função que receba um número e devolva um booleano indicando se ele é par ou não
const parImpar = (numero) => {
    if (numero % 2 === 0) {
        return true
    } else {
        return false
    }
}

const resultadoParImpar = parImpar(15)
console.log(resultadoParImpar)


// c. Escreva uma função que receba um array de números e devolva a quantidade de números pares dentro dele
const arrayParImpar = (array) => {
    let numerosPares = [];
    for (elemento of array) {
        if (elemento % 2 === 0) {
           numerosPares.push(elemento) 
        }
    }

    return numerosPares.length
}

const resultadoArrayParImpar = arrayParImpar(array)
console.log(resultadoArrayParImpar)

// d. Reescreva seu código anterior (do item c) de tal forma que ele utilize a função do item b para verificar se o número é par

const arrayParImpar2 = (array) => {
    let numerosPares = [];
    for (elemento of array) {
        if (parImpar(elemento)) {
           numerosPares.push(elemento) 
        };
    }

    return numerosPares.length
}

const resultadoArrayParImpar2 = arrayParImpar2(array)
console.log(resultadoArrayParImpar2)