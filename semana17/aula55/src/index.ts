import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { UserDatabase } from './data/UserDatabase';
import { IdGenerator } from './services/IdGenerator';
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";
import { HashManager } from "./services/HashManager";
import { deleteUser } from "./endpoints/deleteUser";
import { getUserById } from "./endpoints/getUserById";


const app = express();
app.use(express.json());

app.post("/signup", signup)
app.post("/login", login)
app.get("/user/profile", getUserProfile)
app.delete("/user/:id", deleteUser)
app.get("/user/:id", getUserById)

dotenv.config();

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
