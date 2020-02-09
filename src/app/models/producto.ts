export class Producto {
    _id: string;
    titulo: string;
    descripcion: string;
    imagen: string;
    link: string;
    precio: string;
    observaciones: string;

    constructor() {
        this._id = "";
        this.titulo = "";
        this.descripcion = "";
        this.imagen = "";
        this.link = "";
        this.precio = "";
        this.observaciones = "";
    }
}
