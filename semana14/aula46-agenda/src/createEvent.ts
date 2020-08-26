import fs from "fs";
import moment from "moment";
moment.locale('pt-br');


const fileData: string = fs.readFileSync('./events.json').toString();

let events: any = JSON.parse(fileData);

const name: string = process.argv[2]
const description: string = process.argv[3]
const startAt: moment.Moment = moment(process.argv[4], "DD/MM/YYYY HH:mm")
const finishAt: moment.Moment = moment(process.argv[5], "DD/MM/YYYY HH:mm")

const checkDate = events.indexOf((event: any) => startAt);

if(!name || !description || !startAt || !finishAt ) {
    console.error("\x1b[31m%s\x1b[0m", "Você precisa preencher todos os parâmentos :( . Tente outra vez")
} else if(checkDate !== -1) {
    console.error("\x1b[31m%s\x1b[0m", "Já existe um evento casatrado nessa data. Não se sobrecarregue! :( ")
} else {
    events.push({
        name,
        description,
        startAt,
        finishAt
    })
}

const eventsAsString: string = JSON.stringify(events, null, 3);

fs.writeFileSync('./events.json', eventsAsString)

console.log("Evento criado com sucesso!");