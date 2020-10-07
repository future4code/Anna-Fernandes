export class Photo{
    constructor(
        private id: string,
        private event_id: string,
        private photo: string,
    ){}
    
    getId(){
        return this.id;
    }
    
    getEventId(){
        return this.event_id;
    }
    
    getPhoto(){
        return this.photo;
    }
    
    setId(){
        return this.id;
    }
    
    setEventId(){
        return this.event_id;
    }
    
    setPhoto(){
        return this.photo;
    }
    
}

export interface PhotoInputDTO{
    event_id: string,
    photo: string
}