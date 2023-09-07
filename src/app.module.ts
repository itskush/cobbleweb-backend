import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity';
import { Client } from './users/entities/client.entity';
import { Photo } from './users/entities/photo.entity';


@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port:  configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Client, Photo]
    }),
    inject: [ConfigService],
  }),
  UsersModule,
  AuthModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
