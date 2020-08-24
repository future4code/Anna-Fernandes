// Para realizar este exercício, você vai ter que utilizar o exercício o código do cálculo do fatorial. Então tenha certeza de que ele esteja funcionando corretamente! Uma aplicação interessante dele é o cálculo de anagramas de uma palavra. Anagrama é uma outra palavra (não precisa existir em português) com as mesmas letras da anterior em ordem diferentes. Por exemplo, anagramas da palavra `mesa` são: `ames`, `maes`, `meas`, `emsa`, `smea` e muitos outros. 

// a) A quantidade de anagramas de uma palavra sem nenhuma letra repetida é o fatorial da quantidade de letras. Para `mesa`, a quantidade é `4! = 24`. Escreva uma função que receba uma `palavra` e devolva a quantidade de anagramas que ela possui.

// b) A quantidade de anagramas de uma palavra com apenas uma letra que repete várias vezes é dado por:

//  `(Quantidade de letras)!/(Quantidade de vezes que a letra repete)!`. 

// Por exemplo: a palavra Anagrama possui **8** letras e somente a letra A se repete **4** vezes. Então, ela possui `8!/4! = 40320/24 = 1680` anagramas. Escreva uma função que receba uma palavra com estas características e determine quantos anagramas ela possui.


function stringSemLetrasRepetidas(string: string): number {
    const array: number[] = [];
    let anagramas: number = 0;

    for(let i = 0; i <= string.length; i++) {
        if( i === 0 ) {
            array.push(1);
        } else {
            array.push(i);
        }
    }

    anagramas = array.reduce( (a, b) => a * b, 1)

    return anagramas;
}

// console.log(stringSemLetrasRepetidas("mesa"));

function stringComLetraQueSeRepete(string: string): number {

    const arrayString: string[] = string.split("");
    const arrayRepetidas: number[] = [];

    const x = arrayString.map ((letter, i) => {
        if (arrayString.indexOf(letter) === i) {
           return arrayRepetidas.push(0)
        } else {
            return arrayRepetidas.push(1)
        }
    })

    const quantidadeVezesLetraRepete: number = arrayRepetidas.reduce((a, b) => a + b, 1)

    let array: number[] = [];
    let arrayComRepetidas: number[] = [];

    let anagramas: number = 0;

    for(let i = 0; i <= string.length; i++) {
        if( i === 0 ) {
            array.push(1);
        } else {
            array.push(i);
        }
    }

    for(let i = 0; i <= quantidadeVezesLetraRepete; i++) {
        if( i === 0 ) {
            arrayComRepetidas.push(1);
        } else {
            arrayComRepetidas.push(i);
        }
    }

    anagramas = array.reduce( (a, b) => a * b, 1) / arrayComRepetidas.reduce( (a, b) => a * b, 1)

    return anagramas;
}

console.log(stringComLetraQueSeRepete("anagrama"));