import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintEntity } from './sprint.entity';
import { SprintDao } from './sprint.dao';
import { RepoModule } from 'src/repo/repo.module';
import { RepoService } from 'src/repo/repo.service';
import { UserModule } from 'src/user/user.module';
import { GithubModule } from 'src/github/github.module';
import { UserService } from 'src/user/user.service';
import { GithubService } from 'src/github/github.service';

@Module({
  imports: [
    RepoModule,
    UserModule,
    GithubModule,
    TypeOrmModule.forFeature([SprintEntity]),
  ],
  controllers: [SprintController],
  providers: [
    SprintService,
    SprintDao,
    RepoService,
    UserService,
    GithubService,
  ],
  exports: [SprintDao],
})
export class SprintModule {}
