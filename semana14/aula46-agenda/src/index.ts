import moment from "moment";
moment.locale('pt-br');

type event = {
    name: string,
    description: string,
    startAt: moment.Moment,
    finishAt: moment.Moment
}

const allEvents: event[] = [
    {
        name: "Dentista",
        description: "Tratar canal e sofrer bastante",
        startAt: moment("03/09/2020 15:00", "DD/MM/YYYY HH:mm"),
        finishAt: moment("03/09/2020 16:00", "DD/MM/YYYY HH:mm")
    },
    {
        name: "Aniversário da Joana",
        description: "Aniversário virtual da Joana",
        startAt: moment("04/09/2020 20:00", "DD/MM/YYYY HH:mm"),
        finishAt: moment("04/09/2020 24:00", "DD/MM/YYYY HH:mm")
    }
]

const showEvents = (events: event[]): string[] => {
    const eventsToString = events.map( (event: event) => {
        const duration = event.finishAt.diff(event.startAt, "minutes");
        const today = moment();
        const daysUntilEvent = event.startAt.diff(today, "days");

        return `
            Nome: ${event.name}
            Horário de início: ${event.startAt.format("dddd, DD [de] MM [de] YYYY, HH:mm")}
            Horário de fim: ${event.finishAt.format("DD [de] MM [de] YYYY, HH:mm")}
            Descrição: ${event.description}
            Duração: ${duration} minutos
            Dias até o evento: ${daysUntilEvent} dias
        `
    });

    return eventsToString
}

// Se o evento acontecesse na Inglaterra, seria possível usar .utcOffset('0000');

const createEvent = (event: event): void => {
    const today = moment()
    const daysUntilEvent = event.startAt.diff(today, "days");

    if(!event.name || !event.description || !event.startAt || !event.finishAt) {
        console.error("\x1b[31m%s\x1b[0m", "Você precisa preencher todos os parâmentos :( . Tente outra vez")
        return;
    } else if(daysUntilEvent < 0) {
        console.error("\x1b[31m%s\x1b[0m", "Esse dia já aconteceu. Espero que você não tenha perdido esse evento super importante :(")
        return;
    } else {
        allEvents.push(event)
    }
}

const newEvent: event = {
    name: "Festa pós pandemia",
    description: "Comemoração somente para vacinados",
    startAt: moment("03/09/2021 01:00", "DD/MM/YYYY HH:mm"),
    finishAt: moment("03/09/2021 23:00", "DD/MM/YYYY HH:mm")
}

const eventInPast: event = {
    name: "Pandemia",
    description: "Começou a quarentena, adeus vida social",
    startAt: moment("04/04/2020 01:00", "DD/MM/YYYY HH:mm"),
    finishAt: moment("02/09/2021 23:00", "DD/MM/YYYY HH:mm")
}

createEvent(newEvent);
createEvent(eventInPast);
console.log(showEvents(allEvents))