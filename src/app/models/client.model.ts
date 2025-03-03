

export class ClientModel {
    id?: number;
    idClient: string = '';
    firstname: string ='';
    lastname: string ='';
    email: string = '';
    phone: number = 0;
    status: boolean = true;

    constructor() {
        this.status = true;
    }
}