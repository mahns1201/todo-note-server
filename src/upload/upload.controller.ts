import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '업로드 생성',
    description: '파일을 s3에 업로드하고 upload db를 생성합니다.',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() input) {
    const { userId, taskId } = input;
    const {
      s3Response: { Location: url },
      originalname,
      mimetype,
      encoding,
    } = await this.uploadService.uploadFile(file);

    const { item } = await this.uploadService.createUpload({
      userId,
      taskId,
      originalname,
      encoding,
      mimetype,
      url,
    });

    const httpStatus = !item
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.CREATED;
    const message = !item
      ? '파일 업로드를 실패하였습니다.'
      : '파일 업로드를 성공하였습니다.';

    const result = { item, httpStatus, message };
    return result;
  }
}
