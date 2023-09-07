import { Controller, Body, Post, UseGuards, Get, UseInterceptors, HttpException, HttpStatus, UploadedFiles } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Client } from '../users/entities/client.entity';
import { UsersService } from '../users/users.service';
import { S3Service } from './s3.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Controller('api')
export class AuthController {

  constructor(
    @InjectRepository(Client) private repo: Repository<Client>,
    private readonly authService: AuthService,
    private readonly s3Service: S3Service,
    private userService: UsersService,
    private configService: ConfigService,
    ) {}

  @Post('login')
  async login(@Body() authLoginDto: UserLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('register')
  @UseInterceptors(FilesInterceptor('photos'))
  async register(@Body() createUserDto: CreateUserDto, @UploadedFiles() photos) {

    const user = await this.userService.findUserByEmail(createUserDto.email);
    if (user.length > 0) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if (photos.length < 4) {
      throw new HttpException('At least 4 images should be uploaded', HttpStatus.BAD_REQUEST);
    }

    const photoEntities = await Promise.all(photos.map(async (photo) => {
        if (photo.mimetype !== 'image/jpeg' && photo.mimetype !== 'image/png') {
          throw new HttpException('Invalid file type', HttpStatus.BAD_REQUEST);
        }

        await this.s3Service.uploadFile(photo, this.configService.get('AWS_BUCKET'));

        return {
          name: photo.originalname,
          url: `https://cw-recruitment-tests.s3.eu-west-1.amazonaws.com/${photo.originalname}`,
        };
      }));

    createUserDto.photos = photoEntities;
  
    return await this.userService.create(createUserDto);
  }

}