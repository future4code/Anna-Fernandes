import { readDatabase, writeToDatabase, userAcount, transaction } from "./index";
import moment from "moment";


const validateCpf = (cpf: string): boolean => {
    const data = readDatabase();

    const findCpf = data.find( (user: userAcount) => {
        return user.cpf === cpf
    });

    if( findCpf ) {
        return true
    } else {
        return false
    }
}

console.log('Criando uma conta:')

const createAccount = (user: userAcount ): void => {  
    const newUser = {
        name: user.name,
        cpf: user.cpf,
        balance: user.balance,
        dateOfBirth: user.dateOfBirth,
        transaction: user.transaction
    }

    const today: moment.Moment = moment();
    const cpfIsValid = !validateCpf(user.cpf);

     if(newUser.dateOfBirth.diff(today, "years") >= 18 ) {
        console.log("Você deve ter mais do que 18 anos");
        return;

     } else if (!cpfIsValid) {
        console.log("Já há uma pessoa cadastrada com esse cpf");
        return;
     } else {
         const data = readDatabase();
         data.push(newUser);
         writeToDatabase(data)
         console.log("Conta criada com sucesso!");
     }
}

createAccount({
    name: process.argv[2],
    cpf: process.argv[3],
    balance: 0,
    dateOfBirth: moment(process.argv[4], 'DD/MM/YYYY HH:mm'),
    transaction: []
})
