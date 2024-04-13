export class Soal {
    id: number;
    eventId : number;
    subtestId : number;
    1 : string;
    2 : string;
    3 : string;
    4 : string;
    5 : string;
    created_at : Date;
    updated_at : Date;

    constructor() {
        this.id = Number(new Date().getTime());
        this.created_at = new Date();
        this.updated_at = new Date();
    }
  }
  

