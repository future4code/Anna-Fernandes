import { JSONFileManager } from "./JSONFileManager";
import { Employee } from "./Employee";
import { Dish } from "./Dish";

export class Cashier extends Employee {
    private dishes: Dish[] = [];
    private fileManager: JSONFileManager = new JSONFileManager("data.json");
    private clientOrder: Dish[] = [];
    private bill: number = 0;

    constructor(name: string, salary: number) {
        super(name, salary)
        const fileData: any = this.fileManager.readDatabase();
        this.dishes = fileData.map(
            (item: any) => {
                return new Dish(
                    item.name,
                    item.description,
                    item.price,
                    item.category,
                )
            }
        )
    }

    sayJob(): void {
        console.log("Eu sou caixa. Eu resolvo os pepinos com clientes.")
    }

    setOrder(name: string): Dish[] {
        const findDish = this.dishes.find(
            (dish) => {
                return dish.getName() === name
             }
        )
             
        if(findDish) {
            this.clientOrder.push(findDish)
        }

        return this.clientOrder
    }

    getOrder(): Dish[] {
        return this.clientOrder
    }

    getBill(): number {
        return this.bill
    }

    calculateClientBill(): void {
        this.bill = 0;
        
        this.clientOrder.forEach(
            (dish) => {
                this.bill += dish.getPrice();
            }
        )
    }

}