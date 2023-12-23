import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { SprintEntity } from './entity/sprint.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { UserService } from 'src/user/user.service';
import { RepoService } from 'src/repo/repo.service';
import { RepoBranchEntity } from 'src/repo/entity/repo-branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SprintEntity,
      UserEntity,
      RepoEntity,
      RepoBranchEntity,
    ]),
  ],
  controllers: [SprintController],
  providers: [SprintService, UserService, RepoService],
})
export class SprintModule {}
