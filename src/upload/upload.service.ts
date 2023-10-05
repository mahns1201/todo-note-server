import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  AWS_S3_BUCKET = this.configService.get<string>('AWS_S3_BUCKET');
  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
    secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
  });

  async uploadFile(file) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      `${new Date()}_${originalname}`,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
