import { User } from './users.entity';
import { Photo } from './photo.entity';
export declare class Client extends User {
    avatar: string;
    photos: Photo[];
    fullName: string;
    generateFullName(): Promise<void>;
    generateAvatar(): Promise<void>;
}
