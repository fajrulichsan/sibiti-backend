export class UserRole {
    id: number;
    userId: number;
    email: string;
    role: string;
    statusData:number;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.id = Number(new Date().getTime());
        this.statusData = 1;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
