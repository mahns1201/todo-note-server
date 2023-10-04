import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('upload')
export class TaskController {}
