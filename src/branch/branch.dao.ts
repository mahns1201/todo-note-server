import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchEntity } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch-dto';

@Injectable()
export class BranchDao {
  constructor(
    @InjectRepository(BranchEntity)
    private branchRepository: Repository<BranchEntity>,
  ) {}

  async create(dto: CreateBranchDto): Promise<BranchEntity> {
    const branch = this.branchRepository.create(dto);
    await this.branchRepository.save(branch);

    return branch;
  }

  async findById(id: number): Promise<BranchEntity> {
    return await this.branchRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: ['repo'],
    });
  }
}
