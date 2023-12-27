import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoService } from 'src/repo/repo.service';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { RepoBranchEntity } from 'src/repo/entity/repo-branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RepoEntity, RepoBranchEntity]),
  ],
  controllers: [GithubController],
  providers: [GithubService, UserService, RepoService],
})
export class GithubModule {}
