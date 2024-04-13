export class Soal {
    id: number;
    eventId : number;
    subtestId : number;
    no : number;
    soal : string;
    a : string;
    b : string;
    c : string;
    d : string;
    e : string;
    f : string;
    created_at : Date;
    updated_at : Date;

    constructor() {
        this.id = Number(new Date().getTime());
        this.created_at = new Date();
        this.updated_at = new Date();
    }
  }
  

