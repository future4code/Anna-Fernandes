import { Client } from "./Client";
import { Place } from "./Place";
import { Industry } from "./Industry";
import { Commerce } from "./Commerce";
import { Residence } from "./Residence";
import { ResidentialClient } from "./ResidentialClient";


const client: Client = {
    name: "Goli",
    registrationNumber: 1,
    consumedEnergy: 100,
  
    calculateBill: () => {
      return 2;
    }
}

console.log(client);
// 1.a. Nome, registro e energia consumida e a função. Não foi possível ler o retorno da função, pois a interface imprime apena a assinatura, não aciona a função.

// const place: Place = new Place('04510-25');
// 2.a. O typescript indica que não é possível criar a instância de uma classe abstrata
// 2.b. Precisaríamos usar extends em uma nova classe filha

const residence: Residence = new Residence(2, '05111-90')

const industry: Industry = new Industry(2, '05111-90')

const commerce: Commerce = new Commerce(2, '05111-90')

console.log(residence.getCep)
console.log(industry.getCep)
console.log(commerce.getCep)


const resindialClient: ResidentialClient = new ResidentialClient("Joana", 12345, 180,"111.211.211-21", 8, '05111-90')
//4.a. Métodos: calcula a conta e pega o cpf. Propriedades: nome, número de registro, energia consumida, cpf, quantidade de residentes, cep

console.log(resindialClient)