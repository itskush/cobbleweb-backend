import { Expose } from 'class-transformer';
import { Photo } from '../entities/photo.entity';

export class UserDto {
    @Expose()
    id: number;
    
    @Expose()
    email: string;
    
    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    role: string;

    @Expose()
    active: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    photos: Photo[];

    @Expose()
    avatar: string;

    @Expose()
    fullName: string;
}