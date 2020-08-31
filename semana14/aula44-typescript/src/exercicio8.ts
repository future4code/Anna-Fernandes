type prato = {
    nome: string,
    custo: number,
    valorDeVenda: number,
    listaDeIngredientes: string[]
}

let produtosRestaurante: prato[] = [];

const pure: prato = {
    nome: "Purê de Batata",
    custo: 15,
    valorDeVenda: 25,
    listaDeIngredientes: ["batata", "sal", "manteiga"]
}

const macarrao: prato = {
    nome: "Macarrão à bolonhesa",
    custo: 25,
    valorDeVenda: 45,
    listaDeIngredientes: ["macarrão", "sal", "molho de tomate", "carne móida"]
}

function cadastroDeProdutos(prato: prato): prato[] {
    produtosRestaurante.push(prato);
    return produtosRestaurante;
}

cadastroDeProdutos(pure)
cadastroDeProdutos(macarrao)

// console.log(produtosRestaurante)

function filtraProduto(nome: string): prato[] {
    const pratoProcurado = produtosRestaurante.filter( prato => {
        if(prato.nome.includes(nome)) {
            return prato
        }
    })

    return pratoProcurado;
}

// console.log(filtraProduto("Purê"))


let produtosVendidos: any = [];

function vendaProduto(nome: string): prato[] {
    const pratoVendido = produtosRestaurante.find(item => item.nome.includes(nome));

    produtosVendidos.push(pratoVendido);

    return produtosVendidos;
}

vendaProduto("Macarrão");
vendaProduto("Purê");

console.log(produtosVendidos);


let lucro: number = 0;

function lucroDosProduto(): number {
    let arrayLucros: number[] = [];

    arrayLucros = produtosVendidos.map( (item:prato) => item.valorDeVenda - item.custo)

    lucro = arrayLucros.reduce((a:number, b:number) => a + b, 0)

    return lucro;
}


console.log(lucroDosProduto());