import { Module } from '@nestjs/common';
import { TaskController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from './entity/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadEntity])],
  controllers: [TaskController],
  providers: [],
})
export class UploadModule {}
