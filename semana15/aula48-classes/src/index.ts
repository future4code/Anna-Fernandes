import moment from 'moment';
import fs from 'fs';


class UserAccount {
    private cpf: string;
    private name: string;
    private age: number;
    private balance: number = 0;
    private transactions: Transaction[] = [];
  
    constructor(
       cpf: string,
       name: string,
       age: number,
    ) {
       console.log("Chamando o construtor da classe UserAccount")
       this.cpf = cpf;
       this.name = name;
       this.age = age;
    }

    public getName(): string {
        return this.name
    }

    public getCpf(): string {
        return this.cpf
    }

    public getBalance(): number {
        return this.balance
    }

}

const userOne: UserAccount = new UserAccount("111.111.111-11", "Felizberto Rico", 45)
console.log(userOne)

// 1. a) Ele é chamado por constructor(args){}
// 1. b) Uma vez
// 1/ c) Pelo new Classe


class Transaction {
    private date: string;
    private value: number;
    private description: string;

    constructor(date: string, value: number, description: string) {
        console.log("Chamando o construtor da classe Transaction")
        this.date = date;
        this.value = value;
        this.description = description;
    }
}

const transactionOne: Transaction = new Transaction("31/08/2020", 50, "Pagando boleto")
console.log(transactionOne)

class Bank {
    private accounts: UserAccount[];
    private fileManager: JSONFileManager;

    constructor(accounts: UserAccount[], fileManager: JSONFileManager) {
        this.accounts = accounts;
        this.fileManager = new JSONFileManager("data.json")
    }
}

class JSONFileManager {
    private fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    public readDatabase(): Object {
        try {
            const fileData: string = fs.readFileSync(this.fileName).toString()
            return JSON.parse(fileData)
            
        } catch(err) {
            console.log(`Erro ao ler a base de dados: ${err.message}`);
            return []
        }
    }

    public writeToDatabase(data: any): void {
        try {
            const dataAsString: string = JSON.stringify(data, null, 3)
            fs.writeFileSync(this.fileName, dataAsString)
        } catch(err) {
            console.log(`Erro ao ler a base de dados: ${err.message}`);
        }
    }
}