import { ShowBusiness } from "../src/business/ShowBusiness"
import { Show, ShowInputDTO } from "../src/model/Show"
import { UserRole } from "../src/model/User"

const showDatabase = {
    createShow: jest.fn(async(show: Show) => { }),
    getShowById: jest.fn((id: string) => undefined ),
    getShowByDay: jest.fn((day: string) => undefined ),
    checkIfIsAvaiable: jest.fn(() => false )
} as any

const idGenerator = {
    generate: jest.fn(() => "id mock")
} as any

const authenticator = {
    generateToken: jest.fn((payload: {id: string, role: UserRole}) => "mocked token"),
    getData: jest.fn((token: string) => ({ id: "id", role: "ADMIN"}) )
} as any


const showBusiness: ShowBusiness = new ShowBusiness(
    showDatabase,
    idGenerator,
    authenticator
)

describe("Testing function addShow", () => {
    test("Should return error when there is no day", async() => {
        expect.assertions(2)

        const token = "ADMIN"
        const show: ShowInputDTO = {
            day: "",
            start_time: 9,
            end_time: 10,
            band_id: "id da banda"
        }

        try {
            await showBusiness.addShow(token, show)
        } catch(error) {
            expect(error.message).toBe("Missing input.")
            expect(error.code).toBe(422)
        }
    });

    test("Should return error when the user is not an admin", async() => {
        expect.assertions(2)

        authenticator.getData = jest.fn((token: string) => ({ id: "id", role: "NOTADMIN"}) )

        const token = "NOTADMIN"

        const show: ShowInputDTO = {
            day: "DAY1",
            start_time: 9,
            end_time: 10,
            band_id: "id da banda"
        }

        try {
            await showBusiness.addShow(token, show)
        } catch(error) {
            expect(error.message).toBe("You don't have permission to do that.")
            expect(error.code).toBe(401)
        }
    });

    test("Should register a band", async() => {
        
        authenticator.getData = jest.fn((token: string) => ({ id: "id", role: "ADMIN"}) )

        const token = "token"

        const show: ShowInputDTO = {
            day: "DAY1",
            start_time: 9,
            end_time: 10,
            band_id: "id da banda"
        }

        await showBusiness.addShow(token, show)

        expect(showDatabase.createShow).toHaveBeenCalledWith(
            "id mock",
            "DAY1",
            9,
            10,
            "id da banda"
        );
    });

    test("Should return error when the date is not avaible", async() => {
        expect.assertions(2)

        authenticator.getData = jest.fn((token: string) => ({ id: "id", role: "ADMIN"}) )

        showDatabase.checkIfIsAvaiable = jest.fn(() => true )

        const token = "ADMIN"

        const show: ShowInputDTO = {
            day: "DAY1",
            start_time: 9,
            end_time: 10,
            band_id: "id da banda"
        }

        try {
            await showBusiness.addShow(token, show)
        } catch(error) {
            expect(error.message).toBe("This date is not avaible.")
            expect(error.code).toBe(422)
        }
    });
})