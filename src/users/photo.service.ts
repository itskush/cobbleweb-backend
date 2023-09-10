import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private repo: Repository<Photo>,
  ) {}
  async addPhoto(photos, user) {
    const photo = new Photo();
    photo.name = photos.key;
    photo.url = photos.url;
    photo.user = user;
    const addPhoto = this.repo.create(photo);
    const createdPhoto = await this.repo.save(addPhoto);
    if (createdPhoto) {
      return createdPhoto;
    }
    return Error('Photo was not created successfully');
  }

}