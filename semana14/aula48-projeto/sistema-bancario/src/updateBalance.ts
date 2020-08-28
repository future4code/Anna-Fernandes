import { readDatabase, writeToDatabase, userAcount, transaction } from "./index";
import moment from "moment";
moment.locale('pt-br');

const updateBalance = ():void => {
    const users = readDatabase();
    
    const today: moment.Moment = moment();

    const updatedusers = users.map( (user:userAcount) => {
        let updatedBalance = 0;

        if(user.transactions) {
            for(let transaction of user.transactions) {
                if (today.diff(transaction.date, "days") >= 1) {
                    updatedBalance += transaction.value
                }
            }
        }

        const newBalance = {
            ...user,
            balance: updatedBalance
        }
        return newBalance
    })

    writeToDatabase(updatedusers);
    console.log("Saldos dos usuários atualizados com sucesso");
}

updateBalance();