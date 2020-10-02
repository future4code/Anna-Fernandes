export class Show{
    constructor(
        private id: string,
        private day: Day,
        private start_time: number,
        private end_time: number,
        private band_id: string,
    ){}

    getId(){
        return this.id;
    }

    getDay(){
        return this.day;
    }

    getStartTime(){
        return this.start_time;
    }

    getEndTime(){
        return this.end_time;
    }

    getBandId(){
        return this.band_id;
    }

    setId(){
        return this.id;
    }

    setDay(){
        return this.day;
    }

    setStartTime(){
        return this.start_time;
    }

    setEndTime(){
        return this.end_time;
    }

    setBandId(){
        return this.band_id;
    }


    static toShowModel(Show: any): Show {
        return new Show(Show.id, stringToDay(Show.day), Show.start_time, Show.end_time, Show.band_id);
    }

}

export const stringToDay = (input: string): Day => {
    switch (input) {
        case "DAY1":
          return Day.DAY1;
        case "DAY2":
          return Day.DAY2;
        case "DAY3":
          return Day.DAY3;
        default:
          throw new Error("Invalid user role");
      }
}

export interface ShowInputDTO{
    day: string,
    start_time: number,
    end_time: number,
    band_id: string,
}

export enum Day {
    DAY1 = "DAY1",
    DAY2 = "DAY2",
    DAY3 = "DAY3"
}