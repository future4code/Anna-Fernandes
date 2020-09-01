import { JSONFileManager } from './JSONFileManager';
import { UserAccount } from './UserAccount';
import moment from 'moment';
import { Transaction } from './Transaction';

export class Bank {
    private accounts: UserAccount[] = [];
    private fileManager: JSONFileManager = new JSONFileManager("data.json");

    constructor() {
        const fileData: any = this.fileManager.readDatabase();
        this.accounts = fileData.map(
            (item: any) => {
                const transactions = item.transactions.map(
                    (transaction: any) => new Transaction(
                        transaction.value,
                        transaction.description,
                        transaction.date
                    )
                )
                return new UserAccount(
                    item.name,
                    item.cpf,
                    item.age,
                    item.balance,
                    transactions
                )
            }
        )
    }

    createAccount(name: string, cpf: string, age: number): void {
        
        const duplicateAccount: UserAccount | undefined = this.accounts.find(
            (account: any) => {
                return account.getCpf() === cpf
            }
        )

        if(duplicateAccount) {
            throw new Error("Já existe uma conta cadastrada com esse cpf.")
        }

        if(age < 18) {
            throw new Error("Você deve ter mais do que 18 anos.")
        }

        this.accounts.push(
            new UserAccount(name, cpf, age)
        )

        this.fileManager.writeToDatabase(this.accounts)
    }

    getBalance(name: string, cpf: string): number {
        const user: UserAccount | undefined = this.accounts.find(
            (account: any) => {
                return account.getCpf() === cpf && account.getName() === name
            }
        )
        
        if(user) {
            return user.getBalance()
        } else {
            throw new Error("Usuário não encontrado");
        }
    }

    addBalance(name: string, cpf: string, value: number): void {
        const date: string = moment().format("DD/MM/YYYY");
        const description: string = "Depósito de dinheiro"
        
        this.accounts.forEach(
            (account) => {
                if(account.getCpf() === cpf && account.getName() === name) {
                    account.addTransaction(
                        new Transaction(
                            value,
                            description,
                            date
                        )
                    )
                }
            }
        )

        this.fileManager.writeToDatabase(this.accounts)
    }

    payBill(
        cpf: string, 
        value: number, 
        description: string, 
        date: string = moment().format("DD/MM/YYYY")
    ): void {
        value = Number(value)
        this.accounts.forEach(
            (account: any) => {
                const dateAsObject = moment(date, "DD/MM/YYYY")
                if(account.cpf === cpf && value < account.getBalance() && dateAsObject.diff(moment(), "days") >= 0) {
                    account.addTransaction(
                        new Transaction(
                           (value * (-1)),
                           description,
                           date
                        )
                    )
                    this.fileManager.writeToDatabase(this.accounts);
                    console.log("Conta paga com sucesso.")
                } else {
                    throw Error("Algo deu errado.")
                }
            }
        )
    }

    updateBalance(){
        this.accounts.forEach(
            (account) => {
                account.calculateBalance()
            }
        )

        this.fileManager.writeToDatabase(this.accounts)
    }

    makeTransfer(
        senderName: string,
        senderCpf: string,
        recipientName: string,
        recipientCpf: string,
        value: number
    ): void {
        const senderAccount: UserAccount | undefined = this.accounts.find(
            (account: any) => {
                return account.getCpf() === senderCpf && account.getName() === senderName
            }
        )
        const recipientAccount: UserAccount | undefined = this.accounts.find(
            (account: any) => {
                return account.getCpf() === recipientCpf && account.getName() === recipientName
            }
        )

        if(!senderAccount || !recipientAccount) {
            throw new Error("Contas não encontradas.")
        }

        this.accounts.forEach(
            (account) => {
                if(account.getCpf() === senderCpf && account.getName() === senderName) {
                    account.addTransaction(new Transaction (
                        value * -1,
                        "Transferência entre contas."
                    ))
                }

                if(account.getCpf() === recipientCpf && account.getName() === recipientName) {
                    account.addTransaction(new Transaction (
                        value,
                        "Transferência entre contas."
                    ))
                }
            }
        )

        this.fileManager.writeToDatabase(this.accounts)
    }
}