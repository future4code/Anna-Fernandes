export class Show{
    constructor(
        private id: string,
        private week_day: WeekDay,
        private start_time: number,
        private end_time: number,
        private band_id: string,
    ){}

    getId(){
        return this.id;
    }

    setId(id: string){
        this.id = id;
    }

    static stringToWeekDay(input: string): WeekDay{
        switch (input) {
            case "SEXTA":
              return WeekDay.SEXTA;
            case "SABADO":
              return WeekDay.SABADO;
            case "DOMINGO":
              return WeekDay.DOMINGO;
            default:
              throw new Error("Invalid user role");
          }
    }

    static toShowModel(Show: any): Show {
        return new Show(Show.id, Show.stringToWeekDay(Show.week_day), Show.start_time, Show.end_time, Show.band_id);
    }

}

export interface ShowInputDTO{
    week_day: WeekDay,
    start_time: number,
    end_time: number,
    band_id: string,
}

export enum WeekDay {
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}