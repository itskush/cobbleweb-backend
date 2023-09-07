import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Client } from './entities/client.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Client) private repo: Repository<Client>) {}

    async create(User: CreateUserDto){
        const user = this.repo.create(User);
        const createdUser = await this.repo.save(user);

        if (createdUser) { 
            return 'User created successfully'
        }

        return 'User wasn\'t created successfully';
    }
    
    async findOneById(id:number) {
        return this.repo.findOneBy({id});
    }

    async findUserByEmail(email: string) {
        return await  this.repo.find({where: { email }});
    }

    async findOneByEmail(email:string) {
        return this.repo.find({where: { email }});
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOneById(id)
        if (!user) {
            throw new NotFoundException('user not found');
        }

        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOneById(id)
        if (!user) {
            throw new NotFoundException('user not found');
        }

        return this.repo.remove(user);
    }

}
