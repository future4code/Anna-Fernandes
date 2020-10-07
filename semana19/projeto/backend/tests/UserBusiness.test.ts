import { UserBusiness } from "../src/business/UserBusiness"
import { LoginInputDTO, stringToUserRole, User, UserInputDTO, UserRole } from "../src/model/User"

const userDatabase = {
    createUser: jest.fn(async(user: User) => { }),
    getUserByEmail: jest.fn((email: string) => undefined ),
    getUserById: jest.fn((id: string) => undefined ),
    getProfile: jest.fn((token: string) => undefined ),
    getAllUsers: jest.fn((role: string) => undefined )
} as any
const idGenerator = {
    generate: jest.fn(() => "id mock")
} as any
const hashManager = {
    hash: jest.fn((password: string) => "cypher password mock"),
    compare: jest.fn(async(s: string, hash: string) => false)
} as any
const authenticator = {
    generateToken: jest.fn((payload: {id: string, role: UserRole}) => "mocked token"),
    getData: jest.fn((token: string) => false )
} as any

const userBusiness: UserBusiness = new UserBusiness(
    userDatabase,
    idGenerator,
    hashManager,
    authenticator
)

describe.skip("Testing signup", () => {
    test("Should return error when there is no name", async() => {
        expect.assertions(2)

        const user:UserInputDTO = {
            email: "email@email.com",
            name: "",
            password: "123456",
            role: "NORMAL"
        }

        try {
            await userBusiness.createUser(user)
        } catch(error) {
            expect(error.message).toBe("Missing input.")
            expect(error.code).toBe(422)
        }
    });
    test("Should return error when there is no email", async() => {
        expect.assertions(2)

        const user:UserInputDTO = {
            email: "",
            name: "Nome",
            password: "123456",
            role: "NORMAL"
        }

        try {
            await userBusiness.createUser(user)
        } catch(error) {
            expect(error.message).toBe("Missing input.")
            expect(error.code).toBe(422)
        }
    });
    test("Should return error when there is no password", async() => {
        expect.assertions(2)

        const user:UserInputDTO = {
            email: "email@email.com",
            name: "Nome",
            password: "",
            role: "NORMAL"
        }

        try {
            await userBusiness.createUser(user)
        } catch(error) {
            expect(error.message).toBe("Missing input.")
            expect(error.code).toBe(422)
        }
    });
    test("Should return error when there is no role", async() => {
        expect.assertions(2)

        const user:UserInputDTO = {
            email: "email@email.com",
            name: "Nome",
            password: "123456",
            role: ""
        }

        try {
            await userBusiness.createUser(user)
        } catch(error) {
            expect(error.message).toBe("Missing input.")
            expect(error.code).toBe(422)
        }
    });
    test("Should return error when the email is in the wrong format", async() => {
        expect.assertions(2)

        const user:UserInputDTO = {
            email: "emailemail.com",
            name: "Nome",
            password: "123456",
            role: "NORMAL"
        }

        try {
            await userBusiness.createUser(user)
        } catch(error) {
            expect(error.message).toBe("Invalid email.")
            expect(error.code).toBe(422)
        }
    });
    test("Should return error when the password is in the wrong format", async() => {
        expect.assertions(2)

        const user:UserInputDTO = {
            email: "email@email.com",
            name: "Nome",
            password: "uva",
            role: "NORMAL"
        }

        try {
            await userBusiness.createUser(user)
        } catch(error) {
            expect(error.message).toBe("Invalid password.")
            expect(error.code).toBe(422)
        }
    });
    test.skip("Should return error when the role is in the wrong format", async() => {
        expect.assertions(2)

        const user:UserInputDTO = {
            email: "email@email.com",
            name: "Nome",
            password: "123456",
            role: "WRONGTYPE"
        }

        try {
            await userBusiness.createUser(user)
        } catch(error) {
            expect(error.message).toBe("Invalid user role.")
            expect(error.code).toBe(422)
        }
    });
    test("Should return an access token", async() => {

        const user:UserInputDTO = {
            email: "email@email.com",
            name: "Nome",
            password: "123456",
            role: "NORMAL"
        }

        const result = await userBusiness.createUser(user)

        expect(result).toBe("mocked token")
    });

});

