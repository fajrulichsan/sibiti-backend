export class User {
    id: number;
    email: string;
    password : string
    is_verification : boolean;
    otp_verification : number;
    created_at : Date;
    updated_at : Date;

    constructor() {
        this.id = Number(new Date().getTime());
        this.email = '';
        this.password = '';
        this.is_verification = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
  }
  

