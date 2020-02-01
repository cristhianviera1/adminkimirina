export class Usuario {
_id : string;
password: string;
correo: string;
nombre: string;
edad: string;
genero: string;
rol: string;
imagen: string;
online: boolean;


    constructor() {
        this._id = "";
        this.password = "";
        this.correo = "";
        this.nombre = "";
        this.edad = "";
        this.genero = "";
        this.rol = "";
        this.imagen = "";
        this.online = false;
    }
}
