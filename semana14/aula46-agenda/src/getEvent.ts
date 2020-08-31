import fs from "fs";
import moment from "moment";
moment.locale('pt-br');


const fileData: string = fs.readFileSync('./events.json').toString();

let events: any = JSON.parse(fileData);

const name: string = process.argv[2]
const date: moment.Moment = moment(process.argv[3], "DD/MM/YYYY HH:mm")

events = events.filter( (event: any) => {
    if(event.name.includes(name)) {
        return event
    }
})

const eventsAsString: string = JSON.stringify(events, null, 3);

console.log(eventsAsString)