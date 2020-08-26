import fs from "fs";
import moment from "moment";
moment.locale('pt-br');


const fileData: any = fs.readFileSync('./events.json').toString();

console.log(fileData)