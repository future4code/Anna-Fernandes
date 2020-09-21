import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { deleteUser } from "./controller/deleteUset";
import { getAll } from "./controller/getAll";
import { login } from "./controller/login";
import { signup } from "./controller/signUp";

dotenv.config()

const app = express();
app.use(express.json());

app.put("/signup", signup)
app.post("/login", login)
app.get("/all", getAll)
app.delete("/:id", deleteUser)

app.get("/teste", async (req: Request, res: Response) => {

    try {
        res.status(200).send("Oi, seu server está funcionando!");
    } catch (error) {

        res.status(400).send("ERRO");

    }
});


const server = app.listen(3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
