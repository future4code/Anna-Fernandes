// Escreva uma função que receba uma string e retorne a string reversa. Em outras palavras, se o input da sua função for `"abcd"`, a saída deve ser `"dcba"` .

function stringReversa(string: string): string {
    const divideString = string.split("");
    const arrayReverso = divideString.reverse();
    const stringFinal = arrayReverso.join("");
    
    return stringFinal;
}

console.log(stringReversa("Hello"));