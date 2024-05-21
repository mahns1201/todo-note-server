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
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';

@UseGuards(JwtAuthGuard)
@Controller('sprint')
export class SprintController {
  constructor(private sprintService: SprintService) {}

  @Post()
  async createSprint(@Request() req, @Body() body: CreateSprintDto) {
    const result = await this.sprintService.createSprint({
      ...body,
      userId: req.user.id,
    });
    return result;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findSprint(@Request() req, @Param() param) {
    const result = await this.sprintService.findSprint({
      id: param.id,
      userId: req.user.id,
    });
    return result;
  }
}
