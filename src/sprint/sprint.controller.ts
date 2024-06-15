import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { SprintService } from './sprint.service';
import { CreateSprintDto, ResCreateSprintDto } from './dto/create-sprint.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResFindSprintDto } from './dto/find-sprint.dto';
import { PagingReqDto } from 'src/common/common.dto';
import { ResFindSprintsDto } from './dto/find-sprints.dto';
import { ResSprintDto } from './dto/sprint.dto';

@UseGuards(JwtAuthGuard)
@Controller('sprint')
@ApiBearerAuth('accessToken')
@ApiTags('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  serialize(sprint) {
    return {
      id: sprint.id,
      createdAt: sprint.createdAt,
      updatedAt: sprint.updatedAt,
      userId: sprint.userId,
      repoId: sprint.repoId,
      title: sprint.title,
      description: sprint.description,
      startAt: sprint.startAt,
      endAt: sprint.endAt,
      repoName: sprint.repo.name,
      repoHtmlUrl: sprint.repo.htmlUrl,
      repoOwnerAvatarUrl: sprint.repo.ownerAvatarUrl,
      repoSynchronizedAt: sprint.repo.synchronizedAt,
    };
  }

  @Post('repo/:repoId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '스프린트 생성',
    description: '새로운 스프린트를 생성합니다.',
  })
  @ApiCreatedResponse({
    type: ResSprintDto,
    status: HttpStatus.CREATED,
    description: '스프린트를 성공적으로 생성하였습니다.',
  })
  async createSprint(
    @Request() req,
    @Param() param,
    @Body() body: CreateSprintDto,
  ): Promise<ResCreateSprintDto> {
    const sprint = await this.sprintService.createSprint({
      ...body,
      repoId: param.repoId,
      userId: req.user.id,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: '스프린트를 생성했습니다.',
      item: this.serialize(sprint),
    };
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '스프린트 목록 조회',
    description: '스프린트 목록을 조회합니다.',
  })
  @ApiOkResponse({
    type: [ResSprintDto],
    status: HttpStatus.OK,
  })
  async getSprintList(
    @Request() req,
    @Query() query: PagingReqDto,
  ): Promise<ResFindSprintsDto> {
    const [sprints, totalCount] = await this.sprintService.findSprints({
      userId: req.user.id,
      page: query.page,
      pageSize: query.pageSize,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
    });

    return {
      statusCode: HttpStatus.OK,
      message: `총 ${totalCount}개중 ${sprints.length}개의 스프린트 리스트를 조회했습니다.`,
      items: sprints.map((sprint) => this.serialize(sprint)),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '스프린트 조회',
    description: '스프린트를 조회합니다.',
  })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @ApiOkResponse({
    type: ResSprintDto,
    status: HttpStatus.OK,
  })
  async findSprint(@Request() req, @Param() param): Promise<ResFindSprintDto> {
    const sprint = await this.sprintService.findSprint({
      id: param.id,
      userId: req.user.id,
    });

    return {
      statusCode: HttpStatus.OK,
      message: '스프린트를 조회했습니다.',
      item: this.serialize(sprint),
    };
  }
}
