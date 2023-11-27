import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { RepoEntity } from './entity/repo.entity';
import { RepoBranchEntity } from './entity/repo-branch.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RepoEntity, RepoBranchEntity, UserEntity]),
  ],
  controllers: [RepoController],
  providers: [RepoService, UserService],
})
export class RepoModule {}
