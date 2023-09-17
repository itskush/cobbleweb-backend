import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';
import { Client } from '../users/entities/client.entity';
import { UsersService } from '../users/users.service';
import { S3Service } from './s3.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly repo;
    private readonly authService;
    private readonly s3Service;
    private readonly userService;
    private readonly configService;
    constructor(repo: Repository<Client>, authService: AuthService, s3Service: S3Service, userService: UsersService, configService: ConfigService);
    login(authLoginDto: UserLoginDto): Promise<{
        status: 200;
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto, photos: any): Promise<Error | {
        status: number;
        message: string;
    }>;
}
