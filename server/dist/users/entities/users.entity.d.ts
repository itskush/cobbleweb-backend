export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
}
