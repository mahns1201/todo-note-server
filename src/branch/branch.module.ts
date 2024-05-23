import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './branch.entity';
import { BranchDao } from './branch.dao';
import { RepoEntity } from 'src/repo/repo.entity';
import { RepoService } from 'src/repo/repo.service';
import { RepoModule } from 'src/repo/repo.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { GithubService } from 'src/github/github.service';

@Module({
  imports: [
    UserModule,
    RepoModule,
    TypeOrmModule.forFeature([BranchEntity, RepoEntity]),
  ],
  controllers: [BranchController],
  providers: [
    BranchService,
    BranchDao,
    RepoService,
    UserService,
    GithubService,
  ],
  exports: [BranchDao],
})
export class BranchModule {}
