import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { Client } from './entities/client.entity';
import { Photo } from './entities/photo.entity';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Service } from '../auth/s3.service';

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User, Client, Photo]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  providers: [UsersService, JwtStrategy, S3Service, ConfigService],
})
export class UsersModule {}