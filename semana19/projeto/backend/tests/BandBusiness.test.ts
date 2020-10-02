import { BandBusiness } from "../src/business/BandBusiness"
import { Band, BandInputDTO } from "../src/model/Band"
import { UserRole } from "../src/model/User"

const bandDatabase = {
    createBand: jest.fn(async(band: Band) => { }),
    getUserById: jest.fn((id: string) => undefined ),
    getBandByQuery: jest.fn((token: string) => undefined ),
    getAllBands: jest.fn(() => undefined )
} as any

const idGenerator = {
    generate: jest.fn(() => "id mock")
} as any

const authenticator = {
    generateToken: jest.fn((payload: {id: string, role: UserRole}) => "mocked token"),
    getData: jest.fn((token: string) => ({ id: "id", role: "ADMIN"}) )
} as any


const bandBusiness: BandBusiness = new BandBusiness(
    bandDatabase,
    idGenerator,
    authenticator
)

describe("Testing function createBand", () => {
    test("Should return error when there is no name", async() => {
        expect.assertions(2)

        const token = "ADMIN"
        const band:BandInputDTO = {
            name: "",
            music_genre: "ROCK",
            responsible: "Uma pessoa"
        }

        try {
            await bandBusiness.registerBand(token, band)
        } catch(error) {
            expect(error.message).toBe("Missing input.")
            expect(error.code).toBe(422)
        }
    });

    test("Should return error when the user is not an admin", async() => {
        expect.assertions(2)

        authenticator.getData = jest.fn((token: string) => ({ id: "id", role: "NOTADMIN"}) )

        const token = "ADMIN"
        const band:BandInputDTO = {
            name: "A Banda",
            music_genre: "ROCK",
            responsible: "Uma pessoa"
        }

        try {
            await bandBusiness.registerBand(token, band)
        } catch(error) {
            expect(error.message).toBe("You don't have permission to do that.")
            expect(error.code).toBe(401)
        }
    });

    test("Should register a band", async() => {
        
        authenticator.getData = jest.fn((token: string) => ({ id: "id", role: "ADMIN"}) )

        const token = "token"

        const band:BandInputDTO = {
            name: "A Banda",
            music_genre: "ROCK",
            responsible: "Uma pessoa"
        }

        await bandBusiness.registerBand(token, band)

        expect(bandDatabase.createBand).toHaveBeenCalledWith(
            "id mock",
            "A Banda",
            "ROCK",
            "Uma pessoa"
        );
    });
})