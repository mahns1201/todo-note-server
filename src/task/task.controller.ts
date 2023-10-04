import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '태스크 생성',
    description: '새로운 태스크를 생성합니다.',
  })
  async createTask(@Body() input) {
    const { item } = await this.taskService.createTask(input);
    const httpStatus = !item
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.CREATED;
    const message = !item
      ? '태스크 생성에 실패했습니다.'
      : '태스크가 성공적으로 생성되었습니다.';

    const result = { item, httpStatus, message };
    return result;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '태스크 조회',
    description: 'parameter에 id를 넘겨 태스크를 조회합니다.',
  })
  async findTaskById(@Param() input) {
    const { item } = await this.taskService.findTaskById(input);
    const httpStatus = !item ? HttpStatus.NOT_FOUND : HttpStatus.OK;
    const message = !item
      ? '태스크를 해당 이메일로 찾을 수 없습니다.'
      : '태스크를 성공적으로 찾았습니다.';

    const result = { item, httpStatus, message };
    return result;
  }
}
