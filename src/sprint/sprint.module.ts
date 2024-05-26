import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintEntity } from './sprint.entity';
import { SprintDao } from './sprint.dao';

@Module({
  imports: [TypeOrmModule.forFeature([SprintEntity])],
  controllers: [SprintController],
  providers: [SprintService, SprintDao],
  exports: [SprintDao],
})
export class SprintModule {}
