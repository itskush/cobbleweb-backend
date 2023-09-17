import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private s3;
    constructor(configService: ConfigService);
    uploadFile(file: any, bucket: any): Promise<string>;
    generatePresignedUrl(bucket: any, key: any): Promise<string>;
}
