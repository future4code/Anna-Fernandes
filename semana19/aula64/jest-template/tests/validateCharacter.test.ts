import { validateCharacter } from "../src/validateCharacter"

describe( "Testing function validateCharacter", () => {
    test("Should retur false for empty name", () => {
        const result = validateCharacter({
            name: "",
            life: 1500,
            strength: 300,
            defense: 500
        });
        expect(result).toBe(false)
    });

    test("Should retur false for empty life", () => {
        const result = validateCharacter({
            name: "Astrodiva",
            life: Number(""),
            strength: 300,
            defense: 500
        });
        expect(result).toBe(false)
        
    })

    test("Should retur false for empty strength", () => {
        const result = validateCharacter({
            name: "Astrodiva",
            life: 1500,
            strength: Number(""),
            defense: 500
        });
        expect(result).toBe(false)

    })

    test("Should retur false for empty defense", () => {
        const result = validateCharacter({
            name: "Astrodiva",
            life: 1500,
            strength: 300,
            defense: Number("")
        });
        expect(result).toBe(false)

    })

    test("Should retur false for life, strength or defense less than 0", () => {
        const result = validateCharacter({
            name: "Astrodiva",
            life: -5,
            strength: 300,
            defense: 500
        });
        expect(result).toBe(false)

    })

    test("Should retur false for life, strength or defense equal 0", () => {
        const result = validateCharacter({
            name: "Astrodiva",
            life: 1500,
            strength: 0,
            defense: 500
        });
        expect(result).toBe(false)

    })

    test("Should return true a valid object", () => {
        const result = validateCharacter({
            name: "Astrodiva",
            life: 1500,
            strength: 300,
            defense: 500
        });
        expect(result).toBe(true)

    })
})