# Aula 52

### Exercício 1

a) É um json.
b)
const searchActor = async (name: string): Promise<any> => {
    try {
        const result = await connection.raw(`
          SELECT * FROM Actor WHERE name = "${name}"
        `)
        return result[0]
        
    } catch(err) {
        console.log(err)
    }
}

c)
const countActors = async (gender: string): Promise<any> => {
    try {
        const result = await connection.raw(`
          SELECT COUNT(*) as count FROM Actor WHERE gender = "${gender}"
        `);
        const count = result[0][0].count;
        return count;

    } catch(err) {
        console.log(err)
    }
};
  
### Exercício 2

a)
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

b)
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

c)
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

### Exercício 3

a) Porque existe um request (req) de um parâmetro (id) para a api.
b) Elas mandam a resposta para o navegador.
c)
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

### Exercício 4

a)
app.put("/post", async (req:Request, res:Response) => {
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
b)
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

### Exercício 5


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

### Exercício 6

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

### Exercício 7

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
