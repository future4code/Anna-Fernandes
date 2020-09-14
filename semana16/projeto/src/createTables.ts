import knex from 'knex';
import dotenv from 'dotenv';
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
})

async function createToDoListUserTable(): Promise<void> {
    try {
        await connection.raw(`
            CREATE TABLE  ToDoListUser (
                id VARCHAR(255) PRIMARY KEY, 
                name VARCHAR(255) NULL, 
                nickname VARCHAR(255) UNIQUE NOT NULL, 
                email VARCHAR(255) UNIQUE NOT NULL
            )
        `)
    } catch(err) {
        console.log(err.message)
    }
}

async function createToDoListTask(): Promise<void> {
    try {
        await connection.raw(`
            CREATE TABLE  ToDoListTask (
                id VARCHAR(255) PRIMARY KEY, 
                title VARCHAR(255) NOT NULL, 
                description TEXT NOT NULL, 
                status VARCHAR(255) NOT NULL DEFAULT "to_do",
                limit_date DATE NOT NULL,
                creator_user_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (creator_user_id) REFERENCES ToDoListUser(id)
            )
        `)
    } catch(err) {
        console.log(err.message)
    }
}

async function createToDoListResponsibleUserTaskRelation(): Promise<void> {
    try {
        await connection.raw(`
            CREATE TABLE ToDoListResponsibleUserTaskRelation  (
                task_id VARCHAR(255),
                responsible_user_id VARCHAR(255),
                FOREIGN KEY (task_id) REFERENCES ToDoListTask(id),
                FOREIGN KEY (responsible_user_id) REFERENCES ToDoListUser(id)
            )
        `)
    } catch(err) {
        console.log(err.message)
    }
}

// Buscar informações de mais de uma tabela -> JOIN
// Ex.:
// SELECT *
// FROM table_accounts
// JOIN table_users 
// ON table_accountts.user_id = table_users.id

// Outros: LEFT JOIN e RIGHT JOIN - quando há usuário sem contas ou o inverso