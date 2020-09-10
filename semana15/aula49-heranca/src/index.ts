import moment from 'moment';
import { User } from './User';
import { Customer } from './Customer';
import { Employee } from './Employee';
import { Seller } from './Seller';

console.log("Ma oeeee")


const user1: User = new User("user-1", "Amanda Jonas", "amanda-jonas@labenu.com", "123456")

const customer1: Customer = new Customer("customer-1", "Carol Pistola", "carol-pistola@labenu.com", "123456", "4520 4564 8796 4569")

const employee1: Employee = new Employee("employee-1", "Mari da Ambev", "mari-ambev@labenu.com", "123456", moment("15/05/2019", "DD/MM/YYYY"), 2500)

const seller1: Seller = new Seller("seller-1", "Adriano Jonas", "adriano-jonas@labenu.com", "123456", moment("15/08/2019", "DD/MM/YYYY"), 1900)

const seller2: Seller = new Seller("seller-2", "Mãe Joana", "joana-bueno@labenu.com", "123456", moment("15/12/2019", "DD/MM/YYYY"), 2500)

console.log(user1.getId());
console.log(user1.getName());
console.log(user1.getEmail());

console.log(customer1.getId());
console.log(customer1.getName());
console.log(customer1.getEmail());
console.log(customer1.getCreditCard());
console.log(customer1.purchaseTotal);

console.log(user1.introduceYourSelf());
console.log(customer1.introduceYourSelf());

console.log(employee1.getId());
console.log(employee1.getName());
console.log(employee1.getEmail());
console.log(employee1.getAdmissionDate());
console.log(employee1.getBaseSalary());
console.log(employee1.introduceYourSelf());

console.log(seller1.getId());
console.log(seller1.getName());
console.log(seller1.getEmail());
console.log(seller1.getAdmissionDate());
console.log(seller1.getBaseSalary());
console.log(seller1.introduceYourSelf());
console.log(seller1.getSalesQuantity());
console.log(seller1.setSalesQuantity(5));
console.log(seller1.getSalesQuantity());
console.log(seller1.calculateTotalSalary());

console.log(seller2.getId());
console.log(seller2.getName());
console.log(seller2.getEmail());
console.log(seller2.getAdmissionDate());
console.log(seller2.getBaseSalary());
console.log(seller2.introduceYourSelf());
console.log(seller2.getSalesQuantity());
console.log(seller2.setSalesQuantity(10));
console.log(seller2.getSalesQuantity());
console.log(seller2.calculateTotalSalary());



// Respostas
// 1.a. Não, pois ela não tem um get e está privada.
// 1.b. Uma vez.

// 2.a Uma vez.
// 2.b. Duas, pois foi chamada novamente no customer.

// 3. não, pq ela ainda é privada no user e só acessível lá.

// 6.a. Quatro vezes.
// 6.b. Id, nome, email, data de admissão, salário base e mensagem de olá.

// 8.a. Id, nome, email, senha, data de admissão e salário base.
// 8.b. Só não consegui imprimir a senha, pois ela está protegida.

// 9.a. Sim, por causa do método get

// 10.a.