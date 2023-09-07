import { Entity, Column, ChildEntity, BeforeInsert } from 'typeorm';
import { User } from './users.entity';
import { Photo } from './photo.entity';

@ChildEntity()
export class Client extends User {
    @Column()
    avatar: string;

    @Column('jsonb')
    photos: Photo[];

    @Column()
    fullName: string;

    @BeforeInsert()
    async generateFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

    @BeforeInsert()
    async generateAvatar() {
        this.avatar = 'https://avatars.dicebear.com/api/croodles/stefan.svg'
    }

}