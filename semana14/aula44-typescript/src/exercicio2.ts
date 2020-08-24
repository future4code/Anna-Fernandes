function obterEstatisticas(numeros: number[]):{maior: number, menor: number, media: number} {

    const numerosOrdenados = numeros.sort(
        (a: number, b: number) => a - b
    )

    let soma: number = 0

    for (let num of numeros) {
        soma += num
    }

    const estatisticas = {
        maior: numerosOrdenados[numeros.length - 1],
        menor: numerosOrdenados[0],
        media: soma / numeros.length
    }

    return estatisticas
}

type amostraDeIdades = {
    numeros: number[],
    obterEstatisticas: (numeros: number[]) => {maior: number, menor: number, media: number}
}

const array = [21, 18, 65, 44, 15, 18]

console.log(obterEstatisticas(array))