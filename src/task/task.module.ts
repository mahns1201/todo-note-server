import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskEntity } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from 'src/upload/upload.service';
import { UploadEntity } from 'src/upload/entity/upload.entity';
import { RepoService } from 'src/repo/repo.service';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { RepoBranchEntity } from 'src/repo/entity/repo-branch.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskEntity,
      UserEntity,
      RepoEntity,
      RepoBranchEntity,
      UploadEntity,
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, UserService, RepoService, UploadService],
})
export class TaskModule {}
