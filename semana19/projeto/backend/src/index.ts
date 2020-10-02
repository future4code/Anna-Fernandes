import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";
import { eventRouter } from "./routes/eventRouter";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);
app.use("/event", eventRouter);

const server = app.listen(3001, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });