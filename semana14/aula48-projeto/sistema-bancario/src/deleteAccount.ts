import fs from "fs";
import { readDatabase, writeToDatabase } from "./index";

const deleteAccount = (name: string): void => {
    let users: any = readDatabase();
    const findUser = users.find( (user: any) => user.name === name)

    if(!findUser) {
        console.log("Não existe usuário com esse nome");
    } else { 
        users = users.filter( (user: any) => {
            return user.name !== name
        })
        
        writeToDatabase(users)
        console.log("Usuário deletado!")
    }
}

deleteAccount(process.argv[2])