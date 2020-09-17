import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { UserDatabase } from './data/UserDatabase';
import { IdGenerator } from './services/IdGenerator';
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";

// import bcrypt from 'bcryptjs';
// const saltRounds = 10;


dotenv.config();

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});


// const idGenerator = new IdGenerator();
// const id = idGenerator.generateId();

const user = new UserDatabase();

// user.createUser(id, "Amanda", "amandajonas@gmail.com", "123456");
const getUser = user.getUserByEmail("amandajonas@gmail.com")
console.log(getUser)

app.post("/signup", signup)
app.post("/login", login)
app.get("/user/profile", getUserProfile)