import { Client } from './client.entity';
export declare class Photo {
    id: number;
    name: string;
    url: string;
    user: Client;
    createdAt: Date;
    updatedAt: Date;
}
