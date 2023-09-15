import { Photo } from '../entities/photo.entity';
export declare class UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    photos: Photo[];
    avatar: string;
    fullName: string;
}
