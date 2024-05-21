import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RepoDao } from './repo.dao';
import { FindRepoByIdDto } from './dto/find-repo-dto';
import { ResDto } from 'src/common/common.dto';
import { CreateRepoDto } from './dto/create-repo-dto';
import { RepoDto } from './dto/repo.dto';

@Injectable()
export class RepoService {
  constructor(private readonly repoDao: RepoDao) {}

  async createRepo(dto: CreateRepoDto): Promise<ResDto<RepoDto>> {
    const repo = await this.repoDao.create(dto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: `[id: ${repo.id}] 레포지토리가 생성되었습니다.`,
      item: repo,
    };
  }

  async findRepo(dto: FindRepoByIdDto) {
    const { id, userId } = dto;
    const repo = await this.repoDao.findById(id);

    if (repo.user.id !== userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    return {
      httpStatus: HttpStatus.OK,
      message: `[id: ${repo.id}] 레포지토리를 반환합니다.`,
      item: {
        ...repo,
        user: {
          id: repo.user.id,
          email: repo.user.email,
          githubId: repo.user.githubId,
        },
      },
    };
  }
}
