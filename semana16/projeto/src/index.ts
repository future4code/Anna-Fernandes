import knex from 'knex';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { AddressInfo } from 'net';

dotenv.config();

const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
});

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
    if(server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is runnig in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});


// Criar usuários

const createUser = async(
    name: string,
    nickname: string,
    email: string,

): Promise<void> => {
    await connection
    .insert({
        id: Date.now().toString(),
        name,
        nickname,
        email,
    })
    .into("ToDoListUser")
    console.log("Usuário adicionado com sucesso.")
}

app.put("/user", async (req:Request, res:Response) => {
    try {
        await createUser(
            req.body.name,
            req.body.nickname,
            req.body.email,
        )

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})


// Pegar usuário pelo id

const getUserById = async(id:string): Promise<any> => {
    const result = await connection.raw(`
        SELECT * FROM ToDoListUser WHERE id = '${id}'
    `)
    return result[0][0]
}

app.get("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);

        res.status(200).send(user)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})


// Editar usuário

const updateUser = async(id: string, name: string, nickname: string): Promise<void> => {
    try {
        await connection("ToDoListUser")
        .update({
            name,
            nickname
        })
        .where("id", id);
        console.log("Usuário alterado com sucesso!")
    } catch(err) {
        console.log(err.message)
    }
}

app.post("/user/edit/:id", async (req:Request, res:Response) => {
    try {
        await updateUser(
            req.params.id,
            req.body.name,
            req.body.nickname
        )
        res.status(200).send({
            message: "Usuário alterado com sucesso",
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})


// Criar tarefa


const createTask = async(
    title: string,
    description: string,
    limitDate: string,
    creatorUserId: string,

): Promise<void> => {
    await connection
    .insert({
        taskId: Date.now().toString(),
        title,
        description,
        limitDate,
        creatorUserId
    })
    .into("ToDoListTask")
    console.log("Usuário adicionado com sucesso.")
}

app.put("/task", async (req:Request, res:Response) => {
    try {
        await createTask(
            req.body.title,
            req.body.description,
            req.body.limitDate,
            req.body.creatorUserId,
        )

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})


// Pegar tarefa pelo id

const getTaskById = async(id:string): Promise<any> => {
    const result = await connection.raw(`
        SELECT * FROM ToDoListTask WHERE id = '${id}'
    `)
    return result[0][0]
}

app.get("/task/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const task = await getTaskById(id);

        res.status(200).send(task)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})



// Pegar todos os usuários

async function getAllUsers(): Promise<any> {
    try {
        const result = await connection.raw(`
            SELECT * FROM ToDoListUser
            `)
        console.log(result[0])
        return result[0]
    } catch (error) {
        console.log(error.message)
    }
}

app.get("/user/all", async (req:Request, res:Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).send({
            users: users,
        })

    } catch(err) {
        res.status(400).send({
            message: err
        })
    }
})

getAllUsers()


// Pegar tarefas criadas por um usuário
// Pesquisar usuário 
// Atribuir um usuário responsável a uma tarefa
// Pegar usuários responsáveis por uma tarefa
// Pegar tarefa pelo id
// Atualizar o status da tarefa
// Pegar todas as tarefas por status 
// Pegar todas as tarefas atrasadas
// Retirar um usuário responsável de uma tarefa
// Atribuir mais de um responsável a uma tarefa
// Procurar tarefa por termos 
// Atualizar o status de várias tarefas
// Deletar tarefa
// Deletar usuário
