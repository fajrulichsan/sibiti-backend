export class Profile {
    id: number;
    userId: number;
    email: string;
    born : string;
    fullName: string;
    school: string;
    province: string;
    city: string;
    phoneNumber: string;
    role : string;
    created_at : Date;
    updated_at : Date;

    constructor() {
        this.id = Number(new Date().getTime());
        this.created_at = new Date();
        this.updated_at = new Date();
    }
  }
  