describe.skip("Testing login", () => {
    test("Should return error when there is no email", async() => {
        expect.assertions(2)

        const login:LoginInputDTO = {
            email: "",
            password: "123456"
        }

        try {
            await userBusiness.getUserByEmail(login)
        } catch(error) {
            expect(error.message).toBe("Missing input.")
            expect(error.code).toBe(422)
        }
    });
    test("Should return error when there is no password", async() => {
        expect.assertions(2)

        const login:LoginInputDTO = {
            email: "email@email.com",
            password: ""
        }

        try {
            await userBusiness.getUserByEmail(login)
        } catch(error) {
            expect(error.message).toBe("Missing input.")
            expect(error.code).toBe(422)
        }
    });
    test("Should return error when there is no user linked to the email", async() => {
        expect.assertions(2)

        const login:LoginInputDTO = {
            email: "email@email.com",
            password: "123456"
        }

        try {
            await userBusiness.getUserByEmail(login)
        } catch(error) {
            expect(error.message).toBe("User not found.")
            expect(error.code).toBe(404)
        }
    });
    test("Should return error when the password is wrong", async() => {
        expect.assertions(2)

        userDatabase.getUserByEmail = jest.fn((email: string) => {
            return new User(
                "id",
                "Nome",
                "email@email.com.br",
                "123456",
                UserRole.ADMIN
            )
        })

        const login:LoginInputDTO = {
            email: "email@email.com",
            password: "123456"
        }

        try {
            await userBusiness.getUserByEmail(login)
        } catch(error) {
            expect(error.message).toBe("Invalid password!")
            expect(error.code).toBe(422)
        }

    });
    test("Should return an access token", async() => {

        hashManager.compare = jest.fn(async(s: string, hash: string) => true)

        const login:LoginInputDTO = {
            email: "email@email.com",
            password: "123456"
        }
        
        const result = await userBusiness.getUserByEmail(login)

        expect(result).toBe("mocked token")
    });
});

describe.skip("Testing UserBusiness.getUserById", () => {
  
    test("Should return 'User not found' when user does not exist", async () => {
      expect.assertions(2);
      try {
        await userBusiness.getUserById("invalid-id");
      } catch (err) {
        expect(err.code).toBe(404);
        expect(err.message).toBe("There is no user with this id.");
      }
    });

    test("Should return a user when all information is correct", async () => {
        userDatabase.getUserById = jest.fn(
          (id: string) =>
            new User(
              "id",
              "Astrodev",
              "astrodev@gmail.com",
              "hash",
              stringToUserRole("ADMIN")
            )
        );
    
        const user = await userBusiness.getUserById("id");
    
        expect(userDatabase.getUserById).toHaveBeenCalledWith("id");
        expect(user).toEqual({
            email: "astrodev@gmail.com",
            id: "id",
            name: "Astrodev",
            password: "hash",
            role: UserRole.ADMIN,
        });
    });
});

describe.skip("Testing UserBusiness.allUsers", () => {
  
    test("Should return error when user is NORMAL", async () => {
      expect.assertions(2);
      try {
        await userBusiness.getAllUsers(UserRole.NORMAL);
      } catch (err) {
        expect(err.code).toBe(401);
        expect(err.message).toBe("You don't have permission to do that.");
      }
    });

    test("Should return an array of users when user is ADMIN", async () => {
        
        authenticator.getData = jest.fn((token: string) => true )
        
        userDatabase.getAllUsers = jest.fn(() => [
        new User(
          "id",
          "Astrodev",
          "astrodev@gmail.com",
          "hash",
          stringToUserRole("ADMIN")
        ),
      ]);
    
      const result = await userBusiness.getAllUsers(UserRole.ADMIN);
  
      expect(userDatabase.getAllUsers).toHaveBeenCalledTimes(1);
      expect(result[0]).toEqual({
        id: "id",
        name: "Astrodev",
        email: "astrodev@gmail.com",
        password: "hash",
        role: UserRole.ADMIN,
      });
    });
  });

describe.skip("Testing UserBusiness.getProfile", () => {
  
    test("Should return error when user is not logged in", async () => {
        expect.assertions(2);

        try {
            const result = await userBusiness.getProfile("no-token");
        } catch (err) {
            expect(err.code).toBe(404);
            expect(err.message).toBe("No user found.");
        }
    });

    test("Should return an user when all information is correct", async () => {
        authenticator.getData = jest.fn((token: string) => true )

        userDatabase.getProfile = jest.fn(() => 
        new User(
          "id",
          "Astrodev",
          "astrodev@gmail.com",
          "hash",
          stringToUserRole("ADMIN")
        ),
      );
  
      const result = await userBusiness.getProfile("valid-id");
  
      expect(userDatabase.getProfile).toHaveBeenCalledTimes(1);
      
      expect(result).toEqual({
        id: "id",
        name: "Astrodev",
        email: "astrodev@gmail.com",
        password: "hash",
        role: UserRole.ADMIN,
      });
    });
  });