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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResFindSprintDto } from './dto/find-sprint.dto';
import { PagingReqDto } from 'src/common/common.dto';
import { ResFindSprintsDto } from './dto/find-sprints.dto';

@UseGuards(JwtAuthGuard)
@Controller('sprint')
@ApiBearerAuth('accessToken')
@ApiTags('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '스프린트 생성',
    description: '새로운 스프린트를 생성합니다.',
  })
  @ApiCreatedResponse({
    type: ResCreateSprintDto,
    status: HttpStatus.CREATED,
    description: '스프린트를 성공적으로 생성하였습니다.',
  })
  async createSprint(
    @Request() req,
    @Body() body: CreateSprintDto,
  ): Promise<ResCreateSprintDto> {
    const sprint = await this.sprintService.createSprint({
      ...body,
      userId: req.user.id,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: '스프린트를 생성했습니다.',
      item: {
        id: sprint.id,
        createdAt: sprint.createdAt,
        updatedAt: sprint.updatedAt,
        userId: sprint.userId,
        title: sprint.title,
        description: sprint.description,
        startAt: sprint.startAt,
        endAt: sprint.endAt,
      },
    };
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '태스크 목록 조회',
    description: '태스크 목록을 조회합니다.',
  })
  @ApiQuery({
    type: PagingReqDto,
    name: '페이징 요청',
  })
  @ApiOkResponse({
    type: ResFindSprintsDto,
    status: HttpStatus.OK,
  })
  async getSprintList(
    @Request() req,
    @Query() query,
  ): Promise<ResFindSprintsDto> {
    const sprints = await this.sprintService.findSprints({
      userId: req.user.id,
      page: query.page,
      pageSize: query.pageSize,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
    });

    return {
      statusCode: HttpStatus.OK,
      message: '스프린트 리스트를 조회했습니다.',
      items: sprints[0],
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
    type: ResFindSprintDto,
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
      item: {
        id: sprint.id,
        createdAt: sprint.createdAt,
        updatedAt: sprint.updatedAt,
        userId: sprint.userId,
        title: sprint.title,
        description: sprint.description,
        startAt: sprint.startAt,
        endAt: sprint.endAt,
      },
    };
  }
}
