export class Product {
    // tslint:disable-next-line: variable-name
    _id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    price: string;
    observations: string;

    constructor() {
        this._id = '';
        this.title = '';
        this.description = '';
        this.image = '';
        this.link = '';
        this.price = '';
        this.observations = '';
    }
}
