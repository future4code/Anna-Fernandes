function obterOperacoes(a: number, b: number): void {
    const soma: number = a + b;
    const multiplicacao: number = a * b;
    let subtracao: number;
    let maiorNumero: number | string;

    if( a > b) {
        subtracao = a - b;
        maiorNumero = a;
    } else if( b > a) {
        subtracao = b - a;
        maiorNumero = b;
    } else {
        subtracao = 0;
        maiorNumero = "são iguais, logo nenhum deles"
    }

    console.log(`A soma dos dois números é ${soma}`)
    console.log(`A subtração dos dois números é ${subtracao}`)
    console.log(`A multiplicação dos dois números é ${multiplicacao}`)
    console.log(`${maiorNumero} é o maior número`)
}

console.log(obterOperacoes(4, 5));