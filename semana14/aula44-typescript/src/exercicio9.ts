// Uma das definições de seres vivos implica em identificar se ele possui células ou não. Hoje em dia, sabe-se que as características deles ficam salvas dentro de uma molécula, um tanto quanto grande, chamada de DNA (Ácido Desoxirribonucleico). Uma das tarefas mais importantes para a sobrevivência das células é a transcrição do RNA (Ácido Ribonucleico) a partir de um DNA. Este processo consiste em identificar as bases nitrogenadas que formam o DNA, em questão. Todas as moléculas de DNA podem ser representadas como uma sequência de bases nitrogenadas que podem ser: a A (adenina), T (timina), G (guanina) ou C (citosina). Abaixo, há um exemplo disto

// ```
// ATT GCT GCG CAT TAA CGA CGC GTA
// ```

// Para se formar o RNA, devemos realizar a troca das bases nitrogenadas, seguindo a regra: A (adenina) vira U (uracila - específica do RNA); T (timina) vira Adenina (A), C (citosina) vira G(guanina); e G (guanina) vira C (citosina).  O RNA transcrito a partir do exemplo de DNA acima é

// ```
// UAA CGA CGC GUA AUU GCU GCG CAU
// ```

// Escreva um programa que converta uma string de DNA em uma string de RNA. Para os exemplos acima, a entrada seria `"ATTGCTGCGCATTAACGACGCGTA"` e a saída `"UAACGACGCGUAAUUGCUGCGCAU"`

let RNA: string;

function converteEmRNA(string: string): string {
    const arrayString = string.split("");
    const arrayRNA = arrayString.map( letra => {
        switch(letra) {
            case "A":
                return "U";
            case "T":
                return "A";
            case "C":
                return "G";
            case "G":
                 return "C"
        }
    })
    
    const RNA = arrayRNA.join("");
    
    return RNA;
}

console.log(converteEmRNA("ATTGCTGCGCATTAACGACGCGTA"))