import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskDao } from './task.dao';
import { RepoModule } from 'src/repo/repo.module';
import { RepoService } from 'src/repo/repo.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { GithubModule } from 'src/github/github.module';
import { GithubService } from 'src/github/github.service';

@Module({
  imports: [
    RepoModule,
    UserModule,
    GithubModule,
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskDao, RepoService, UserService, GithubService],
  exports: [TaskDao],
})
export class TaskModule {}
