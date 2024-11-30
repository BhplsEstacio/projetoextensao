export class Category{
    id: number;
    userId: number;
    name: string;

    constructor(
        attributes: {
            id: number;
            userId: number;
            name: string;
        }
    ) {
        this.id = attributes.id;
        this.userId = attributes.userId;
        this.name = attributes.name;
    }
}