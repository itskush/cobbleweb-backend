import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/login.dto';
import { User } from '../users/entities/users.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Logs in a user and returns an access token.
   * @param authLoginDto - The user login data.
   * @returns An object containing the access token.
   */
  async login(authLoginDto: UserLoginDto): Promise<{    status: 200, access_token: string }> {
    const user = await this.validateUser(authLoginDto);
    const payload = {
      userid: user.id,
    };

    return {
      status: 200,
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Validates a user's login credentials.
   * @param userLoginDto - The user login data.
   * @returns The validated user.
   * @throws UnauthorizedException if the password is invalid.
   */
  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const { email, password } = userLoginDto;

    const [user] = await this.usersService.findUsersByEmail(email);

    if(!user) {
      throw new UnauthorizedException('No user found with this email');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}