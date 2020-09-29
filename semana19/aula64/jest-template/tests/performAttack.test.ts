import { performAttack } from "../src/performAttack"
import { Character } from "../src/validateCharacter"

describe("Testing function performAttack", () => {

    const mockValidCharacter = jest.fn(() => {
        return true
    })
    
    const mockInvalidCharacter = jest.fn(() => {
        return false
    })

    test("Should perform attack", () => {

        const attacker: Character = {
            name: "Scorpion",
            life: 1250,
            defense: 150,
            strength: 550
        }

        const defender: Character = {
            name: "Kitana",
            life: 1250,
            defense: 300,
            strength: 750
        }

        performAttack(attacker, defender, mockValidCharacter as any);

        expect(defender.life).toEqual(1000);
        expect(mockValidCharacter).toHaveBeenCalled();
        expect(mockValidCharacter).toHaveBeenCalledTimes(2);
        expect(mockValidCharacter).toHaveReturnedTimes(2);
    })

    test("Should return invalid character error", () => {

        const attacker: Character = {
            name: "Scorpion",
            life: 1250,
            defense: 150,
            strength: 550
        }

        const defender: Character = {
            name: "",
            life: 1250,
            defense: 300,
            strength: 750
        }

        try {
            performAttack(attacker, defender, mockInvalidCharacter as any);
        } catch(err) {
            expect(err.message).toBe("Invalid character");
            expect(mockInvalidCharacter).toHaveBeenCalled();
            expect(mockInvalidCharacter).toHaveBeenCalledTimes(1);
            expect(mockInvalidCharacter).toHaveReturnedTimes(1);
        }

    })

    test("Should return invalid character error", () => {

        const attacker: Character = {
            name: "Scorpion",
            life: 1250,
            defense: 150,
            strength: 550
        }

        const defender: Character = {
            name: "Kitana",
            life: 1250,
            defense: 0,
            strength: 750
        }

        try {
            performAttack(attacker, defender, mockInvalidCharacter as any);
        } catch(err) {
            expect(err.message).toBe("Invalid character");
            expect(mockInvalidCharacter).toHaveBeenCalled();
            expect(mockInvalidCharacter).toHaveBeenCalledTimes(2);
            expect(mockInvalidCharacter).toHaveReturnedTimes(2);
        }

    })

    test("Should return invalid character error", () => {

        const attacker: Character = {
            name: "Scorpion",
            life: 1250,
            defense: 150,
            strength: 0
        }

        const defender: Character = {
            name: "Kitana",
            life: 1250,
            defense: 300,
            strength: 750
        }

        try {
            performAttack(attacker, defender, mockInvalidCharacter as any);
        } catch(err) {
            expect(err.message).toBe("Invalid character");
            expect(mockInvalidCharacter).toHaveBeenCalled();
            expect(mockInvalidCharacter).toHaveBeenCalledTimes(3);
            expect(mockInvalidCharacter).toHaveReturnedTimes(3);
        }

    })

    test("Should perform attack, a life should remains the same", () => {

        const attacker: Character = {
            name: "Scorpion",
            life: 1250,
            defense: 150,
            strength: 550
        }

        const defender: Character = {
            name: "Kitana",
            life: 1250,
            defense: 600,
            strength: 750
        }

        performAttack(attacker, defender, mockValidCharacter as any);

        expect(defender.life).toEqual(1250);
        expect(mockValidCharacter).toHaveBeenCalled();
        expect(mockValidCharacter).toHaveBeenCalledTimes(4);
        expect(mockValidCharacter).toHaveReturnedTimes(4);
    })
})

