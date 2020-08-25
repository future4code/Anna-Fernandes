import fs from "fs";

const file: string = process.argv[2]
const newTask: string = process.argv[3]

fs.appendFileSync(file, newTask);

console.log("Tarefa adicionada com sucesso.");