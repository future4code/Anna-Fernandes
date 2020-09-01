export class Employee {
    private name: string;
    private salary: number;

    constructor(
        name: string,
        salary: number
    ) {
        this.name = name
        this.salary = salary
    }

    public getName(): string {
        return this.name
    }

    public getSalary(): number {
        return this.salary
    }

    public sayJob(): void {
        console.log("Eu trabalho com:")
    }

}