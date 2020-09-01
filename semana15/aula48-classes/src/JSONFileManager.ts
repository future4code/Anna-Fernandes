
import fs from 'fs';

export class JSONFileManager {
    private fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    public readDatabase(): any {
        try {
            const fileData: string = fs.readFileSync(this.fileName).toString()
            return JSON.parse(fileData)
            
        } catch(err) {
            console.log(`Erro ao ler a base de dados: ${err.message}`);
            return []
        }
    }

    public writeToDatabase(data: any): void {
        try {
            const dataAsString: string = JSON.stringify(data, null, 3)
            fs.writeFileSync(this.fileName, dataAsString)
        } catch(err) {
            console.log(`Erro ao ler a base de dados: ${err.message}`);
        }
    }
}
