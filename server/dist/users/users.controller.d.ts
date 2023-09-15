import { S3Service } from '../auth/s3.service';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserDto } from './dto/user.dto';
export declare class UsersController {
    private repo;
    private readonly s3Service;
    private configService;
    constructor(repo: Repository<Client>, s3Service: S3Service, configService: ConfigService);
    findMe(req: any): Promise<UserDto>;
}
