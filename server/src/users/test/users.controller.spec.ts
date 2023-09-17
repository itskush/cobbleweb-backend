import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { S3Service } from '../../auth/s3.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  let usersController: UsersController;
  let s3Service: S3Service;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        S3Service,
        ConfigService,
        {
          provide: getRepositoryToken(Client),
          useClass: Repository,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    s3Service = module.get<S3Service>(S3Service);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findMe', () => {
    it('should return a user if valid request is provided', async () => {
      const req = { user: { id: 1 } };
      const client = new Client();
      const testUrl = 'https://cdn-site-assets.veed.io/Bubble_House_b5c33a3788/Bubble_House_b5c33a3788.webp?updated_at=2022-11-24T06%3A45%3A22.352Z&width=640&quality=75';
      
      client.photos = [
        { id: 1, name: 'photo1',url:'https://cdn-site-assets.veed.io/Bubble_House_b5c33a3788/Bubble_House_b5c33a3788.webp?updated_at=2022-11-24T06%3A45%3A22.352Z&width=640&quality=75',user: client, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'photo1',url:'https://cdn-site-assets.veed.io/Bubble_House_b5c33a3788/Bubble_House_b5c33a3788.webp?updated_at=2022-11-24T06%3A45%3A22.352Z&width=640&quality=75',user: client, createdAt: new Date(), updatedAt: new Date() },
        { id: 3, name: 'photo1',url:'https://cdn-site-assets.veed.io/Bubble_House_b5c33a3788/Bubble_House_b5c33a3788.webp?updated_at=2022-11-24T06%3A45%3A22.352Z&width=640&quality=75',user: client, createdAt: new Date(), updatedAt: new Date() },
        { id: 4, name: 'photo1',url:'https://cdn-site-assets.veed.io/Bubble_House_b5c33a3788/Bubble_House_b5c33a3788.webp?updated_at=2022-11-24T06%3A45%3A22.352Z&width=640&quality=75',user: client, createdAt: new Date(), updatedAt: new Date() },
      ];
      client.password = '1234Test';
      jest.spyOn(usersController['repo'], 'find').mockImplementation(() => Promise.resolve([client]));
      jest.spyOn(s3Service, 'generatePresignedUrl').mockImplementation(() => Promise.resolve(testUrl));

      const result = await usersController.findMe(req);

      expect(result).toEqual({ ...client, password: undefined });
      expect(result.photos[0].url).toEqual(testUrl);
      expect(result.photos[1].url).toEqual(testUrl);
    });

    it('should throw an error if no user is found', async () => {
      const req = { user: { id: 1 } };
      jest.spyOn(usersController['repo'], 'find').mockImplementation(() => Promise.resolve([]));
      await expect(usersController.findMe(req)).rejects.toThrow();
    });
  });
});
