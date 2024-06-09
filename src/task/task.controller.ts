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
import { TaskService } from './task.service';
import { CreateTaskDto, ResCreateTaskDto } from './dto/create-task.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResFindTaskDto } from './dto/find-task.dto';
import { PagingReqDto } from 'src/common/common.dto';
import { ResFindTasksDto } from './dto/find-tasks.dto';
import { ResTaskDto } from './dto/task.dto';

@UseGuards(JwtAuthGuard)
@Controller('task')
@ApiBearerAuth('accessToken')
@ApiTags('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  serialize(task) {
    return {
      id: task.id,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      userId: task.userId,
      repoId: task.repoId,
      title: task.title,
      content: task.content,
      isGithubIssue: task.isGithubIssue,
      repoName: task.repo.repoName,
      repoHtmlUrl: task.repo.htmlUrl,
      repoOwnerAvatarUrl: task.repo.ownerAvatarUrl,
      repoSynchronizedAt: task.repo.synchronizedAt,
    };
  }

  @Post('repo/:repoId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '태스크 생성',
    description: '새로운 태스크를 생성합니다.',
  })
  @ApiCreatedResponse({
    type: ResTaskDto,
    status: HttpStatus.CREATED,
    description: '태스크를 성공적으로 생성하였습니다.',
  })
  async createTask(
    @Request() req,
    @Param() param,
    @Body() body: CreateTaskDto,
  ): Promise<ResCreateTaskDto> {
    const task = await this.taskService.createTask({
      ...body,
      repoId: param.repoId,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: '태스크를 생성했습니다.',
      item: this.serialize(task),
    };
  }

  @Get('repo/:repoId/list')
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
    type: [ResTaskDto],
    status: HttpStatus.OK,
  })
  async getTaskListByRepoId(
    @Request() req,
    @Query() query,
    @Param() param,
  ): Promise<ResFindTasksDto> {
    const [tasks, totalCount] = await this.taskService.findTasksByRepoId({
      userId: req.user.id,
      repoId: param.repoId,
      page: query.page,
      pageSize: query.pageSize,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
    });

    return {
      statusCode: HttpStatus.OK,
      message: `총 ${totalCount}개중 ${tasks.length}개의 태스크 리스트를 조회했습니다.`,
      items: tasks.map((task) => this.serialize(task)),
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
    type: [ResTaskDto],
    status: HttpStatus.OK,
  })
  async getTaskList(@Request() req, @Query() query): Promise<ResFindTasksDto> {
    const [tasks, totalCount] = await this.taskService.findTasks({
      userId: req.user.id,
      page: query.page,
      pageSize: query.pageSize,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
    });

    return {
      statusCode: HttpStatus.OK,
      message: `총 ${totalCount}개중 ${tasks.length}개의 태스크 리스트를 조회했습니다.`,
      items: tasks.map((task) => this.serialize(task)),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '태스크 조회',
    description: '태스크를 조회합니다.',
  })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @ApiOkResponse({
    type: ResTaskDto,
    status: HttpStatus.OK,
  })
  async findTask(@Request() req, @Param() param): Promise<ResFindTaskDto> {
    const task = await this.taskService.findTask({
      id: param.id,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.OK,
      message: '태스크를 조회했습니다.',
      item: this.serialize(task),
    };
  }
}
