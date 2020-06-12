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

    //5.
let comparacaoEntreDoisNumeros = (a, b) => {
    if ( a < b ) {
        console.log("O maior é " + b)
    } else {
        console.log("O maior é " + a)
    }

    if ( a % b === 0) {
        console.log(a + "é divisível por" + b)
    } else {
        console.log(a + " não é divisível por " + b)
    }
    
    if ( b % a === 0) {
        console.log(b + " é divisível por " + a)
    } else {
        console.log(b + " não é divisível por " + a)
    }

    let diferenca = a - b
    
    if ( b > a ) {
        diferenca = diferenca * -1
    }
    
    console.log( "A diferenca entre eles é " + diferenca)
}

// comparacaoEntreDoisNumeros(15, 30)

// Exercícios de Funções

// RESPOSTAS

    //1.
let segundoMaiorEsegundoMenor = (array) => {
    let menorNum = Infinity;
    let maiorNum = 0;

    for (let numero of array) {
        if (numero > maiorNum) {
            maiorNum = numero;
        }
    }

    for (let numero of array) {
        if (numero < maiorNum) {
            menorNum = numero;
        }
    }
    console.log(maiorNum)
    console.log(menorNum)
}

// segundoMaiorEsegundoMenor([8, 64, 52, 54, 11, 3])
    // 2.
let funcaoNaoNomeada = () => {
    alert("Hello Future4");
}

// funcaoNaoNomeada()

// Exercícios de Objetos

// RESPOSTAS
    // 1. Array é uma lista de elementos, utilizados entre [ ], enquanto objeto é um elemento composto por diferentes chaves (ou propriedades), apresentado entre { }. Um array pode ser composto por objetos, assim como a propriedade de um objeto pode ser um array.
    
    // 2.
let criaRetangulo = (lado1, lado2) => {
        let retangulo = {
            largura: lado1,
            altura: lado2,
            perimetro: 2 * (lado1 + lado2),
            area: (lado1 * lado2)
        }
        return retangulo;
}

// let retangulo = criaRetangulo(5, 8)
// console.log(retangulo)

    //3. 
let filmeFavorito = () => {
    const meuFilme = {
        titulo: "Jojo Rabbit",
        ano: "2019",
        diretor:"Taika Waititi",
        elenco: ["Taika Waitit", "Scarlett Johansson", "Roman Griffin", "Sam Rockwell", "Thomasin McKenzie"]
    }

    console.log(`Venha assistir ao filme ${meuFilme.titulo}, de ${meuFilme.ano}, dirigido por ${meuFilme.diretor} e estrelado por ${meuFilme.elenco}`)
}

// filmeFavorito();

    //4.
const pessoa = {
    nome: "Margarida",
    idade: 45,
    email: "margaridaamaflores@gmail.com",
    endereco: "Rua das Bromélias, 145"
}

let anonimizarPessoa = (anonimos) => {
    anonimos = {
        ...pessoa,
        nome: "Anônima(o)"
    }
    return anonimos
}

// const pessoaAnonima = anonimizarPessoa()
// console.log(pessoaAnonima)


// Exercícios de Funções de array

// RESPOSTAS

    //1.
    //  a.

const arrayPessoas = [
	{ nome: "Pedro", idade: 20 },
	{ nome: "João", idade: 10 },
	{ nome: "Paula", idade: 12 },
	{ nome: "Artur", idade: 89 } 
];

let adultos = arrayPessoas.filter((pessoa, idx, arr) => {
    return pessoa.idade >= 20 
})

console.log(adultos)

//  b.

let djovens = arrayPessoas.filter((pessoa, idx, arr) => {
    return pessoa.idade < 20 
})
console.log(djovens)

    //2.

const array = [1, 2, 3, 4, 5, 6]
    //  a.
let arrayDobro = [];
array.forEach((numero, idx, array) => {
    arrayDobro.push(numero * 2)
});

console.log(arrayDobro);

    //  b.
let arrayTriploString = [];
array.forEach((numero, idx, array) => {
    numero = numero * 3
    arrayTriploString.push(numero.toString())
});

console.log(arrayTriploString);

    // c.
    
let arrayParEImpar = [];
array.forEach((numero, idx, array) => {
    if (numero % 2 === 0) {
        numero = numero + " é par"
    } else {
        numero = numero + " é ímpar"
    }
    arrayParEImpar.push(numero)
});

console.log(arrayParEImpar);

    //3.
    const arrayPessoasMontanhaRussa = [
        { nome: "Paula", idade: 12, altura: 1.8},
        { nome: "João", idade: 20, altura: 1.3},
        { nome: "Pedro", idade: 15, altura: 1.9},
        { nome: "Luciano", idade: 22, altura: 1.8},
        { nome: "Artur", idade: 10, altura: 1.2},
        { nome: "Soter", idade: 70, altura: 1.9}
    ]

    //  a.

let temPermissao = arrayPessoasMontanhaRussa.filter((pessoas, idx, arr) => {
    return (pessoas.idade > 14) && (pessoas.idade < 60) && (pessoas.altura >= 1.55)
})
console.log(temPermissao)

    //  b.
let naoTemPermissao = arrayPessoasMontanhaRussa.filter((pessoas, idx, arr) => {
    return (pessoas.idade <= 14) || (pessoas.idade >= 60) || (pessoas.altura < 1.55)
})
console.log(naoTemPermissao)

    //4.
    const consultas = [
        { nome: "João", genero: "masculino", cancelada: true, dataDaConsulta: "01/10/2019" },
        { nome: "Pedro", genero: "masculino", cancelada: false, dataDaConsulta: "02/10/2019" },
        { nome: "Paula", genero: "feminino", cancelada: true, dataDaConsulta: "03/11/2019" },
        { nome: "Márcia", genero: "feminino", cancelada: false, dataDaConsulta: "04/11/2019" }
    ]

let consultasEmail = []

consultas.forEach((consulta, idx, array) => {

    if (consulta.genero === "feminino") {
        pronome = "Sra."
        pronomeLembrar = "lembrá-la"

    } else {
        pronome = "Sr."
        pronomeLembrar = "lembrá-lo"
    }

    if(consulta.cancelada) {
        consultasEmail.push(`Olá, ${pronome} ${consulta.nome}. Infelizmente, sua consulta marcada para o dia ${consulta.dataDaConsulta} foi cancelada. Se quiser, pode entrar em contato conosco para remarcá-la`)
    } else {
        consultasEmail.push(`Olá, ${pronome } ${consulta.nome}. Estamos enviando esta mensagem para ${pronomeLembrar} da sua consulta no dia ${consulta.dataDaConsulta}. Por favor, acuse o recebimento deste e-mail.`)
    }
})

console.log(consultasEmail)

    //5.
    
const contas = [
	{ cliente: "João", saldoTotal: 1000, compras: [100, 200, 300] },
	{ cliente: "Paula", saldoTotal: 7500, compras: [200, 1040] },
	{ cliente: "Pedro", saldoTotal: 10000, compras: [5140, 6100, 100, 2000] },
	{ cliente: "Luciano", saldoTotal: 100, compras: [100, 200, 1700] },
	{ cliente: "Artur", saldoTotal: 1800, compras: [200, 300] },
	{ cliente: "Soter", saldoTotal: 1200, compras: [] }
]

contas.forEach((cliente, idx, arr) => {
    for (valor of cliente.compras) {
        cliente.saldoTotal -= valor
    }
})

console.log(contas)