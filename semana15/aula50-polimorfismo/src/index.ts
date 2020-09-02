import { Client } from "./Client";
import { Place } from "./Place";
import { Industry } from "./Industry";
import { Commerce } from "./Commerce";
import { Residence } from "./Residence";
import { ResidentialClient } from "./ResidentialClient";
import { ComercialClient } from "./ComercialClient";
import { IndustrialClient } from "./IndustrialClient";
import { ClientManager } from "./ClientManager";


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

console.log(residence.getCep())
console.log(industry.getCep())
console.log(commerce.getCep())


const resindialClient: ResidentialClient = new ResidentialClient("Joana", 12345, 180,"111.211.211-21", 8, '05111-90')
//4.a. Métodos: calcula a conta e pega o cpf. Propriedades: nome, número de registro, energia consumida, cpf, quantidade de residentes, cep

console.log(resindialClient)


const comercialClient: ComercialClient = new ComercialClient("Joana's Store", 12345, 240,"11.111.111/0001-11", 2, '05111-90')

console.log(comercialClient)

//5.a. O nome, o número de registro, o consumo de energia e o cep.
// 5.b. O cnjp, a quantidade de andares e o valor que múltiplica o consumo

const industrialClient: IndustrialClient = new IndustrialClient("Joana's Ind", 12345, 240,"11.111.111/0001-11", 2, '05111-90')

console.log(industrialClient)

// 6.a. Industry, porque ela ter o método para pegar um número de máquinas
// 6.b. Client, porque ela vai ter as propriedades nome, número de registro e energia consumida.

const clientManager: ClientManager = new ClientManager;

console.log(clientManager)

console.log(clientManager.registerClient(resindialClient))

console.log(clientManager.registerClient(comercialClient))

console.log(clientManager.registerClient(industrialClient))