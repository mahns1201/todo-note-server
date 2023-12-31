import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GithubService } from './github.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { User } from 'src/decorator/user.decorator';
import { jwtUserT } from 'src/constant/jwt.constant';

@Controller('github')
@UseGuards(AuthGuard)
@ApiTags('GITHUB')
@ApiBearerAuth('accessToken')
export class GithubController {
  constructor(
    private githubService: GithubService,
    private userService: UserService,
  ) {}

  // ********** Repositories **********
  @Get('repos')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저의 깃허브 레포지토리 리스트를 조회한다.' })
  async findGithubRepos(@User() user: jwtUserT) {
    const { id, username } = user;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = { githubAccessToken, username };
    const { items: githubRepositories } = await this.githubService.findRepos(
      input,
    );
    return {
      httpStatus: HttpStatus.OK,
      message: '유저의 깃허브 리포지토리 리스트를 성공적으로 조회했습니다',
      items: githubRepositories,
    };
  }

  @Get('repos/:repoName')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'repoName',
    type: String,
    description: 'repoName',
  })
  @ApiOperation({ summary: '유저의 깃허브 레포지토리 리스트를 조회한다.' })
  async findOneRepo(@User() user: jwtUserT, @Param() param) {
    const { id, username } = user;
    const { repoName } = param;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = { githubAccessToken, username, repoName };
    const { item: githubRepository } = await this.githubService.findOneRepo(
      input,
    );
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 깃허브 ${repoName} 리포지토리를 성공적으로 조회했습니다`,
      item: githubRepository,
    };
  }

  @Post('repos')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저의 깃허브 레포지토리를 생성한다.' })
  async createRepo(@User() user: jwtUserT, @Body() body) {
    const { id, username } = user;
    const { repoName, description, ...otherFields } = body;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = {
      githubAccessToken,
      username,
      repoName,
      description,
      ...otherFields,
    };
    const { item: createdRepo } = await this.githubService.createRepo(input);
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} 레포지토리를 성공적으로 생성했습니다`,
      items: createdRepo,
    };
  }

  @Patch('repos/:repoName')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'repoName',
    type: String,
    description: '수정할 repo의 Name',
  })
  @ApiOperation({ summary: '유저의 깃허브 레포지토리를 수정한다.' })
  async updateRepo(@User() user: jwtUserT, @Param() param, @Body() body) {
    const { id, username } = user;
    const { repoName } = param;
    const { updateRepoName, updateDescription, ...otherFields } = body;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = {
      githubAccessToken,
      username,
      repoName,
      updateRepoName,
      updateDescription,
      ...otherFields,
    };
    const { item: updateRepo } = await this.githubService.updateRepo(input);
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${updateRepoName} 레포지토리를 성공적으로 수정했습니다`,
      item: updateRepo,
    };
  }

  // ********** Milestones **********

  @Get('milestones/:repoName')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'repoName',
    type: String,
    description: 'repoName',
  })
  @ApiOperation({
    summary: '유저의 깃허브 특정 리포지토리의 마일스톤 리스트를 조회한다.',
  })
  async findAllMilestones(@User() user: jwtUserT, @Param() param) {
    const { id, username } = user;
    const { repoName } = param;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });

    const input = { githubAccessToken, username, repoName };

    const { items: githubMilestones } = await this.githubService.findMilestones(
      input,
    );

    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} 리포지토리의 Milestone 리스트를 성공적으로 조회했습니다`,
      items: githubMilestones,
    };
  }

  @Get('milestones/:repoName/:number')
  @ApiParam({
    name: 'repoName',
    type: String,
    description: 'repoName',
  })
  @ApiParam({
    name: 'number',
    type: String,
    description: 'milestoneNumber',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저의 깃허브 특정 리포의 특정 마일스톤을 조회한다.',
  })
  async findOneMilestone(@User() user: jwtUserT, @Param() param) {
    const { id, username } = user;
    const { repoName, number } = param;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });

    const input = {
      githubAccessToken,
      username,
      repoName,
      number,
    };
    const { item: githubMilestone } = await this.githubService.findOneMilestone(
      input,
    );
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} Repo의 ${number}번 Milestone을 성공적으로 조회했습니다`,
      item: githubMilestone,
    };
  }

  @Post('milestones/:repoName')
  @ApiParam({
    name: 'repoName',
    description: 'repoName',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저의 깃허브 레포지토리에 마일스톤을 생성한다.' })
  async createMilestone(@User() user: jwtUserT, @Param() param, @Body() body) {
    const { id, username } = user;
    const { repoName } = param;
    const { title, description, ...otherFields } = body;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = {
      githubAccessToken,
      username,
      repoName,
      title,
      description,
      ...otherFields,
    };
    const { item: createdMilestone } = await this.githubService.createMilestone(
      input,
    );
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} 레포지토리에 ${title} 마일스톤을 성공적으로 생성했습니다`,
      item: createdMilestone,
    };
  }

  @Patch('milestones/:repoName/:number')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'repoName',
    type: String,
    description: '수정할 마일스톤의 레포지토리 이름',
  })
  @ApiParam({
    name: 'number',
    type: String,
    description: '수정할 마일스톤의 번호',
  })
  @ApiOperation({
    summary: '유저의 깃허브 특정 레포지토리의 마일스톤을 수정한다.',
  })
  async updateMilestone(@User() user: jwtUserT, @Param() param, @Body() body) {
    const { id, username } = user;
    const { repoName, number } = param;
    const { updateTitle, updateDescription, ...otherFields } = body;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = {
      githubAccessToken,
      username,
      repoName,
      updateTitle,
      updateDescription,
      number,
      ...otherFields,
    };
    const { item: updatedMilestone } = await this.githubService.updateMilestone(
      input,
    );
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} 레포지토리의 ${updateTitle} 마일스톤을 성공적으로 수정했습니다`,
      item: updatedMilestone,
    };
  }

  // ********** Issues **********

  @Get('issues/:repoName')
  @ApiParam({
    name: 'repoName',
    type: String,
    description: 'repoName',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저의 깃허브 특정 리포지토리의 이슈 리스트를 조회한다.',
  })
  async findAllIssues(@User() user: jwtUserT, @Param() param) {
    const { repoName } = param;
    const { id, username } = user;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });

    const item = { githubAccessToken, username, repoName };
    const { items: githubIssues } = await this.githubService.findIssues(item);
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} 리포지토리의 Issues 리스트를 성공적으로 조회했습니다`,
      items: githubIssues,
    };
  }

  @Get('issues/:repoName/:number')
  @ApiParam({
    name: 'repoName',
    type: String,
    description: 'repoName',
  })
  @ApiParam({
    name: 'number',
    type: String,
    description: 'issueNumber',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저의 깃허브 특정 리포지토리의 특정 이슈를 조회한다.',
  })
  async findOneIssue(@User() user: jwtUserT, @Param() param) {
    const { id, username } = user;
    const { repoName, number } = param;

    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });

    const input = {
      githubAccessToken,
      username,
      repoName,
      number,
    };
    const { item: githubIssue } = await this.githubService.findOneIssue(input);
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} 리포지토리의 Issues 리스트를 성공적으로 조회했습니다`,
      item: githubIssue,
    };
  }

  @Post('issues/:repoName')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'repoName',
    type: String,
    description: 'repoName',
  })
  @ApiOperation({ summary: '유저의 깃허브 레포지토리에 이슈를 생성한다.' })
  async createIssue(@User() user: jwtUserT, @Param() param, @Body() body) {
    const { id, username } = user;
    const { repoName } = param;
    const { title, description, ...otherFields } = body;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = {
      githubAccessToken,
      username,
      repoName,
      title,
      description,
      ...otherFields,
    };
    const { item: createdIssue } = await this.githubService.createIssue(input);
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} 레포지토리에 ${repoName} 이슈를 성공적으로 생성했습니다`,
      items: createdIssue,
    };
  }

  @Patch('issues/:repoName/:number')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'repoName',
    type: String,
    description: '수정할 이슈의 레포지토리 이름',
  })
  @ApiParam({
    name: 'number',
    type: String,
    description: '수정할 이슈의 번호',
  })
  @ApiOperation({
    summary: '유저의 깃허브 특정 레포지토리의 마일스톤을 수정한다.',
  })
  async updateIssues(@User() user: jwtUserT, @Param() param, @Body() body) {
    const { id, username } = user;
    const { repoName, number } = param;
    const { updateTitle, updateDescription, ...otherFields } = body;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({
        id,
      });
    const input = {
      githubAccessToken,
      username,
      repoName,
      updateTitle,
      updateDescription,
      number,
      ...otherFields,
    };
    const { item: updatedIssue } = await this.githubService.updateIssue(input);
    return {
      httpStatus: HttpStatus.OK,
      message: `유저의 ${repoName} 레포지토리의 ${updateTitle} 이슈를 성공적으로 수정했습니다`,
      item: updatedIssue,
    };
  }
}
