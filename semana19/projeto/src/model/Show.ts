export class Show{
    constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: ShowRole
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getRole(){
        return this.role;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setEmail(email: string){
        this.email = email;
    }

    setPassword(password: string){
        this.password = password;
    }

    setRole(role: ShowRole){
        this.role = role;
    }

   static stringToShowRole(input: string): ShowRole{
        switch (input) {
            case "NORMAL":
              return ShowRole.NORMAL;
            case "ADMIN":
              return ShowRole.ADMIN;
            default:
              throw new Error("Invalid Show role");
          }
    }

    static toShowModel(Show: any): Show {
        return new Show(Show.id, Show.name, Show.email, Show.password, Show.stringToShowRole(Show.role));
      }


}

export interface ShowInputDTO{
    email: string;
    password: string;
    name: string;
    role: string;
}

export enum ShowRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}