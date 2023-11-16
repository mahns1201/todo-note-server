import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { ProjectEntity } from './entity/project.entity';
import { RepoEntity } from 'src/repo/entity/repo.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, RepoEntity, UserEntity]),
    HttpModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, UserService],
})
export class ProjectModule {}
