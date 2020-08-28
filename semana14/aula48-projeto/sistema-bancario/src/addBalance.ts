import { readDatabase, writeToDatabase, userAcount, transaction } from "./index";

const addBalance = (name: string, cpf: string, value: string) => {
    const users = readDatabase();

    const findUserByName = users.find( (user: userAcount) => user.name === name )
    const findUserByCpf = users.find( (user: userAcount) => user.cpf === cpf )

    if(findUserByName && findUserByCpf && findUserByName === findUserByCpf) {
        const newBalanceUsers = users.map( (user: userAcount) => {
            if( user.name === name && user.cpf === cpf ) {
                const newBalanceForUser = {
                    ...user,
                    balance: user.balance + value
                }
    
                return newBalanceForUser
            } else {
                return user
            }
        })
    
        writeToDatabase(newBalanceUsers);
        console.log("Saldo adicionado com sucesso!");
    } else {
        console.log("Não foi encontrado usuário com esse nome e cpf no sistema. Verifique se as informações passadas estão corretas.")
    }
}

console.log(`Adicionando R$ ${process.argv[3]}`);
addBalance(process.argv[2], process.argv[3], process.argv[4]);
