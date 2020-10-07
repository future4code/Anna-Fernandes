export class Ticket{
    constructor(
        private id: string,
        private event_id: string,
        private ticket_name: string,
        private ticket_price: number,
        private ticket_quantity: number,
        private ticket_sold: number = 0
    ){}
    
    getId(){
        return this.id;
    }

    getTicketName(){
        return this.ticket_name;
    }

    getTicketPrice(){
        return this.ticket_price;
    }

    getEventId(){
        return this.event_id;
    }

    getTicketQuantity(){
        return this.ticket_quantity;
    }

    getTicketSold(){
        return this.ticket_sold;
    }

    setId(){
        return this.id;
    }

    setTicketName(){
        return this.ticket_name;
    }

    setTicketPrice(){
        return this.ticket_price;
    }

    setEventId(){
        return this.event_id;
    }

    setTicketQuantity(){
        return this.ticket_quantity;
    }

    setTicketSold(){
        return this.ticket_sold;
    }
    
    static toTicketsModel(Ticket: any): Ticket {
        return new Ticket(Ticket.id, Ticket.event_id, Ticket.ticket_name, Ticket.ticket_price, Ticket.ticket_quantity, Ticket.ticket_sold);
    }
}

export interface TicketInputDTO{
    event_id: string,
    ticket_name: string,
    ticket_price: number,
    ticket_quantity: number
}

export interface UserTicketInputDTO{
    ticket_id: string,
    ticket_quantity: number,
}
