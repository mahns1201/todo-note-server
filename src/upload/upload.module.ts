import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from './entity/upload.entity';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UploadEntity])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
