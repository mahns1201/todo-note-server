/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File, input: any): Promise<{
        item: import("./entity/upload.entity").UploadEntity;
        httpStatus: HttpStatus;
        message: string;
    }>;
}
