import { Client } from './Client';
import { Commerce } from './Commerce';

export class ComercialClient extends Commerce implements Client {
    constructor(
      public name: string,
      public registrationNumber: number,
      public consumedEnergy: number,
      private cnpj: string,
      floorsQuantity: number,
      cep: string
    ) {
      super(floorsQuantity, cep);
    }
  
    public getCnpj(): string {
      return this.cnpj;
    }
  
    public calculateBill(): number {
      return this.consumedEnergy * 0.53;
    }
  }