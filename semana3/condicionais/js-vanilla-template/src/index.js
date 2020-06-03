// **Exercícios de interpretação de código**

// EXERCÍCIO 1

// Leia o código abaixo:

// ```jsx
// const respostaDoUsuario = prompt("Digite o número que você quer testar?")
// const numero = Number(respostaDoUsuario)

// if(numero % 2 === 0) {
//   console.log("Passou no teste.")
// } else {
//   console.log("Não passou no teste.")
// }
// ```

// Explique o que o código faz. Qual o teste que ele realiza? Para que tipos de números ele imprime no console "Passou no teste"? Para que tipos, a mensagem é "Não passou no teste"?

// 1. O código testa se o valor que sobra da divisão do número digitado pelo usuário por 2 é igual a zero, e, se for, imprime a frase Passou no teste, se não, imprime a frase Não passou no teste. O código testa se o número é par ou ímpar, pois números pares divididos por dois restam em zero, enquanto números ímpares, sobra 1. Logo, a mensagem "Não passou no teste" é para números ímpares.

// EXERCÍCIO 2

// O código abaixo foi feito por uma pessoa desenvolvedora, contratada para automatizar algumas tarefas de um supermercado. Veja abaixo:

// ```jsx
// let fruta = prompt("Escolha uma fruta")
// let preco
// switch (fruta) {
//   case "Laranja":
//     preco = 3.5
//     break;
//   case "Maçã":
//     preco = 2.25
//     break;
//   case "Uva":
//     preco = 0.30
//     break;
//   case "Pêra":
//     preco = 5.5
//     break; // BREAK PARA O ITEM d.
//   default:
//     preco = 5
//     break;
// }
// console.log("O preço da fruta ", fruta, " é ", "R$ ", preco)
// ```

// a. Para que serve o código acima?
// a. O código serve para que, conforme for digitado o nome da fruta, apareça o preço relacionado a ela.

// b. Qual será a mensagem impressa no console, se o valor de fruta for `"Maçã"`?
// b. O preço da fruta maçã é R$ 2.25

// c. Considere que você vá ao mercado com o objetivo de comprar 2 laranjas, 1 maçã, 3 bananas e 1 uva. Qual seria o preço que você pagaria?
// c. 24,55

// d. Considere que um usuário queira comprar uma `Pêra`, qual seria a mensagem impressa no console se retirássemos o `break` que está logo acima do `deafult` (o `break` indicado pelo comentário "BREAK PARA O ITEM d.")?
// d. O preço da fruta maçã é R$ 5

// EXERCÍCIO 3

// Leia o código abaixo:

// ```jsx
// const numero1 = prompt("Digite o primeiro número.")
// const numero2 = prompt("Digite o próximo número?")

// if(numero1 > 0 && numero2 > 0) {
//   let mensagem
//   if(numero1 > numero2) {
//     mensagem = "Número 1 é maior que o 2!"
//   } else {
//     mensagem = "Número 1 é menor ou igual ao 2!"
//   }
// }

// console.log(mensagem)
// ```

// Considere um usuário que digita os números 3 e 4 respectivamente. Qual será a mensagem do terminal? Haverá algum erro? Justifique usando os conceitos de bloco ou escopo.
// 3. Apareceria "mensagem is not defined", pois o console.log está fora do bloco que tem o escopo que define a variável mensagem, de forma que não tem acesso a ela.

// **Exercícios de escrita de código**

// EXERCÍCIO 4

// Nos exercícios abaixo, será necessário que você trabalhe com a comparação de números. Leia abaixo:

// a. Crie um programa que receba dois números do usuário através do `prompt` e imprima-os na ordem **decrescente**. O que acontece com o seu programa se os 2 números forem iguais? (é só testar e colocar um comentário descrevendo o que aconteceu)

const numero1 = Number(prompt("Digite o primeiro número."))
const numero2 = Number(prompt("Digite o segundo número?"))

if(numero1 < numero2) {
    console.log(numero2 + ', ' + numero1)
} else {
    console.log(numero1 + ', ' + numero2)
}
// Ele imprime a lista de números digitados da mesma forma, pois ele entende que o else vale tanto para número1 maior, quando para igual ao número 2.

// b. Adapte o programa para que o usuário digite 3 números. Ainda os imprima na ordem **decrescente**. O que acontece como seu programa se os 3 números forem iguais? (é só testar e colocar um comentário descrevendo o que aconteceu)

const numero3 = Number(prompt("Digite o terceiro número?"))

