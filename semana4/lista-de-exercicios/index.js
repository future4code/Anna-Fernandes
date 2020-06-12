// Exercícios de interpretação de código

// RESPOSTAS
    // 1. R$502,13 (dólar a R$5,0213)
    // 2. 165
    //    udefinied. alert: Tipo de investimento informado incorreto!
    // 3. Quantidade total de números14
    //    6
    //    8
    //  4.-10
    //    1590 

// Exercícios de lógica de programação

// RESPOSTAS

    // 1. While, for (let i = 0; i < x; i++) e for (let elemento of array). Exemplos:
let tresManeirasDeIterar = () => {
    let array = [1, 2, 3, 4, 5];
    let i = 0

    while (i < 10) {
        i++
        array.push(i)
    }
    console.log(array)
    
    for (let j = 0; j < array.length; j++) {
        console.log(j)
    }
    
    let frutas = ["banana", "maçã", "pêra", "uva", "carambola"]
    for ( fruta of frutas ) {
        console.log("Vamos comer uma fruta? Sugiro " + fruta);
    }
}

// tresManeirasDeIterar()

    // 2. a) false
    //    b) false
    //    c) true
    //    d) true
    //    e) true

    // 3 Não, porque gera um loop infinito, já que i vai ser sempre menor do que o númeoro. Falta o incremento para aumentar o valor de i. E o ideal seria um for loop, para abarcar o 0.

let imprimirNumerosPares = (numero) => {
    const quantidadeDeNumerosPares = numero
    let i = 0;
    for(i = 0; i < 10; i++) {
      console.log(i*2)
    }
}

// imprimirNumerosPares(10)

    //4.

let tipoDeTriangulo = (a, b, c) => {
    if ( a === b && b === c ) {
        console.log("Esse é um triângulo equilátero")
    } else if ( a !== b && b !== c && a !== c) {
        console.log("Esse é um triângulo escaleno")
    } else {
        console.log("Esse é um triângulo isósceles")
    }
}

// tipoDeTriangulo(1, 3, 3)
