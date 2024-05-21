import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BranchDao } from './branch.dao';
import { CreateBranchDto } from './dto/create-branch-dto';
import { ResDto } from 'src/common/common.dto';
import { RepoDao } from 'src/repo/repo.dao';
import { FindBranchByIdDto } from './dto/find-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    private readonly branchDao: BranchDao,
    private readonly repoDao: RepoDao,
  ) {}

  async createBranch(dto: CreateBranchDto): Promise<ResDto<any>> {
    const { userId, repoId } = dto;
    const repo = await this.repoDao.findById(repoId);

    if (!repo) {
      throw new NotFoundException('레포지토리를 찾을 수 없습니다.');
    }

    if (repo.user.id !== userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    const branch = await this.branchDao.create(dto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: '브랜치가 생성되었습니다.',
      item: branch,
    };
  }

  async findBranch(dto: FindBranchByIdDto): Promise<ResDto<any>> {
    const { id, repoId, userId } = dto;

    const repo = await this.repoDao.findById(repoId);
    if (!repo) {
      throw new NotFoundException('레포지토리를 찾을 수 없습니다.');
    }
    if (repo.user.id !== userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    const branch = await this.branchDao.findById(id);
    if (!branch) {
      throw new NotFoundException('브랜치를 찾을 수 없습니다.');
    }

    return {
      httpStatus: HttpStatus.OK,
      message: '브랜치를 찾았습니다.',
      item: {
        ...branch,
        repo: {
          id: branch.repo.id,
          repoName: branch.repo.repoName,
        },
      },
    };
  }
}
