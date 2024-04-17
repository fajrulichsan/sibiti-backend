export class Subtest {
    id: number;
    eventId: number;
    name: string;
    deskripsi: string;
    jumlahSoal: number;
    opsi : number;
    waktu: number;
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
  