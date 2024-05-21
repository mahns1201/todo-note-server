import { Module } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
import { RepoDao } from './repo.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepoEntity } from './repo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepoEntity])],
  controllers: [RepoController],
  providers: [RepoService, RepoDao],
  exports: [RepoDao],
})
export class RepoModule {}
