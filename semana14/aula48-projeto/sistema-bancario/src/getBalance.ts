import { readDatabase, writeToDatabase, userAcount } from "./index";

const getBalance = (name: string, cpf: string) => {
    const users = readDatabase();

    const findUserByName = users.find( (user: userAcount) => {
        return user.name === name;
    })
    const findUserByCpf = users.find( (user: userAcount) => {
        return user.cpf === cpf;
    });

    if(findUserByName && findUserByCpf && findUserByName === findUserByCpf) {
        return findUserByName.balance
    } else {
        return "O usuário não foi encontrado no sistema. Confira se nome e cpf estão corretos."
    }

}

console.log("O saldo do usuário é:");
console.log(getBalance(process.argv[2], process.argv[3]));
