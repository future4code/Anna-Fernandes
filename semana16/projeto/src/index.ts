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
})

const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
    if(server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is runnig in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
})

// CREATE TABLE TodoListUser (
//     id VARCHAR(255) PRIMARY KEY, 
// name VARCHAR(255) NULL, 
// nickname VARCHAR(255) UNIQUE NOT NULL, 
// email VARCHAR(255) UNIQUE NOT NULL
// );

// CREATE TABLE TodoListTask (
//     id VARCHAR(255) PRIMARY KEY, 
// title VARCHAR(255) NOT NULL, 
// description TEXT NOT NULL, 
// status VARCHAR(255) NOT NULL DEFAULT "to_do",
// limit_date DATE NOT NULL,
// creator_user_id varchar(255) NOT NULL,
// FOREIGN KEY (creator_user_id) REFERENCES TodoListUser(id)
// );

// CREATE TABLE TodoListResponsibleUserTaskRelation (
//     task_id VARCHAR(255),
// responsible_user_id VARCHAR(255),
// FOREIGN KEY (task_id) REFERENCES TodoListTask(id),
// FOREIGN KEY (responsible_user_id) REFERENCES TodoListUser(id)
// );

// app.get("/caminhoDoEndpoint", async (req: Request, res: Response)=>{
//     try{ //inicio de um sonho
//        //corpo da função. Como é um get, normalmente buscaremos alguma informação.
 
//        //fim do corpo da função
//        //deu tudo certo
//        res.status(200).send({chaveDoRetorno: valorDaBusca});
//     }catch(error){
//        //deu tudo errado
//        res.status(400).send({chaveDoErro: valorDoErro});
//     }
//  });

// app.post("/caminhoDoEndpoint", async (req: Request, res: Response)=>{
//     try{ //inicio de um sonho
//        //corpo da função. Como é um post, normalmente buscaremos enviaremos uma mensagem de erro ou sucesso.
 
//        //fim do corpo da função
//        //deu tudo certo
//        res.status(200).send({chaveDoRetorno: mensagemDeSucesso});
//     }catch(error){
//        //deu tudo errado
//        res.status(400).send({chaveDoErro: mensagemDeErro});
//     }
//  });

// async function mySelect(valor: string): Promise<any>{

// 	const result = await knex()
//         .select("*")
//         .from("NOME_DA_TABELA")
//         .where({coluna: valor});

// 	return result;
// }

// async function mySelect(valor: string): Promise<any>{

// 	const result = await knex().raw(`
// 		SELECT * FROM NOME_DA_TABELA
// 	  WHERE COLUNA = "${valor}"
// 	`);
   
// 	return result[0];
// }

// Criar usuários

// **Método:** PUT
// **Path:** `/user`

// **Body:**

// ```json
// {
// 	"name": "Astro Dev",
// 	"nickname": "astrodev",
// 	"email": "astro@dev.com"
// }
// ```


// Pegar usuário pelo id

// **Método:** GET
// **Path:** `/user/:id`

// **Path Param**: é o id do usuário

// **Body de Resposta:**

// ```json
// {
// 	"id": "001",
// 	"nickname": "astrodev"
// }
// ```

// **Observações**:

// - O seu código deve validar se o id do usuário foi enviado
// - O endpoint deve retornar um erro se não encontrar o usuário


// Editar usuário

// **Método:** POST
// **Path:** `/user/edit/:id`

// **Path Param**: é o id do usuário

// **Body:**

// ```json
// {
// 	"name": "Astro Dev",
// 	"nickname": "astrodev"
// }
// ```

// **Observações**:

// - O seu código deve validar se o id do usuário foi enviado
// - O seu código só deve alterar o que for enviado
// - Se algum valor enviado for vazio, deve retornar um erro


// Criar tarefa

// **Método:** PUT
// **Path:** `/task`

// **Body:**

// ```json
// {
// 	"title": "Criar banco dos alunos",
// 	"description": "Devemos criar o banco dos alunos para o módulo do backend",
// 	"limitDate": "04/05/2020",
// 	"creatorUserId": "001"
// }
// ```

// **Observações**:

// - O seu código deve validar se todos os campos não estão vazios,
// - O seu código deve gerar o id da tarefa,
// - A data deve se recebida no formato mostrado acima: `DD/MM/YYYY` e o seu código deve fazer a conversão necessária para salvar no banco


// Pegar tarefa pelo id
// **Método:** GET
// **Path:** `/task/:id`

// **Path Param**: é o id da tarefa

// **Body de Resposta:**

// ```json
// {
// 	"taskId": "001",
// 	"title": "Criar banco dos alunos",
// 	"description": "Devemos criar o banco dos alunos para o módulo do backend",
// 	"limitDate": "04/05/2020",
// 	"status": "to_do",
// 	"creatorUserId": "001",
// 	"creatorUserNickname": "astrodev"
// }
// ```

// **Observações**:

// - O seu código deve validar se o id da task foi enviado
// - O endpoint deve retornar um erro se não encontrar a task
// - Perceba que o endpoint retorna informações tanto da tarefa como do usuário criador
// - O seu código deve converter a data recebida do banco para o formato mostrado acima (`DD/MM/YYYY`)