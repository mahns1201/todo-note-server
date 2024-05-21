import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SprintDao } from './sprint.dao';
import { FindSprintByIdDto } from './dto/find-sprint.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';

@Injectable()
export class SprintService {
  constructor(private readonly sprintDao: SprintDao) {}

  async createSprint(dto: CreateSprintDto) {
    const sprint = await this.sprintDao.create(dto);

    return {
      httpStatus: HttpStatus.CREATED,
      message: '스프린트가 생성되었습니다.',
      item: sprint,
    };
  }

  async findSprint(dto: FindSprintByIdDto) {
    const { id, userId } = dto;
    const sprint = await this.sprintDao.findById(id);

    if (!sprint) {
      throw new NotFoundException('스프린트를 찾을 수 없습니다.');
    }

    if (sprint.user.id !== userId) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    return {
      httpStatus: HttpStatus.OK,
      message: '스프린트를 찾았습니다.',
      item: {
        ...sprint,
        user: {
          id: sprint.user.id,
          email: sprint.user.email,
          githubId: sprint.user.githubId,
        },
      },
    };
  }
}
