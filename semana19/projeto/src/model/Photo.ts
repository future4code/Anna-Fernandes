export class Photo{
    constructor(
        private id: string,
        private day: string,
        private photo: string,
    ){}
    
    getId(){
        return this.id;
    }
    
    getDay(){
        return this.day;
    }
    
    getPhoto(){
        return this.photo;
    }
    
    setId(){
        return this.id;
    }
    
    setDay(){
        return this.day;
    }
    
    setPhoto(){
        return this.photo;
    }
    
}

export interface PhotoInputDTO{
    day: string,
    photo: string
}