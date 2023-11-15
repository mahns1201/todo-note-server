import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('project')
@UseGuards(AuthGuard)
@ApiTags('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) {}

  @Get('/github/list')
  async getProjectsFromGithub(@Request() request) {
    const { email, username } = request.user;

    const {
      item: { githubAccessToken },
    } = await this.userService.findUser({ email });

    const { items } = await this.projectService.getProjectsFromGithub(
      githubAccessToken,
      username,
    );

    return {
      items,
    };
  }

  @Get('/github')
  async getProjectFromGithub(@Request() request) {
    const { email, username } = request.user;

    const {
      item: { githubAccessToken },
    } = await this.userService.findUser({ email });

    const { item } = await this.projectService.getProjectFromGithub(
      githubAccessToken,
      username,
    );

    return {
      item,
    };
  }
}
