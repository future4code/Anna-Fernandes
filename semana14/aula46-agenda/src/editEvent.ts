import fs from "fs";
import moment from "moment";
moment.locale('pt-br');

type event = {
    name: string,
    description: string,
    startAt: moment.Moment,
    finishAt: moment.Moment
}

const fileData: string = fs.readFileSync('./events.json').toString();

let events: any = JSON.parse(fileData);

const name: string = process.argv[2]
const date: moment.Moment = moment(process.argv[3], "DD/MM/YYYY HH:mm")

events = events.map( (event: any) => {
    if(event.name.includes(name)) {
        const newEvent: any = {
            ...event,
            finishAt: date
        } 
        return newEvent
    } else {
        return event
    }
})

const eventsAsString: string = JSON.stringify(events, null, 3);

fs.writeFileSync('./events.json', eventsAsString)

console.log("Evento alterado com sucesso!")