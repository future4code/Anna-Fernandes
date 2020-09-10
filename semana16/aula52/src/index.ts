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

const getActorById = async(id:string): Promise<any> => {
    try {
        const result = await connection.raw(`
            SELECT * FROM Actor WHERE id = '${id}'
        `)
        return result[0][0]
    } catch(err) {
        console.log(err.message)
    }
}

const searchActor = async (name: string): Promise<any> => {
    try {
        const result = await connection.raw(`
          SELECT * FROM Actor WHERE name = "${name}"
        `)
        console.log(result[0])
        return result[0]
        
    } catch(err) {
        console.log(err.message)
    }
}

const countActors = async (gender: string): Promise<any> => {
    try {
        const result = await connection.raw(`
          SELECT COUNT(*) as count FROM Actor WHERE gender = "${gender}"
        `);
        const count = result[0][0].count;
        console.log(count)
        return count;

    } catch(err) {
        console.log(err.message)
    }
};
  

// getActorById("001")
// searchActor("Tony Ramos")
// countActors("female")

const createActor = async(
    id: string,
    name: string,
    salary: number,
    birth_date: Date,
    gender: string
): Promise<void> => {
    try {
        await connection
        .insert({
            id,
            name,
            salary,
            birth_date,
            gender
        })
        .into("Actor")
        console.log("sucesso.")
    } catch(err) {
        console.log(err.message)
    }
}

const updateSalary = async(id: string, salary: number): Promise<void> => {
    try {
        await connection("Actor")
        .update({
            salary
        })
        .where("id", id);
        console.log("Sucesso")
    } catch(err) {
        console.log(err.message)
    }
}

const deleteActor = async(id: string): Promise<void> => {
    try {
        await connection("Actor")
        .delete()
        .where("id", id);
        console.log("Sucesso")
    } catch(err) {
        console.log(err.message)
    }
}

const averageSalary = async(gender: string): Promise<void> => {
    try {
        await connection("Actor")
        .avg("salary as average")
        .where("gender", gender);
        console.log("Sucesso")
    } catch(err) {
        console.log(err.message)
    }
}

// createActor("006", "Alice Braga", 500000, new Date(15/4/1983), "female")
// updateSalary("001", 450000)
// deleteActor("003")
// averageSalary("female")

app.get("/actor/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const actor = await getActorById(id);

        res.status(200).send(actor)
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

app.get("/actor", async (req: Request, res: Response) => {
    try {
        const count = await countActors(req.query.gender as string);

        res.status(200).send({
            quantity: count,
        })
    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

app.put("/actor", async (req:Request, res:Response) => {
    try {
        await createActor(
            req.body.id,
            req.body.name,
            req.body.salary,
            new Date(req.body.birth_date),
            req.body.salary
        )

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

app.post("/actor", async (req:Request, res:Response) => {
    try {
        await updateSalary(
            req.body.id,
            req.body.salary
        )
        res.status(200).send({
            message: "Success",
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

app.delete("/actor/:id", async (req:Request, res:Response) => {
    try {
        await deleteActor(
            req.params.id
        )
        res.status(200).send({
            message: "Success",
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

const createMovie = async (
    id: string,
    name: string,
    sinopse: string,
    debut_date: Date,
    rating: number,
    playing_limit_date: Date,

) => {
    try {
        await connection
        .insert({
            id,
            name,
            sinopse,
            debut_date,
            rating,
            playing_limit_date})
        .into('Movie')
        console.log('Sucesso')

    } catch(err) {
        console.log(err.message)
    }
}

app.post("/movie", async (req:Request, res:Response) => {
    try {
        await createMovie(
            req.body.id,
            req.body.name,
            req.body.sinopse,
            req.body.debut_date,
            req.body.rating,
            req.body.playing_limit_date
        )
        res.status(200).send({
            message: "Success",
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

const getAllMovies = async (): Promise<any> => {
    try {
        const result = await connection.raw(`
            SELECT * FROM Movie LIMIT 15
        `)
        console.log('Sucesso')
        return result[0]

    } catch(err) {
        console.log(err.message)
    }
}

app.get("/movie/all", async (req:Request, res:Response) => {
    try {
        const movies = await getAllMovies();
        res.status(200).send({
            movies: movies,
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

const searchMovie = async (name: string): Promise<any> => {
    try {
        const result = await connection.raw(`
          SELECT * FROM Movie WHERE name LIKE "%${name}%"
        `)
        console.log(result[0])
        return result[0]
        
    } catch(err) {
        console.log(err.message)
    }
}

app.get("/movie/search", async (req:Request, res:Response) => {
    try {
        const movies = await searchMovie(req.query.name as string);
        res.status(200).send({
            movies
        })

    } catch(err) {
        res.status(400).send({
            message: err.message
        })
    }
})

// searchMovie("Bacurau")
// createMovie("001", "Eduardo e Mônica", "Eduardo abriu os olhos mas não quis se levantar ficou deitado e viu que horas eram, enquanto isso a Mônica tomava um conhaque no outro canto da cidade como eles disseram", new Date(21/11/2020), 10, new Date (21/12/2021))


const createRating = async (
    id: string,
    comment: string,
    rate: number,
    movie_id: string,

) => {
    try {
        await connection
        .insert({
            id,
            comment,
            rate,
            movie_id
        })
        .into('Rating')
        console.log('Sucesso')

    } catch(err) {
        console.log(err.message)
    }
}

// createRating("003", "Sensacional, igual a música!", 9, "001")
// createRating("001", "Adorie, muito fofo!", 9, "002")
// createRating("004", "Um clássico!", 9, "003")
// createRating("002", "Amei, vou colocar em prática na próxima revolução!", 9, "004")
// createRating("005", "Assisti de verdade e é muito profundo", 10, "005")



