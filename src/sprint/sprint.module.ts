import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintEntity } from './sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SprintEntity])],
  controllers: [SprintController],
  providers: [SprintService],
})
export class SprintModule {}
