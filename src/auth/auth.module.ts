import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { S3Service } from './s3.service';
import { UsersService } from '../users/users.service';
import { PhotoService } from '../users/photo.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './guards/jwt.strategy';
import { User } from '../users/entities/users.entity';
import { Client } from '../users/entities/client.entity';
import { Photo } from '../users/entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Photo]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, S3Service, ConfigService, PhotoService]
})
export class AuthModule {}