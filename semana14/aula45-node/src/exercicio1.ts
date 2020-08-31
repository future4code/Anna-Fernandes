export {}
// Para acessar os parâmetros passados na linha de comando utilizamos o mesmo método de se acessar o index de um array

const name: string = process.argv[2]
const age: number = Number(process.argv[3])

if (!name && !age) {
    console.log("Esperava 2 parâmetros mas não recebi nenhum :(")
} else if (!name || !age) {
    console.log("Esperava 2 parâmetros mas só recebi um :(")
} else {
    // imprime mensagem
    console.log('\x1b[36m%s\x1b[0m', `Olá, ${name}! Você tem ${age} anos.`)
    
    // imprime mensagem
    console.log('\x1b[33m%s\x1b[0m', `Olá, ${name}! Em sete anos, você terá ${age + 7}.`)
}
