export class Band{
    constructor(
        private id: string,
        private name: string,
        private music_genre: MusicGenre,
        private responsible: string
    ){}
    
    getId(){
        return this.id;
    }
    
    getName(){
        return this.name
    }
    
    getMusicGenre(){
        return this.music_genre
    }
    
    getResponsible(){
        return this.responsible
    }
    
    
    setId(id: string){
        this.id = id;
    }
    
    setName(name: string){
        this.name = name;
    }
    
    setMusicGenre(music_genre: MusicGenre){
        this.music_genre = music_genre;
    }
    
    setResponsible(responsible: string){
        this.responsible = responsible;
    }
    
   static stringToMusicGenre(input: string): MusicGenre{
        switch (input) {
            case "ROCK":
              return MusicGenre.ROCK;
            case "INDIE":
              return MusicGenre.INDIE;
            case "METAL":
              return MusicGenre.METAL;
            case "HIPHOP":
              return MusicGenre.HIPHOP;
            case "FUNK":
              return MusicGenre.FUNK;
            case "POPULAR":
              return MusicGenre.POPULAR;
            default:
              throw new Error("Invalid Music Genre");
          }
    }

    static toBandModel(Band: any): Band {
        return new Band(Band.id, Band.name, Band.stringToMusicGenre(Band.music_genre), Band.responsible);
    }


}

export interface BandInputDTO{
    name: string;
    music_genre: string;
    responsible: string;
}

export enum MusicGenre{
    ROCK = "ROCK",
    INDIE = "INDIE",
    METAL = "METAL",
    HIPHOP = "HIPHOP",
    FUNK = "FUNK",
    POPULAR = "POPULAR"
}