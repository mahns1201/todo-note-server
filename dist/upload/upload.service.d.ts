import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { UploadEntity } from './entity/upload.entity';
import { Repository } from 'typeorm';
export declare class UploadService {
    private uploadRepository;
    private configService;
    constructor(uploadRepository: Repository<UploadEntity>, configService: ConfigService);
    AWS_S3_BUCKET: string;
    s3: AWS.S3;
    uploadFile(file: any): Promise<{
        s3Response: AWS.S3.ManagedUpload.SendData;
        originalname: any;
        mimetype: any;
        encoding: any;
    }>;
    createUpload(input: any): Promise<{
        item: UploadEntity;
    }>;
    findUploadByTaskId(input: any): Promise<{
        item: any[];
    }>;
}
