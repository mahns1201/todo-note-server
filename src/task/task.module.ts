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
import { SprintModule } from 'src/sprint/sprint.module';
import { SprintService } from 'src/sprint/sprint.service';

@Module({
  imports: [
    RepoModule,
    UserModule,
    GithubModule,
    SprintModule,
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskDao,
    RepoService,
    UserService,
    GithubService,
    SprintService,
  ],
  exports: [TaskDao],
})
export class TaskModule {}
