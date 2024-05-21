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
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Request() req, @Body() body: CreateTaskDto) {
    const result = await this.taskService.createTask({
      ...body,
      userId: req.user.id,
    });
    return result;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findTask(@Request() req, @Param() param) {
    const result = await this.taskService.findTask({
      id: param.id,
      userId: req.user.id,
    });
    return result;
  }
}
