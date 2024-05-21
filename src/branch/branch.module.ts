import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity])],
  controllers: [BranchController],
  providers: [BranchService],
  // providers: [BranchService, BranchDao],
  // exports: [BranchDao],
})
export class BranchModule {}
