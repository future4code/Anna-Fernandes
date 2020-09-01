import { User } from './User';

export class Employee extends User {
    protected admissionDate: moment.Moment;
    protected baseSalary: number;
    static BENEFITS_VALUE: number = 400;

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        admissionDate: moment.Moment,
        baseSalary: number,
    ) {
        super(id, name, email, password);
        this.admissionDate = admissionDate;
        this.baseSalary = baseSalary;
    }

    getAdmissionDate(): moment.Moment {
        return this.admissionDate
    }

    getBaseSalary(): number {
        return this.baseSalary
    }

    calculateTotalSalary(): number {
        return this.baseSalary + Employee.BENEFITS_VALUE;
    }
}