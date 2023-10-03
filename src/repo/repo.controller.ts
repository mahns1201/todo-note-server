import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RepoService } from './repo.service';
import { UserService } from 'src/user/user.service';
import { InputFindUserReposDto } from './dto/find-user-repo.dto';

@Controller('repo')
@ApiTags('repository')
export class RepoController {
  constructor(
    private repoService: RepoService,
    private userService: UserService,
  ) {}

  @Get('/:email')
  @HttpCode(HttpStatus.OK)
  async findUserRepos(@Param() input: InputFindUserReposDto) {
    const {
      item: { id: userId },
    } = await this.userService.findUser(input);

    const { items } = await this.repoService.findUserRepos(userId);

    const httpStatus = !items ? HttpStatus.NOT_FOUND : HttpStatus.OK;
    const message = !items
      ? '유저의 레포지토리를 해당 이름으로 찾을 수 없습니다.'
      : '유저의 레포지토리를 성공적으로 가지고 왔습니다.';

    return {
      items,
      message,
      httpStatus,
    };
  }

  @Get('github/list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저 레포지토리 리스트 조회',
    description: '유저의 레포지토리 리스트를 조회합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 레포지토리 리스트 조회에 성공했습니다.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: '유저 레포지토리 리스트 조회에 실패했습니다.',
  })
  async getReposFromGithub(@Headers() headers) {
    const { authorization } = headers;

    const { items } = await this.repoService.getReposFromGithub(authorization);
    const httpStatus = !items
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : HttpStatus.OK;
    const message = !items
      ? '유저의 레포지토리 리스트를 알 수 없는 이유로 찾을 수 없습니다.'
      : '유저의 레포지토리 리스트를 성공적으로 가지고 왔습니다.';

    return {
      items,
      message,
      httpStatus,
    };
  }

  @Get('github')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저 레포지토리 조회',
    description: '유저의 레포지토리를 조회합니다.',
  })
  @ApiQuery({
    name: 'owner',
    type: String,
  })
  @ApiQuery({
    name: 'repo',
    type: String,
  })
  @ApiQuery({
    name: 'branch',
    type: Boolean,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 레포지토리 조회에 성공했습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '유저 레포지토리 조회에 실패했습니다.',
  })
  async getRepoFromGithub(@Headers() headers, @Query() input) {
    const { authorization } = headers;
    const { owner, repo, branch } = input;

    const { item } = await this.repoService.getRepoFromGithub(
      authorization,
      owner,
      repo,
      branch,
    );
    const httpStatus = !item ? HttpStatus.NOT_FOUND : HttpStatus.OK;
    const message = !item
      ? '유저의 레포지토리를 해당 이름으로 찾을 수 없습니다.'
      : '유저의 레포지토리를 성공적으로 가지고 왔습니다.';

    return {
      item,
      message,
      httpStatus,
    };
  }

  // TODO sync-repos 전체 repo 동기화
  @Post('github/sync')
  @HttpCode(HttpStatus.CREATED)
  async syncRepos(@Headers() headers, @Body() input) {
    // param: user-email
    // userService에서 user를 찾아서 branch list를 받고 전체를 동기화
    const { email } = input;
    const {
      item: { id: userId },
    } = await this.userService.findUser(email);

    const { authorization } = headers;
    const { items: userGithubRepos } =
      await this.repoService.getReposFromGithub(authorization);

    const { items: userRepoItems } = await this.repoService.findUserRepos(
      userId,
    );
    const [userRepos] = userRepoItems;

    const {
      item: { syncCount },
    } = await this.repoService.syncUserRepos(
      userId,
      userGithubRepos,
      userRepos,
    );

    const message = syncCount
      ? `레포지토리 ${syncCount}개가 성공적으로 동기화 되었습니다.`
      : '레포지토리 동기화 상태가 최신입니다.';
    const httpStatus = syncCount ? HttpStatus.CREATED : HttpStatus.OK;

    return { message, httpStatus };
  }

  // TODO sync-repo 단일 repo 동기화
  // TODO sync-branch param: repoName (단일 only)
  // TODO create-repo 레포지토리를 여기서 생성할 수도 있겠다. 생성 후 sync 맞추기 (웹 훅에서?)
}