if(numero1 >= numero2 && numero1 >= numero3) {
    if (numero2 >= numero3){
        console.log(numero1 + ', ' + numero2 + ', ' + numero3)
    } else {
        console.log(numero1 + ', ' + numero3 + ', ' + numero2)
    }
} else if(numero2 >= numero3 && numero2 >= numero1)  {
    if (numero3 >= numero1){
        console.log(numero2 + ', ' + numero3 + ', ' + numero1)
    } else {
        console.log(numero2 + ', ' + numero1 + ', ' + numero3)
    }
} else if(numero3 >= numero2 && numero3 >= numero1)  {
    if (numero2 >= numero1){
        console.log(numero3 + ', ' + numero2 + ', ' + numero1)
    } else {
        console.log(numero3 + ', ' + numero1 + ', ' + numero2)
    }
}

Ele imprime a lista de números digitados da mesma forma

c. Agora, impeça que o usuário digite 3 números iguais. Caso todos sejam iguais, mostre um aviso ao usuário indicando que ele deve, ao menos, inserir um número diferente.

if(numero3 === numero2 && numero3 === numero1) {
    alert("Você precisa inserir ao menos um número diferente.")
} else {
    if(numero1 >= numero2 && numero1 >= numero3) {
        if (numero2 >= numero3){
            console.log(numero1 + ', ' + numero2 + ', ' + numero3)
        } else {
            console.log(numero1 + ', ' + numero3 + ', ' + numero2)
        }
    } else if(numero2 >= numero3 && numero2 >= numero1)  {
        if (numero3 >= numero1){
            console.log(numero2 + ', ' + numero3 + ', ' + numero1)
        } else {
            console.log(numero2 + ', ' + numero1 + ', ' + numero3)
        }
    } else if(numero3 >= numero2 && numero3 >= numero1)  {
        if (numero2 >= numero1){
            console.log(numero3 + ', ' + numero2 + ', ' + numero1)
        } else {
            console.log(numero3 + ', ' + numero1 + ', ' + numero2)
        }
    }
}

// EXERCÍCIO 5

// Vamos criar um programa que classifique os animais dados alguns critérios. O primeiro critério de divisão é se eles possuem ossos formando seu esqueleto ou não. Caso possuam, são **vertebrados**, caso contrário, **invertebrados**. O nosso foco é realizar a classificação só do primeiro caso. Se possuir pelos, entende-se que ele é um mamífero; e este pode ser classificado como um **ser humano** ou não (**mamífero não humano**), simplesmente, pelo fato dele ser considerado racional ou não. Se não for mamífero, entende-se que ele é uma **ave**, se possuir penas. Se não possuir, devemos entender uma característica importante: se ele é um animal terrestre. Se não for, diz-se que é um **peixe**; se  for, ele pode ser um **anfíbio** ou um **réptil**. Ele será o primeiro (anfíbio), se passar uma parte da vida em ambiente aquático; e será o segundo (réptil), caso contrário.

// - OBS

// a. Escreva o diagrama esquemático que melhor represente a árvore condicional do exercício. (Coloque a imagem do esquema no drive e gerem um link de compartilhamento público. Coloque este link num comentário durante a resolução deste exercício)
// https://drive.google.com/file/d/1tFGlNZJixwBo8wpLJFCu9aospI3Hg24o/view?usp=sharing

// b. Escreva um programa que realize estas perguntas  e indique a classificação final considerada. As opções são: ser humano; mamífero não humano; ave; réptil; anfíbio; peixe ou é invertebrado

const inicio = alert('Pense em um animal. Depois, responta as perguntas com "sim" ou "não"')
const vertebrado = prompt("É um animal vertebrado?")

if(vertebrado[0] === "s") {
    const pelos = prompt("Tem pelos")
    if(pelos[0] === "s") {
        const racional = prompt("É um animal racional?")
        if(racional[0] === "s") {
            alert("Você pensou em um ser humano.")
        } else {
            alert("Você pensou em um mamífero não humano.")
        }

    }
    else {
        const penas = prompt("Tem penas?")
        if(penas[0] === "s") {
            alert("Você pensou em uma ave.")
        } else {
            const terrestre = prompt("É um animal terrestre?")
            if(terrestre[0] === "s") {
                const aquatico = prompt("O animal passa a vida em ambiente aquático?")
                if(aquatico[0] === "s") {
                    alert("Você pensou em um anfíbio.")
                } else {
                    alert("Você pensou em um réptil.")
                }
            } else {
                alert("Você pensou em um peixe.")
            }
        }
    }
} else {
    alert("Você pensou em um animal invertebrado.")
}