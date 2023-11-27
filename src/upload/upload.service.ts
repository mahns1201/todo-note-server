import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { UploadEntity } from './entity/upload.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadRepository: Repository<UploadEntity>,

    private configService: ConfigService,
  ) {}

  AWS_S3_BUCKET = this.configService.get<string>('AWS_S3_BUCKET');
  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
    secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
  });

  async uploadFile(file) {
    const { buffer, originalname, mimetype, encoding } = file;
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(`${new Date()}_${originalname}`),
      Body: buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return { s3Response, originalname, mimetype, encoding };
    } catch (error) {
      Logger.error(error.message);
      throw new Error(error);
    }
  }

  async createUpload(input) {
    const { userId, taskId, originalname, encoding, mimetype, url } = input;
    const newUpload = this.uploadRepository.create({
      user: userId,
      task: taskId,
      originalname,
      encoding,
      mimetype,
      url,
    });

    const result = await this.uploadRepository.save(newUpload);

    return { item: result };
  }

  async findUploadByTaskId(input) {
    const { taskId, userId } = input;
    const upload = await this.uploadRepository
      .createQueryBuilder('upload')
      .where('upload.taskId = :taskId', { taskId })
      .where('upload.userId = :userId', { userId })
      .getRawMany();

    return { item: upload };
  }
}
