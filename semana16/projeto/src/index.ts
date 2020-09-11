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
            users: users
        })

    } catch(err) {
        res.status(400).send({
            message: err
        })
    }
})

// Pegar todas as tarefas por status 
const getTaksByStatus = async (status: string): Promise<any> => {
    try {
        const result = await connection.raw(`
            SELECT t.id, t.title, t.description, t.limit_date, t.creator_user_id, t.status, u.nickname as creatorUserNickname 
            FROM ToDoListTask t
            INNER JOIN ToDoListUser u 
            ON t.creator_user_id = u.id
            WHERE t.status = "${status}"
        `)
        
        const newResponse = result[0][0];
        const formatDate = newResponse.limit_date.toLocaleDateString('en-GB');
        
        const newResult = {...newResponse, limit_date: formatDate};
        return newResult
        
    } catch(err) {
        console.log(err.message)
    }
}

app.get("/task", async (req: Request, res: Response) => {
    try {
        const status = req.query.status as string;
        const tasks = await getTaksByStatus(status);
        if(tasks) {
            res.status(200).send(tasks)
        } else {
            res.status(200).send([])
        }
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// Pegar todas as tarefas atrasadas

const searchTaksByLateStatus = async (): Promise<any> => {
    try {
        const result = await connection.raw(`
            SELECT t.id, t.title, t.description, t.limit_date, t.creator_user_id, t.status, u.nickname as creatorUserNickname 
            FROM ToDoListTask t
            INNER JOIN ToDoListUser u 
            ON t.creator_user_id = u.id
            WHERE t.status = "delayed"
        `)
        
        const newResponse = result[0][0];
        const formatDate = newResponse.limit_date.toLocaleDateString('en-GB');
        
        const newResult = {...newResponse, limit_date: formatDate};
        return newResult
        
    } catch(err) {
        console.log(err.message)
    }
}

app.get("/task/delayed", async (req: Request, res: Response) => {
    try {
        const tasks = await searchTaksByLateStatus();
        if(tasks) {
            res.status(200).send(tasks)
        } else {
            res.status(200).send([])
        }
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

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
    try {
        const result = await connection.raw(`
        SELECT * FROM ToDoListUser WHERE id = '${id}'
        `)
        if(result) {
            return result[0][0]
        } else {
            return "Usuário não encontrado."
        }
    } catch(err) {
        console.log(err.message)
    }
}

app.get("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);

        if(user) {
            res.status(200).send(user)
        } else {
            res.status(200).send([])
        }

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
    limit_date: Date,
    creator_user_id: string,

): Promise<void> => {
    await connection
    .insert({
        id: Date.now().toString(),
        title,
        description,
        limit_date,
        creator_user_id
    })
    .into("ToDoListTask")
    console.log("Usuário adicionado com sucesso.")
}

app.put("/task", async (req:Request, res:Response) => {
    try {
        await createTask(
            req.body.title,
            req.body.description,
            new Date(req.body.limit_date),
            req.body.creator_user_id,
        )

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})


// Pegar tarefa pelo id

const getTaskById = async(id:string): Promise<any> => {
    try {
        const result = await connection.raw(`
            SELECT t.id, t.title, t.description, t.limit_date, t.creator_user_id, t.status , u.nickname as creatorUserNickname 
            FROM ToDoListTask t
            INNER JOIN ToDoListUser u 
            ON t.creator_user_id = u.id
            WHERE t.id = "${id}"
        `)

        const newResponse = result[0][0];
        const formatDate = newResponse.limit_date.toLocaleDateString('en-GB');

        const newResult = {...newResponse, limit_date: formatDate};
        return newResult

    } catch(err) {
        console.log(err.message)
    }
}

app.get("/task/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const task = await getTaskById(id);
        if(task) {
            res.status(200).send(task)
        } else {
            res.status(200).send([])
        }
    } catch(err) {
        res.status(400).send({
            message: err
        })
    }
})


// Pegar tarefas criadas por um usuário

const getTaskByUserCreator = async(id:string): Promise<any> => {
    try {
        const result = await connection.raw(`
            SELECT t.id, t.title, t.description, t.limit_date, t.creator_user_id, t.status, u.nickname as creatorUserNickname 
            FROM ToDoListTask t
            INNER JOIN ToDoListUser u 
            ON t.creator_user_id = u.id
            WHERE t.creator_user_id = "${id}"
        `)

        const newResponse = result[0][0];
        const formatDate = newResponse.limit_date.toLocaleDateString('en-GB');

        const newResult = {...newResponse, limit_date: formatDate};
        return newResult

    } catch(err) {
        console.log(err.message)
    }
}

app.get("/task", async (req: Request, res: Response) => {
    try {
        const id = req.query.creator_user_id as string;
        const task = await getTaskByUserCreator(id);
        if(task) {
            res.status(200).send(task)
        } else {
            res.status(200).send([])
        }
    } catch(err) {
        res.status(400).send({
            message: err
        })
    }
})

// Pesquisar usuário 

const searchUser = async (query: string): Promise<any> => {
    try {
        const result = await connection.raw(`
          SELECT ToDoListUser.id, ToDoListUser.nickname FROM ToDoListUser WHERE nickname = "${query}" OR email = "${query}"
        `)
        console.log(result[0])
        return result[0]
        
    } catch(err) {
        console.log(err.message)
    }
}

app.get("/user", async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string;
        const tasks = await searchUser(query);
        if(tasks) {
            res.status(200).send(tasks)
        } else {
            res.status(200).send([])
        }
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})


// Atribuir um usuário responsável a uma tarefa

const setResponsibleUserForTask = async (task_id: string, responsible_user_id: string): Promise<any> => {
    try {
        await connection.raw(`
          INSERT INTO ToDoListResponsibleUserTaskRelation VALUES (
            "${task_id}",
            "${responsible_user_id}"
          )
        `)
        console.log("Tarefa atribuída ao usuário com sucesso.")
        
    } catch(err) {
        console.log(err.message)
    }
}

app.post("/task/responsible", async (req: Request, res: Response) => {
    try {
        await setResponsibleUserForTask(
            req.body.task_id,
            req.body.responsible_user_id,
        );
        console.log("Usuário responsável foi atribuído à tarefa com sucesso.")
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// Pegar usuários responsáveis por uma tarefa

const getUserByTask = async (id: string): Promise<any> => {
    try {
        const result = await connection.raw(`
        SELECT u.id, u.nickname 
        FROM ToDoListUser u
        INNER JOIN ToDoListTask t 
        ON t.creator_user_id = u.id
        WHERE t.id = "${id}"
        `)
        console.log(result[0])
        return result[0]
        
    } catch(err) {
        console.log(err.message)
    }
}

app.get("/task/:id/responsible", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await getUserByTask(id);
        if(user) {
            res.status(200).send(user)
        } else {
            res.status(200).send([])
        }
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// Atualizar o status da tarefa

const updateStatus = async(id: string, status: string): Promise<void> => {
    try {
        await connection("ToDoListTask")
        .update({
            status
        })
        .where("id", id);
        console.log("Status atualizado com sucesso.")
    } catch(err) {
        console.log(err.message)
    }
}

app.post("/task/:id/status/edit", async (req:Request, res:Response) => {
    try {
        await updateStatus(
            req.params.id,
            req.body.status
        )
        res.status(200).send({
            message: "Status atualizado com sucesso.",
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})


// Retirar um usuário responsável de uma tarefa
const deleteResponsibleUserForTask = async (responsible_user_id: string, task_id: string): Promise<any> => {
    try {
        await connection.raw(`
          DELETE FROM ToDoListResponsibleUserTaskRelation WHERE responsible_user_id = ${responsible_user_id} AND task_id = ${task_id}
        `)
        console.log("Tarefa retirada do usuário com sucesso.")
        
    } catch(err) {
        console.log(err.message)
    }
}

app.delete("/task/:taskId/responsible/:responsibleUserId", async (req: Request, res: Response) => {
    try {
        const task = req.params.task_id;
        const responsible_user = req.params.responsible_user_id;
        await deleteResponsibleUserForTask(responsible_user, task);
        console.log("Tarefas deletadas com sucesso.")
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// Atribuir mais de um responsável a uma tarefa
const setResponsibleUserForTask2 = async (responsible_user_ids: string[], task_id: string): Promise<any> => {
    try {
        await connection.raw(`
          INSERT INTO ToDoListResponsibleUserTaskRelation VALUES (
            [responsible_user_ids],
            task_id
          )
        `)
        console.log("Tarefa atribuída ao usuário com sucesso.")
        
    } catch(err) {
        console.log(err.message)
    }
}

app.post("/task/responsible", async (req: Request, res: Response) => {
    try {
        await setResponsibleUserForTask2(
            [req.body.responsible_user_ids],
            req.body.task_ids,
        );
        console.log("Usuários responsável foi atribuído à tarefa com sucesso.")
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// Procurar tarefa por termos 
const searchTask = async (search: string): Promise<any> => {
    try {
        const result = await connection.raw(`
          SELECT * FROM ToDoListTask WHERE description = "%${search}% OR title = "%${search}%"
        `)
        console.log(result[0])
        return result[0]
        
    } catch(err) {
        console.log(err.message)
    }
}

app.get("/task?query=", async (req: Request, res: Response) => {
    try {
        const search = req.params.search;
        const tasks = await searchTask(search);

        res.status(200).send(tasks)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// Atualizar o status de várias tarefas

const updateStatus2 = async(id: string, status: string): Promise<void> => {
    try {
        await connection("ToDoListTask")
        .update({
            status
        })
        .where("id", id);
        console.log("Status atualizado com sucesso.")
    } catch(err) {
        console.log(err.message)
    }
}

app.post("/task", async (req:Request, res:Response) => {
    try {
        await updateStatus2(
            req.body.id,
            req.body.salary
        )
        res.status(200).send({
            message: "Status atualizado com sucesso.",
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// Deletar tarefa

const deleteTaskById = async(id:string): Promise<any> => {
    await connection.raw(`
        DELETE FROM ToDoListTask WHERE id = '${id}'
    `)
    console.log("Tarefa deletada com sucesso.")
}

app.delete("/task/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteTaskById(id);
        console.log("Tarefa deletada com sucesso")
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// Deletar usuário

const deleteUserById = async(id:string): Promise<any> => {
    await connection.raw(`
        DELETE FROM ToDoListUser WHERE id = '${id}'
    `)
    console.log("Usuário deletado com sucesso.")
}


app.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteUserById(id);
        console.log("Usuário deletada com sucesso")
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})
