import { readDatabase } from "./index";

const getAllAccounts = () => {
    const allAcounts = readDatabase();
    return allAcounts
}
console.log('Todas as contas:')
getAllAccounts()