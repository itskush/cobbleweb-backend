import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { Client } from './entities/client.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PhotoService } from './photo.service';
export declare class UsersService {
    private repo;
    private readonly photoService;
    constructor(repo: Repository<Client>, photoService: PhotoService);
    create(userDto: CreateUserDto, photos: any): Promise<Error | {
        status: number;
        message: string;
    }>;
    findOneById(id: number): Promise<Client>;
    findUsersByEmail(email: string): Promise<Client[]>;
    update(id: number, attrs: Partial<User>): Promise<Client>;
    remove(id: number): Promise<string>;
}
