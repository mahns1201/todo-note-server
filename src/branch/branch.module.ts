import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './branch.entity';
import { BranchDao } from './branch.dao';
import { RepoDao } from 'src/repo/repo.dao';
import { RepoEntity } from 'src/repo/repo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity, RepoEntity])],
  controllers: [BranchController],
  providers: [BranchService, BranchDao, RepoDao],
  exports: [BranchDao],
})
export class BranchModule {}
