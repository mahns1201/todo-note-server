import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/jwt/auth.guard';

@Controller('task')
@UseGuards(AuthGuard)
@ApiTags('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({
    name: 'JWT',
    description: 'Bearer JWT 토큰을 해더에 담아서 요청',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        repoId: {
          type: 'number',
          description: 'repoId',
        },
        repoBranchId: {
          type: 'number',
          description: 'repoBranchId',
        },
        title: {
          type: 'string',
          description: '제목',
        },
        content: {
          type: 'string',
          description: '내용',
        },
      },
    },
  })
  @ApiOperation({
    summary: '태스크 생성',
    description: '새로운 태스크를 생성합니다.',
  })
  async createTask(@Request() request, @Body() body) {
    const { id: userId } = request.user;
    const input = { userId, ...body };

    const newTask = await this.taskService.createOne(input);
    const httpStatus = !newTask
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.CREATED;
    const message = !newTask
      ? '태스크 생성에 실패했습니다.'
      : '태스크가 성공적으로 생성되었습니다.';

    const result = { httpStatus, message, item: newTask };

    return result;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'JWT',
    description: 'Bearer JWT 토큰을 해더에 담아서 요청',
  })
  @ApiParam({
    name: 'id',
    description: 'taskId',
  })
  @ApiOperation({
    summary: '태스크 조회',
    description: 'parameter에 id를 넘겨 태스크를 조회합니다.',
  })
  async findTaskById(@Param() param) {
    const { id: taskId } = param;

    const { task, upload } = await this.taskService.findOne(taskId);
    const httpStatus = !task ? HttpStatus.NOT_FOUND : HttpStatus.OK;
    const message = !task
      ? '태스크를 해당 id로 찾을 수 없습니다.'
      : '태스크를 성공적으로 찾았습니다.';

    const result = { items: { task, upload }, httpStatus, message };
    return result;
  }
}
