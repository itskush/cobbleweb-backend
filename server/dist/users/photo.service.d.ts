import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
export declare class PhotoService {
    private repo;
    constructor(repo: Repository<Photo>);
    addPhoto(photos: any, user: any): Promise<Error | Photo>;
}
