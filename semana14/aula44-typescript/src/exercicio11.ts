// Uma operação matemática bastante utilizada em probabilidade e estatística é o **fatorial**, representado por um **!** (ponto de exclamação). Ele consiste em realizar a multiplicação de todos os números (a partir de 1) até aquele colocado na operação. Veja os exemplos abaixo:

// - `3! = 3*2*1 = 6`
// - `4! = 4*3*2*1 = 24`
// - `5! = 5*4*3*2*1 = 120`
// - `6! = 6*5*4*3*2*1 = 720`

// Isso vale para todos os números inteiros não negativos (também chamados de "números naturais"). Dois valores para se tomar cuidado são:  `1! = 1` e `0! = 1` (uma exceção da regra!).

// a) Escreva uma função que determine o fatorial para um número  `n >= 1` . 

// b) Reescreva a função acima para determinar o fatorial de um número `n >= 0`.

function fatorial(numero: number): number {
    let array: number[] = [];
    let numeroFatorial: number = 0;

    for(let i = 0; i <= numero; i++) {
        if( i === 0 ) {
            array.push(1);
        } else {
            array.push(i);
        }
    }

    numeroFatorial = array.reduce( (a, b) => a * b, 1)

    return numeroFatorial;
}

console.log(fatorial(0))