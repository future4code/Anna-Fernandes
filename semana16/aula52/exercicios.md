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

a)
b)
c)

### Exercício 6

a)
b)
c)

### Exercício 7

a)
b)
c)