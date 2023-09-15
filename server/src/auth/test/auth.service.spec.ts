import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/users.entity';
import { Client } from '../../users/entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        { 
          provide: getRepositoryToken(Client), // replace Client with your actual entity
          useClass: Repository, // mock the repository
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should throw an error if no user is found with the provided email', async () => {
      jest.spyOn(usersService, 'findUsersByEmail').mockImplementation(() => Promise.resolve([]));
    
      await expect(authService.validateUser({ email: 'myemail@gmail.com', password: 'password1235' })).rejects.toThrow();
    });

    it('should return a user if valid password is provided', async () => {
      const user = new Client();
      user.password = 'password1235';

      jest.spyOn(usersService, 'findUsersByEmail').mockImplementation(() => Promise.resolve([user]));
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      expect(await authService.validateUser({ email: 'myemail@gmail.com', password: 'password1235' })).toEqual(user);
    });

    it('should throw an error if invalid password is provided', async () => {
      const user = new Client();
      user.password = 'password1235';

      jest.spyOn(usersService, 'findUsersByEmail').mockImplementation(() => Promise.resolve([user]));
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await expect(authService.validateUser({ email: 'myemail@gmail.com', password: 'wrongPassword' })).rejects.toThrow();
    });

    it('should throw an error if bcrypt.compare throws an error', async () => {
      const user = new Client();
      user.password = 'password1235';
    
      jest.spyOn(usersService, 'findUsersByEmail').mockImplementation(() => Promise.resolve([user]));
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.reject(new Error('bcrypt error')));
    
      await expect(authService.validateUser({ email: 'myemail@gmail.com', password: 'password1235' })).rejects.toThrow();
    });

    it('should throw an error if more than one user is found with the provided email', async () => {
      const user1 = new Client();
      const user2 = new Client();
      jest.spyOn(usersService, 'findUsersByEmail').mockImplementation(() => Promise.resolve([user1, user2]));
    
      await expect(authService.validateUser({ email: 'myemail@gmail.com', password: 'password1235' })).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = new Client();
      user.id = 1;

      jest.spyOn(authService, 'validateUser').mockImplementation(() => Promise.resolve(user));
      jest.spyOn(jwtService, 'sign').mockImplementation(() => 'testToken');

      expect(await authService.login({ email: 'myemail@gmail.com', password: 'password1235' })).toEqual({ access_token: 'testToken' });
    });

    it('should throw an error if jwtService.sign throws an error', async () => {
      const user = new Client();
      user.id = 1;
    
      jest.spyOn(authService, 'validateUser').mockImplementation(() => Promise.resolve(user));
      jest.spyOn(jwtService, 'sign').mockImplementation(() => { throw new Error('jwt error'); });
    
      await expect(authService.login({ email: 'myemail@gmail.com', password: 'password1235' })).rejects.toThrow();
    });
  });
});
