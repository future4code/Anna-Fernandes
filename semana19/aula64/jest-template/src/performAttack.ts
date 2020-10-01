import { Character, validateCharacter } from "./validateCharacter";

// export const performAttack = (attacker: Character, defender: Character): void => {
//        if(!validateCharacter(attacker) || !validateCharacter(defender)) {
//            throw new Error("Invalid character")
//        }

//        if( attacker.defense > defender.defense ) {
//            defender.life =- attacker.strength - defender.defense;
//        }
// }

export const performAttack = (attacker: Character, defender: Character, validator: (input: Character) => boolean): void => {
       if(!validator(attacker) || !validator(defender)) {
           throw new Error("Invalid character")
       }

       if( attacker.strength > defender.defense ) {
           defender.life -= attacker.strength - defender.defense;
       }
}