export class Dish {
    constructor(
        private name: string,
        private description: string,
        private price: number,
        private category: string
        ) {

    }

    getName = () => this.name
    getDescription = () => this.description
    getPrice = () => this.price
    getCategory = () => this.category

}