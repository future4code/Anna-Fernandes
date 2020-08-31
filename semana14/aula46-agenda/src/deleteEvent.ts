import fs from "fs";
import moment from "moment";
moment.locale('pt-br');


const fileData: string = fs.readFileSync('./events.json').toString();

let events: any = JSON.parse(fileData);

const name: string = process.argv[2]

events = events.filter( (event: any) => {
    return event.name !== name
})

const eventsAsString: string = JSON.stringify(events, null, 3);
fs.writeFileSync('./events.json', eventsAsString)

console.log("Evento deletado!")