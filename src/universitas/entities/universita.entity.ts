export class Universitas {
    id: number;
    kode : number;
    nama : string;
    createdAt : Date;
    updatedAt : Date;

    constructor() {
        this.id = Number(new Date().getTime());
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
  }
  

