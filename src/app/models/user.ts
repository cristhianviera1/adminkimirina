export class User {
    // tslint:disable-next-line: variable-name
    _id: string;
    password: string;
    email: string;
    name: string;
    age: string;
    gender: string;
    rol: string;
    image: string;
    online: boolean;
    status: boolean;

    constructor() {
        this._id = '';
        this.password = '';
        this.email = '';
        this.name = '';
        this.age = '';
        this.gender = '';
        this.rol = '';
        this.image = '';
        this.online = false;
        this.status = true;
    }
}
