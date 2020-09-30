import { UserBusiness } from "../src/business/UserBusiness"
import { stringToUserRole, User, UserRole } from "../src/model/User"
const userDatabase = {
    createUser: jest.fn(async(user: User) => { }),
    getUserByEmail: jest.fn((email: string) => undefined ),
    getUserById: jest.fn((id: string) => undefined ),
    getProfile: jest.fn((id: string) => undefined ),
    getAllUsers: jest.fn((role: string) => undefined )
} as any
const idGenerator = {
    generate: jest.fn(() => "id mock")
} as any
const hashGenerator = {
    hash: jest.fn((password: string) => "cypher password mock"),
    compareHash: jest.fn(async(s: string, hash: string) => false)
} as any
const tokenGenerator = {
    generate: jest.fn((payload: {id: string, role: UserRole}) => "mocked token")
} as any

const userBusiness: UserBusiness = new UserBusiness(
    userDatabase,
    idGenerator,
    hashGenerator,
    tokenGenerator
)

describe("Testing signup", () => {
    test("Should return error when there is no name", async() => {
        expect.assertions(2)

        try {
            await userBusiness.signup(
                "",
                "email@email.com",
                "123456",
                "NORMAL"
            )
        } catch(error) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return error when there is no email", async() => {
        expect.assertions(2)

        try {
            await userBusiness.signup(
                "Nome",
                "",
                "123456",
                "NORMAL"
            )
        } catch(error) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return error when there is no password", async() => {
        expect.assertions(2)

        try {
            await userBusiness.signup(
                "Nome",
                "email@email.com",
                "",
                "NORMAL"
            )
        } catch(error) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return error when there is no role", async() => {
        expect.assertions(2)

        try {
            await userBusiness.signup(
                "Nome",
                "email@email.com",
                "123456",
                ""
            )
        } catch(error) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return error when the email is in the wrong format", async() => {
        expect.assertions(2)

        try {
            await userBusiness.signup(
                "Nome",
                "emailemail.com",
                "123456",
                "NORMAL"
            )
        } catch(error) {
            expect(error.message).toBe("Invalid email")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return error when the password is in the wrong format", async() => {
        expect.assertions(2)

        try {
            await userBusiness.signup(
                "Nome",
                "email@email.com",
                "uva",
                "NORMAL"
            )
        } catch(error) {
            expect(error.message).toBe("Invalid password")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return error when the role is in the wrong format", async() => {
        expect.assertions(2)

        try {
            await userBusiness.signup(
                "Nome",
                "email@email.com",
                "123456",
                "WRONGTYPE"
            )
        } catch(error) {
            expect(error.message).toBe("Invalid user role")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return an access token", async() => {
        
        const result = await userBusiness.signup(
            "Nome",
            "email@email.com",
            "123456",
            "NORMAL"
        )

        expect(result.accessToken).toBe("mocked token")
    });

});

describe("Testing login", () => {
    test("Should return error when there is no email", async() => {
        expect.assertions(2)

        try {
            await userBusiness.login(
                "",
                "123456"
            )
        } catch(error) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return error when there is no password", async() => {
        expect.assertions(2)

        try {
            await userBusiness.login(
                "email@email.com",
                ""
            )
        } catch(error) {
            expect(error.message).toBe("Missing input")
            expect(error.statusCode).toBe(422)
        }
    });
    test("Should return error when there is user linked to the email", async() => {
        expect.assertions(2)

        try {
            await userBusiness.login(
                "email@email.com",
                "123456"
            )
        } catch(error) {
            expect(error.message).toBe("User not found")
            expect(error.statusCode).toBe(404)
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

        try {
            await userBusiness.login(
                "email@email.com",
                "123457"
            )
        } catch(error) {
            expect(error.message).toBe("Invalid password")
            expect(error.statusCode).toBe(422)
        }

    });
    test("Should return an access token", async() => {
        hashGenerator.compareHash = jest.fn(async(s: string, hash: string) => true)
        
        const result = await userBusiness.login(
            "email@email.com",
            "123456"
        )

        expect(result.accessToken).toBe("mocked token")
    });
});

describe("Testing UserBusiness.getUserById", () => {
  
    test("Should return 'User not found' when user does not exist", async () => {
      expect.assertions(2);
      try {
        await userBusiness.getUserById("invalid-id");
      } catch (err) {
          console.log(err)
        expect(err.statusCode).toBe(404);
        expect(err.message).toBe("User not found");
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
          id: "id",
          name: "Astrodev",
          email: "astrodev@gmail.com",
          role: UserRole.ADMIN,
        });
    });
});

describe("Testing UserBusiness.allUsers", () => {
  
    test("Should return 'You must be an admin to access this endpoint' when user is NORMAL", async () => {
      expect.assertions(2);
      try {
        await userBusiness.getAllUsers(UserRole.NORMAL);
      } catch (err) {
        expect(err.statusCode).toBe(404);
        expect(err.message).toBe("You must be an admin to access this endpoint");
      }
    });

    test("Should return an array of users when user is ADMIN", async () => {
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
      expect(result).toContainEqual({
        id: "id",
        name: "Astrodev",
        email: "astrodev@gmail.com",
        role: UserRole.ADMIN,
      });
    });
  });

describe("Testing UserBusiness.getProfile", () => {
  
    test("Should return 'User not found' when user is wrong", async () => {
        expect.assertions(2);
        try {
          await userBusiness.getProfile("invalid-id");
        } catch (err) {
            console.log(err)
          expect(err.statusCode).toBe(404);
          expect(err.message).toBe("User not found");
        }
    });

    test("Should return an user when all information is correct", async () => {
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
        role: UserRole.ADMIN,
      });
    });
  });