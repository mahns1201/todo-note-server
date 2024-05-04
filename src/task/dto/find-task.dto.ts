import { PickType } from '@nestjs/swagger';
import { TaskDto } from './task.dto';

export class InputFindTaskDto extends PickType(TaskDto, ['id'] as const) {}
