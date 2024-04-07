export class Event {
    id: number;
    name: string;
    publish: string;
    dueDate: string;
    harga : number;
    subtest: number;
    status: number;
    statusData: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor() {
      this.id = Number(new Date().getTime());
      this.statusData = 1;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  