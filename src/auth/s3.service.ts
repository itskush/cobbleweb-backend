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
    const uniqueKey = Date.now()+ '-' + file.originalname;

    const params = {
      Bucket: bucket,
      Key: uniqueKey,
      Body: file.buffer,
      ACL: 'public-read',
    };

    const command = new PutObjectCommand(params);
    const response = await this.s3.send(command);
    if(response.$metadata.httpStatusCode !== 200) {
      throw new Error('Error uploading file to S3');
    } else{
      return uniqueKey;
    }
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