import { JSONFileManager } from './JSONFileManager';
import { Employee } from './Employee';
import { Dish } from './Dish';

export class Chef extends Employee {
    private dishes: Dish[] = [];
    private fileManager: JSONFileManager = new JSONFileManager("data.json");

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
        console.log("Eu sou chef. Eu sou um pouco mala")
    }

    sayDishes(): void {
        console.log(this.dishes)
    }

    createDish(name: string, description: string, price: number, category: string): void {
        
        const duplicateDishes: Dish | undefined = this.dishes.find(
            (dish: any) => {
                return dish.getName() === name
            }
        )
        
        if(!duplicateDishes) {
            this.dishes.push(
                new Dish(name, description, price, category)
            )
        }

        this.fileManager.writeToDatabase(this.dishes)
    }
    
    removeDish(name: string): void {
        
        const dishExist: Dish | undefined = this.dishes.find(
            (dish: any) => {
                return dish.getName() === name
            }
        )
        
        if(dishExist) {
            this.dishes.filter(
                (dish: any) => {
                    return dish.getName() !== name
                }
            )
        } else {
            console.log("Não há prato com esse nome")
        }

        this.fileManager.writeToDatabase(this.dishes)
    }
}