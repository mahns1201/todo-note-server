import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RepoDao } from './repo.dao';
import { FindRepoByIdDto } from './dto/find-repo.dto';
import { ResDto } from 'src/common/common.dto';
import { CreateRepoDto } from './dto/create-repo.dto';
import { RepoDto } from './dto/repo.dto';

@Injectable()
export class RepoService {
  constructor(private readonly repoDao: RepoDao) {}

  async createRepo(dto: CreateRepoDto): Promise<ResDto<RepoDto>> {
    const repo = await this.repoDao.create(dto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: '레포지토리가 생성되었습니다.',
      item: repo,
    };
  }

  async findRepo(dto: FindRepoByIdDto) {
    const { id, userId } = dto;
    const repo = await this.repoDao.findById(id);

    if (!repo) {
      throw new NotFoundException('레포지토리를 찾을 수 없습니다.');
    }

    if (repo.user.id !== userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    return {
      httpStatus: HttpStatus.OK,
      message: '레포지토리를 찾았습니다.',
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
