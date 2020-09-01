import { Cashier } from './Cashier';
import { JSONFileManager } from './JSONFileManager';
import { Employee } from './Employee';

export class Manager extends Cashier {
    private employees: Employee[] = [];
    private fileManagerEmplyee: JSONFileManager = new JSONFileManager("employees.json");

    constructor(name: string, salary: number) {
        super(name, salary)
        const fileData: any = this.fileManagerEmplyee.readDatabase();
        this.employees = fileData.map(
            (item: any) => {
                return new Employee(
                    item.name,
                    item.salary,
                )
            }
        )
    }
    
    sayJob(): void {
        console.log("Eu sou gerente. Eu que mando aqui")
    }

    hireEmployee(name: string, salary: number): void {
        const duplicateEmployee: Employee | undefined = this.employees.find(
            (employee: any) => {
                return employee.getName() === name
            }
        )

        if(duplicateEmployee) {
            throw new Error("Já existe um funcionário com esse nome.")
        }

        this.employees.push(
            new Employee(name, salary)
        )

        this.fileManagerEmplyee.writeToDatabase(this.employees)
    }

    fireEmployee(name: string): void {
        const employeeExists: Employee | undefined = this.employees.find(
            (employee: any) => {
                return employee.getName() === name
            }
        )
        
        if(employeeExists) {
            this.employees.filter(
                (employee: any) => {
                    return employee.getName() !== name
                }
            )
        } else {
            console.log("Não há funcionário com esse nome")
        }

        this.fileManagerEmplyee.writeToDatabase(this.employees)
    }

}