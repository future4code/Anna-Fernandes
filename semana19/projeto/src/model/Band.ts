export class Band{
    constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: BandRole
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

    setRole(role: BandRole){
        this.role = role;
    }

   static stringToBandRole(input: string): BandRole{
        switch (input) {
            case "NORMAL":
              return BandRole.NORMAL;
            case "ADMIN":
              return BandRole.ADMIN;
            default:
              throw new Error("Invalid Band role");
          }
    }

    static toBandModel(Band: any): Band {
        return new Band(Band.id, Band.name, Band.email, Band.password, Band.stringToBandRole(Band.role));
      }


}

export interface BandInputDTO{
    email: string;
    password: string;
    name: string;
    role: string;
}

export enum BandRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}