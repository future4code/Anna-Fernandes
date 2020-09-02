import { Place } from './Place';

export class Residence extends Place {
    constructor(
      protected dwellersQuantity: number,

      cep: string
    ) {
      super(cep);
    }

  
    public getDwellersQuantity(): number {
        return this.dwellersQuantity
      }
  }