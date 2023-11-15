import { Controller } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
}
