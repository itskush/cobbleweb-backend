import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/login.dto';
import { User } from '../users/entities/users.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private usersService:UsersService, private jwtService:JwtService) { }

    async login(authLoginDto: UserLoginDto) {
        const user = await this.validateUser(authLoginDto);
        const payload = {
            userid: user.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        const { email, password } = userLoginDto;

        const [user] = await this.usersService.findOneByEmail(email);

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException();
        }
        return user;
    }
}