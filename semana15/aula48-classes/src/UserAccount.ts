import moment from 'moment';
import { Transaction } from './Transaction';

// 1. a) O construtor é um objeto que serve para quando seu app tem múltiplos objetos que contêm o mesmo tipo de informação. Ele é chamado por constructor(args){}
// 1. b) Uma vez
// 1/ c) Pela key new Classe


export class UserAccount {
  
    constructor(
        private name: string,
        private cpf: string,
        private age: number,
        private balance: number = 0,
        private transactions: Transaction[] = []
    ) {

    }

    getCpf = () => this.cpf
    getName = () => this.name
    getAge = () => this.age
    getBalance = () => this.balance
    getTransactions = () => this.transactions

    addTransaction(transaction: Transaction):void {
        this.transactions.push(transaction)
    }

    calculateBalance(): void {
        this.balance = 0;
        
        this.transactions.forEach(
            (transaction) => {
                const today: moment.Moment = moment()
                const dateAsObject = moment(transaction.getDate(), "DD/MM/YYYY")
    
                const difference = today.diff(dateAsObject, "days")
    
                if(difference >= 0) {
                    this.balance += transaction.getValue();
                }
            }
        )

    }
}
