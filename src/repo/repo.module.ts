import { Module } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { RepoDao } from './repo.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepoEntity } from './repo.entity';
import { UserService } from 'src/user/user.service';
import { GithubService } from 'src/github/github.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RepoEntity]), UserModule],
  controllers: [RepoController],
  providers: [RepoService, RepoDao, UserService, GithubService],
  exports: [RepoDao],
})
export class RepoModule {}
