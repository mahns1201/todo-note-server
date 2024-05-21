import { HttpStatus, Injectable } from '@nestjs/common';
import { RepoDao } from './repo.dao';
import { FindRepoByIdDto } from './dto/find-repo-dto';
import { ResDto } from 'src/common/common.dto';
import { RepoEntity } from './repo.entity';
import { CreateRepoDto } from './dto/create-repo-dto';

@Injectable()
export class RepoService {
  constructor(private readonly repoDao: RepoDao) {}

  async createRepo(dto: CreateRepoDto): Promise<ResDto<RepoEntity>> {
    const repo = await this.repoDao.create(dto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: `[id: ${repo.id}] 레포지토리가 생성되었습니다.`,
      item: repo,
    };
  }

  async findRepo(dto: FindRepoByIdDto) {
    console.log(dto);
    const { id, user } = dto;
    const repo = await this.repoDao.findById(id);

    // TODO user validation: unauthorized error 확인
    // console.log(user);
    // if (repo.user !== user) {
    //   throw new UnauthorizedException('Unauthorized');
    // }

    return {
      httpStatus: HttpStatus.OK,
      message: `[id: ${repo.id}] 레포지토리를 반환합니다.`,
      item: repo,
    };
  }
}
