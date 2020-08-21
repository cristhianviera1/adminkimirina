export class News {
    // tslint:disable-next-line: variable-name
    _id: string;
    description: string;
    image: string;
    publicationDate: string;
    link: string;
    title: string;

    constructor() {
        this._id = '';
        this.description = '';
        this.image = '';
        this.publicationDate = '';
        this.link = '';
        this.title = '';
    }
}
