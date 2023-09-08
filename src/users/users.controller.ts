import { Controller, Get, BadRequestException, Req, UseGuards} from '@nestjs/common';
import { S3Service } from '../auth/s3.service';
import { Client } from './entities/client.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserDto } from './dto/user.dto';


@Controller('api')
export class UsersController {
    constructor(
        @InjectRepository(Client) private repo: Repository<Client>,
        private readonly s3Service: S3Service,
        private configService: ConfigService
    ) {}

    /**
     * Retrieves the details of the currently authenticated user.
     * @param req - The request object.
     * @returns A promise that resolves to the user details.
     * @throws BadRequestException if the user is not found.
     */
    @UseGuards(JwtAuthGuard)
    @Get('users/me')
    async findMe(@Req() req): Promise<UserDto> {
        const [client] = await this.repo.find({ where: { id: req.user.id } });
        if (!client) {
            throw new BadRequestException('User not found');
        }

        if (client.photos && client.photos.length > 0) {
            for (let i = 0; i < client.photos.length; i++) {
                // if we were to generate sensitive urls, we would use this preseigned url function that expires
                const url = await this.s3Service.generatePresignedUrl(
                    this.configService.get('AWS_BUCKET'),
                    client.photos[i].name
                );
                if (url) {
                    client.photos[i].url = url;
                } else {
                    client.photos[i].url = 'No url found or object has been deleted from S3';
                }
            }
        }

        // remove the password from the client object
        client.password = undefined;

        return client;
    }
}


