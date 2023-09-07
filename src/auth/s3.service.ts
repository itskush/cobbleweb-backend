import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface S3Response {
  Location: string;
}

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey:  this.configService.get('AWS_SECRET_ACCESS_KEY'),
    }
    });
  }

  async uploadFile(file, bucket) {
    const params = {
      Bucket: bucket,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
    };

    const command = new PutObjectCommand(params);
    const response = await this.s3.send(command);

    return response;
  }

  async generatePresignedUrl(bucket, key) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
    return url;
  }
}