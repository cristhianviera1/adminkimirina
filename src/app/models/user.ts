export class User {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public imagen?: string,
        public telefono?: string,
        public provincia?: string,
        public rol?: string,
        public _id?: string
    ) {}
}
