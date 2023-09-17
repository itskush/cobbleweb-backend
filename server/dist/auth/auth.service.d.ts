import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/login.dto';
import { User } from '../users/entities/users.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(authLoginDto: UserLoginDto): Promise<{
        status: 200;
        access_token: string;
    }>;
    validateUser(userLoginDto: UserLoginDto): Promise<User>;
}
