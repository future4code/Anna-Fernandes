enum DESCONTOS_POR_TEMPORADA {
    VERAO = 0.05,
    INVERNO = 0.1,
    BANHO = 0.04,
    INTIMA = 0.07
}

type produto = {
    nome: string,
    preco: number,
    classificacao: string
}

type produtoComDesconto = {
    nome: string,
    preco: number,
    classificacao: string
    precoComDesconto: number
}

const produtos: produto[] = [
    {
        nome: "Calcinha de vovó",
        preco: 25,
        classificacao: "íntima"
    },
    {
        nome: "Vestido curto de alcinha",
        preco: 45,
        classificacao: "verão"
    },
  ]

  function calculaPrecosComDesconto(produtos: produto[]): produtoComDesconto[] {

    const novoArray = produtos.map( produto => {
        let valorDoDesconto:number;

        switch(produto.classificacao) {
            case "verão":
                valorDoDesconto = DESCONTOS_POR_TEMPORADA.VERAO
                break;
            case "inverno":
                valorDoDesconto = DESCONTOS_POR_TEMPORADA.INVERNO
                break;
            case "banho":
                valorDoDesconto = DESCONTOS_POR_TEMPORADA.BANHO
                break;
            case "íntima":
                valorDoDesconto = DESCONTOS_POR_TEMPORADA.INTIMA
                break;
            default:
                valorDoDesconto = 0;
        }

        const novoProduto = {
            ...produto,
            precoComDesconto: produto.preco - produto.preco * valorDoDesconto
        }

        return novoProduto
    })

    return novoArray;
  }

  console.log(calculaPrecosComDesconto(produtos))