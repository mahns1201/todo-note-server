import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskEntity } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from 'src/upload/upload.service';
import { UploadEntity } from 'src/upload/entity/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UploadEntity])],
  controllers: [TaskController],
  providers: [TaskService, UploadService],
})
export class TaskModule {}
