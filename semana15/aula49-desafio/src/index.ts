import { JSONFileManager } from './JSONFileManager';
import { Dish } from "./Dish";
import { Employee } from "./Employee";
import { Cashier } from "./Cashier";
import { Chef } from "./Chef";
import { Manager } from "./Manager";

const fileManager: JSONFileManager = new JSONFileManager("employees.json");

const employess = fileManager.readDatabase();

const manager: Manager = new Manager("Felizardo", 10000)
const chef: Chef = new Chef("Godofredo", 5000)
const cashier: Cashier = new Cashier("Socorro Jesus", 2500)

manager.sayJob()
chef.sayJob()
cashier.sayJob()

// manager.hireEmployee("Novinha", 1100)
// manager.hireEmployee("Senhora", 2200)
// manager.hireEmployee("Plena", 1800)

// chef.createDish("Macarronada", "Delicioso macarrão com molho de tomate", 30, "SaltyDish")
// chef.createDish("Brownie", "Delicioso brownie de chocolate", 5, "Dessert")
// chef.createDish("Bolo de cenour", "Delicioso bolo de cenoura", 5, "Dessert")

// chef.removeDish("Bolo de cenour")
// chef.createDish("Bolo de cenoura", "Delicioso bolo de cenoura", 5, "Dessert")

chef.sayDishes();

cashier.setOrder("Macarronada");
cashier.setOrder("Brownie");
console.log(cashier.getOrder());
cashier.calculateClientBill();
console.log(cashier.getBill());

console.log(employess)
