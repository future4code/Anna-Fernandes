import { readDatabase, writeToDatabase, userAcount, transaction } from "./index";
import moment from "moment";
moment.locale('pt-br');

const payBill = (date: string, description: string, value: string, cpf: string):void => {
    const users = readDatabase();
    const getDate = moment(date, "DD/MM/YYYY", true);
    const findUserByCpf = users.find( (user: userAcount) => user.cpf === cpf )

    const today: moment.Moment = moment();

    if(findUserByCpf) {
        if(today.diff(getDate, "days") < 0) {
            const newBalanceUsers = users.map( (user: userAcount) => {
                if( user.cpf === cpf ) {
                    if(user.balance > Number(value)) {
                        const newTransaction: transaction = {
                            date: getDate,
                            value: Number(-value),
                            description: description
                        }
                        
                        const transactions = user.transactions
                        transactions.push(newTransaction);
        
                        const newBalanceForUser = {
                            ...user,
                            transactions: transactions
                        }
            
                        console.log("Conta paga com sucesso! Parabéns, agora você é adulto");
                        return newBalanceForUser
                    }  
                    else {
                         console.log("Você não tem saldo suficiente para pagar essa conta :(")
                         return user;
                    }  
                } else {
                    return user
                }
            })
        
            writeToDatabase(newBalanceUsers);
        } else {
            console.log("Essa data já passou, não será possível pagar essa conta. Solicite un novo boleto, ele provavelmente virá com uma multa, porque a vida é assim.")
        }
       
    } else {
        console.log("Não foi encontrado usuário com esse cpf no sistema. Verifique se as informações passadas estão corretas.")
    }
}

console.log(`Pagando a conta de R$ ${process.argv[4]}`);
payBill(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
