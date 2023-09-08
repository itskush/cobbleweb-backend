import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { S3Service } from '../s3.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../users/entities/client.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let s3Service: S3Service;
  let configService: ConfigService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
        AuthService,
        UsersService,
        {
            provide: JwtService,
            useValue: {
            sign: jest.fn().mockReturnValue('testToken'),
            },
        },
        {
            provide: S3Service,
            useValue: {
              uploadFile: jest.fn().mockReturnValue(Promise.resolve()),
            },
        },
        {
            provide: getRepositoryToken(Client),
            useClass: Repository,
        },
        ConfigService,
        ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    authController = module.get<AuthController>(AuthController);
    s3Service = module.get<S3Service>(S3Service);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const loginDto = { email: 'myemail@gmail.com', password: 'pass1234' };
      const authServiceLoginSpy = jest.spyOn(authService, 'login').mockImplementation(() => Promise.resolve({ access_token: 'testToken' }));

      await authController.login(loginDto);

      expect(authServiceLoginSpy).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should throw an error if user already exists', async () => {
      const createUserDto = { firstName:'kush', lastName:'pr', email: 'myemail@gmail.com', password: 'test12345', photos: [] };
      jest.spyOn(usersService, 'findUsersByEmail').mockImplementation(() => Promise.resolve([new Client()]));

      await expect(authController.register(createUserDto, [])).rejects.toThrow();
    });

    it('should throw an error if less than 4 photos are uploaded', async () => {
        const createUserDto = { firstName:'kush', lastName:'pr', role:'', active: true, email: 'myemail@gmail.com', password: 'test1234', photos: [] };
      jest.spyOn(usersService, 'findUsersByEmail').mockImplementation(() => Promise.resolve([]));

      await expect(authController.register(createUserDto, ['photo1', 'photo2', 'photo3'])).rejects.toThrow();
    });

    it('should throw an error if an invalid file type is uploaded', async () => {
        const createUserDto = { firstName:'kush', lastName:'pr', email: 'myemail@gmail.com', password: 'test1234', photos: [] };
      jest.spyOn(usersService, 'findUsersByEmail').mockImplementation(() => Promise.resolve([]));
      jest.spyOn(s3Service, 'uploadFile').mockImplementation(() => Promise.resolve({} as any));

      await expect(authController.register(createUserDto, [
        { mimetype: 'image/jpeg', originalname: 'photo1' },
        { mimetype: 'image/jpeg', originalname: 'photo2' },
        { mimetype: 'image/jpeg', originalname: 'photo3' },
        // gif here is not a valid file type
        { mimetype: 'image/gif', originalname: 'photo4' },
      ])).rejects.toThrow();
    });
  });
});