import * as fs from 'fs';
import moment from 'moment';
moment.locale('pt-br');

export function readDatabase(): any {
  try {
    const fileData: string = fs.readFileSync('./data.json').toString()
    return JSON.parse(fileData)
  } catch (error) {
    console.log("Erro ao ler a base de dados: " + error.message)
    return []
  }
}

export function writeToDatabase(data: any): void {
  try {
    const dataAsString: string = JSON.stringify(data, null, 2)
    fs.writeFileSync('./data.json', dataAsString)
  } catch (error) {
    console.log("Erro ao salvar os dados: " + error.message)
  }
}

export type transaction = {
  date: moment.Moment,
  value: number,
  description: string
}

export type userAcount = {
  name: string,
  cpf: string,
  balance: number,
  dateOfBirth: moment.Moment,
  transactions: transaction[]
}