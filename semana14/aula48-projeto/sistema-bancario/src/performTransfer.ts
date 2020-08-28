import { readDatabase, writeToDatabase, userAcount, transaction } from "./index";
import moment from "moment";
moment.locale('pt-br');

const perfomTransfer = (senderName: string, senderCpf: string, recipientName: string, recipientCpf: string, value: number ):void => {
    const users = readDatabase();
    const findSenderName = users.find( (user:userAcount) => user.name === senderName);
    const findSenderCpf = users.find( (user:userAcount) => user.cpf === senderCpf);
    const findRecipientName = users.find( (user:userAcount) => user.name === recipientName);
    const findRecipientCpf = users.find( (user:userAcount) => user.cpf === recipientCpf);

    if(findSenderName && findSenderCpf && findRecipientName && findRecipientCpf && findSenderName === findSenderCpf && findRecipientName === findRecipientCpf ) {
        if( value <= findSenderName.balance ) {

            const newUpdatedUsers = users.map( (user:userAcount) => {
                if( user === findRecipientName) {

                    const newTransaction:transaction = {
                        date: moment(),
                        value: value,
                        description: `Transferência bancária realizada por ${findSenderName.name}`
                    }

                    const transactionUpdated = user.transactions
                    transactionUpdated.push(newTransaction)

                    const userUptaded = {
                        ...user,
                        transactions: transactionUpdated
                    }
                    return userUptaded
                } else if ( user === findSenderName) {

                    const newTransaction:transaction = {
                        date: moment(),
                        value: -value,
                        description: `Transferência bancária realizada para ${findRecipientName.name}`
                    }

                    const transactionUpdated = user.transactions
                    transactionUpdated.push(newTransaction)

                    const userUptaded = {
                        ...user,
                        transactions: transactionUpdated
                    }
                    return userUptaded
                } else {
                    return user
                }
            })
            writeToDatabase(newUpdatedUsers);
            console.log(`Transferência realizada com sucesso! ${findRecipientName.name} vai ficar feliz.`)

        } else {
            console.log("Você não tem saldo suficiente para essa transação. A pessoa vai ter que aguardar.")
        }
    } else {
        console.log("Um ou mais usuário não foi identificado. Por favor, caro cliente, confira se os nomes e seus respectivos cpfs estão corretos.")
    }
}

perfomTransfer(
    process.argv[2],
    process.argv[3],
    process.argv[4],
    process.argv[5],
    Number(process.argv[6]),
);