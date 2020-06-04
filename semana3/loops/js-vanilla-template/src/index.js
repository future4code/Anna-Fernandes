// **Exercícios de interpretação de código**

// EXERCÍCIO 1

// O que o código abaixo está fazendo? Qual o resultado impresso no console? 

// let sum = 0
// for(let i = 0; i < 15; i++) {
//   sum += i
// }
// console.log(sum)

// RESPOSTA
// O laço vai somando os número de 1 a 14. O resultado empresso no console é 105





// EXERCÍCIO 2

// Leia o código abaixo:

// const lista = [10, 11, 12, 15, 18, 19, 21, 23, 25, 27, 30]
// const novaLista = []
// const numero = 5
// for(const item of lista) {
//   if(item%numero === 0) {
//     novaLista.push(item)
//   }
// }
// console.log(novaLista)

// RESPOSTA 
// a. O que o comando `.push` faz?
// O comando push acrescenta o item ao array da novaLista.

// b. Qual o valor impresso no console?
// [10, 15, 25, 30]

// c. Qual **seria** imprimido no console se a variável `numero` tivesse o valor de `3`? E se tivesse o valor de `4`?
// [18, 23] e 19


// DESAFIO 1

// Qual seria o resultado impresso no console, se o usuário digitasse o número `4` ? 

const quantidadeTotal = Number(prompt("Digite a quantidade de linhas: "))
let quantidadeAtual = 0

while(quantidadeAtual < quantidadeTotal){
    let linha = ""
    for(let asteriscos = 0; asteriscos < quantidadeAtual + 1; asteriscos++){
        linha += "0"
   }
   console.log(linha)
   quantidadeAtual++
}

// RESPOSTA
// 0
// 00
// 000
// 0000


// **Exercícios de escrita de código**

// EXERCÍCIO 3

// Nas perguntas abaixo, considere que você tenha acesso a um `array`  (chamado de 'array original') que seja composto somente de números. Após o enunciado, há um exemplo de qual deve ser a resposta final de cada programa individualmente.

// a. Escreva um programa que devolva o maior e o menor números contidos no array original

const array = [25, 106, 544, 85, 93, 47, 34, 8, 98, 107, 65]
let numeroMaximo = 0;
let numeroMinimo = Number.POSITIVE_INFINITY;

for(let i = 0; i < 11; i++ ) {
    const elemento = array[i];
    if ( elemento > numeroMaximo) {
        numeroMaximo = elemento
    } else if ( elemento < numeroMinimo ) {
        numeroMinimo = elemento
    }
}

console.log(`O maior número é ${numeroMaximo} e o menor número é ${numeroMinimo}`);
//O maior número é 544 e o menor número é 8

// b. Escreva um programa que devolva um novo array contendo todos os valores do array original divididos por 10.
let novoArray = []

for (let elemento of array) {
    let sum = elemento / 10;
    novoArray.push(sum)
}

console.log(novoArray);
// [2.5, 10.6, 54.4, 8.5, 9.3, 4.7, 3.4, 0.8, 9.8, 10.7, 6.5]

// c. Escreva um programa que devolva um novo array contendo, somente, os números pares do array original.

let soOsPares = []

for (let elemento of array) {
    if( elemento % 2 === 0 ){
        soOsPares.push(elemento)
    }
}

console.log(soOsPares);
// [106, 544, 34, 8, 98]

// d. Escreva um programa que gere um novo array contendo strings, da seguinte forma: "O elemento do índex i é: numero"

let arrayDeStrings = [];

for (let i = 0; i < 11; i++) {
    let elemento = array[i];
    let texto = `O elemento do índex ${i} é: ${elemento}`
    arrayDeStrings.push(texto)
}

console.log(arrayDeStrings);
// ["O elemento do índex 0 é: 25", "O elemento do índex 1 é: 106", "O elemento do índex 2 é: 544", "O elemento do índex 3 é: 85", "O elemento do índex 4 é: 93", "O elemento do índex 5 é: 47", "O elemento do índex 6 é: 34", "O elemento do índex 7 é: 8", "O elemento do índex 8 é: 98", "O elemento do índex 9 é: 107", "O elemento do índex 10 é: 65"]

