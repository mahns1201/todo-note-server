import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { RepoEntity } from './entity/repo.entity';
import { RepoBranchEntity } from './entity/repo-branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RepoEntity, RepoBranchEntity, UserEntity]),
    HttpModule,
  ],
  controllers: [RepoController],
  providers: [RepoService],
})
export class RepoModule {}
