let minhaString: string = "Hello world";
// minhaString = 5;
// O vs code aponta o erro de tipo de variável
// Erro no terminal: exercicio1.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.

let meuNumero: string | number = 5;
meuNumero = "Oi";

type pessoa = {
    nome: string,
    idade: number,
    corFavorita: string
}

enum CORES_DO_ARCO_IRIS {
    VERMELHO = "#ff0000",
    LARANJA = "#ffa500",
    AMARELO = "#ffff00",
    VERDE = "#008000",
    AZUL = "#0000ff",
    ROXO = "#4b0082",
    VIOLETA = "#ee82ee",
}

const pessoaUm: pessoa = {
    nome: "Gertrudes",
    idade: 94,
    corFavorita: CORES_DO_ARCO_IRIS.VERMELHO
}

const pessoaDois: pessoa = {
    nome: "Onofra",
    idade: 89,
    corFavorita: CORES_DO_ARCO_IRIS.AMARELO
}

const pessoaTres: pessoa = {
    nome: "Josivaldo",
    idade: 75,
    corFavorita: CORES_DO_ARCO_IRIS.VIOLETA
}