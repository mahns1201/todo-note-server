import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RepoService } from './repo.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/jwt/auth.guard';

@Controller('repo')
@UseGuards(AuthGuard)
@ApiTags('repository')
export class RepoController {
  constructor(
    private repoService: RepoService,
    private userService: UserService,
  ) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'JWT',
    description: 'Bearer JWT 토큰을 해더에 담아서 요청',
  })
  @ApiOperation({
    summary: '유저 레파지토리 리스트 조회',
    description: 'DB에 저장되어 있는 유저 레파지토리 리스트를 조회한다.',
  })
  async findUserRepos(@Request() request) {
    const { id: userId } = request.user;
    const userRepos = await this.repoService.findReposByUserId(userId);

    const httpStatus = !userRepos ? HttpStatus.NOT_FOUND : HttpStatus.OK;
    const message = !userRepos
      ? '유저의 레포지토리를 찾을 수 없습니다.'
      : '유저의 레포지토리를 성공적으로 가지고 왔습니다.';

    return {
      message,
      httpStatus,
      items: userRepos,
    };
  }

  @Post('github/sync/branch')
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({
    name: 'JWT',
    description: 'Bearer JWT 토큰을 해더에 담아서 요청',
  })
  @ApiOperation({
    summary: '유저 레포지토리 브랜치 동기화',
    description:
      '유저의 깃허브에서 레포지토리 브랜치를 조회하여 DB를 동기화 합니다',
  })
  async syncRepoBranch(@Request() request, @Body() body) {
    const { id: userId, username: owner } = request.user;
    const { repoName } = body;

    const { githubAccessToken } = await this.userService.findOne(userId);

    const githubRepoBranches = await this.repoService.getRepoBranchesFromGithub(
      githubAccessToken,
      owner,
      repoName,
    );

    const { id: repoId } = await this.repoService.findRepoByUserIdAndRepoName(
      userId,
      repoName,
    );

    const repoBranches = await this.repoService.findRepoBranchesByRepoId(
      repoId,
    );

    const {
      item: { syncCount },
    } = await this.repoService.syncRepoBranches(
      repoId,
      githubRepoBranches,
      repoBranches,
    );

    const message = syncCount
      ? `레포지토리 ${repoName}의 브랜치 ${syncCount}개가 성공적으로 동기화 되었습니다.`
      : `레포지토리 ${repoName}의 브랜치 동기화 상태가 최신입니다.`;
    const httpStatus = syncCount ? HttpStatus.CREATED : HttpStatus.OK;

    return { message, httpStatus };
  }

  @Post('github/sync')
  @HttpCode(HttpStatus.CREATED)
  @ApiHeader({
    name: 'JWT',
    description: 'Bearer JWT 토큰을 해더에 담아서 요청',
  })
  @ApiOperation({
    summary: '유저 레포지토리 동기화',
    description: '유저의 깃허브에서 레포지토리를 조회하여 DB를 동기화 합니다',
  })
  async syncRepos(@Request() request) {
    const { id: userId, username, email } = request.user;
    const { githubAccessToken } = await this.userService.findOne(userId);

    if (!githubAccessToken) {
      Logger.error(`유저 [${email}]의 github accessToken이 없습니다.`);
      throw new UnauthorizedException();
    }

    const githubRepositories = await this.repoService.getRepoListFromGithub(
      githubAccessToken,
      username,
    );

    const [userRepos] = await this.repoService.findReposByUserId(userId);

    const {
      item: { syncCount },
    } = await this.repoService.syncUserRepos(
      userId,
      githubRepositories,
      userRepos,
    );
    const message = syncCount
      ? `레포지토리 ${syncCount}개가 성공적으로 동기화 되었습니다.`
      : '레포지토리 동기화 상태가 최신입니다.';
    const httpStatus = syncCount ? HttpStatus.CREATED : HttpStatus.OK;

    return { message, httpStatus };
  }
}

// TODO sync-repo 단일 repo 동기화가 필요한가?
// TODO create-repo 레포지토리를 여기서 생성할 수도 있겠다. 생성 후 sync 맞추기 (웹 훅에서?)

// TODO controller에 있을 필요가 있나? 고민해보자
// @Get('github')
// @HttpCode(HttpStatus.OK)
// @ApiOperation({
//   summary: '유저 레포지토리 조회',
//   description: '유저의 레포지토리를 조회합니다.',
// })
// @ApiQuery({
//   name: 'owner',
//   type: String,
// })
// @ApiQuery({
//   name: 'repo',
//   type: String,
// })
// @ApiQuery({
//   name: 'branch',
//   type: Boolean,
// })
// @ApiResponse({
//   status: HttpStatus.OK,
//   description: '유저 레포지토리 조회에 성공했습니다.',
// })
// @ApiResponse({
//   status: HttpStatus.NOT_FOUND,
//   description: '유저 레포지토리 조회에 실패했습니다.',
// })
// async getRepoFromGithub(@Headers() headers, @Query() input) {
//   const { authorization } = headers;
//   const { owner, repo, branch } = input;
//   const { item } = await this.repoService.getRepoFromGithub(
//     authorization,
//     owner,
//     repo,
//     branch,
//   );
//   const httpStatus = !item ? HttpStatus.NOT_FOUND : HttpStatus.OK;
//   const message = !item
//     ? '유저의 레포지토리를 해당 이름으로 찾을 수 없습니다.'
//     : '유저의 레포지토리를 성공적으로 가지고 왔습니다.';

//   return {
//     item,
//     message,
//     httpStatus,
//   };
// }

// @Get('github/list')
// @HttpCode(HttpStatus.OK)
// @ApiOperation({
//   summary: '유저 레포지토리 리스트 조회',
//   description: '유저의 레포지토리 리스트를 조회합니다.',
// })
// @ApiResponse({
//   status: HttpStatus.OK,
//   description: '유저 레포지토리 리스트 조회에 성공했습니다.',
// })
// @ApiResponse({
//   status: HttpStatus.INTERNAL_SERVER_ERROR,
//   description: '유저 레포지토리 리스트 조회에 실패했습니다.',
// })
// async getRepoListFromGithub(@Request() request) {
//   const { email, username } = request.user;
//   const {
//     item: { githubAccessToken },
//   } = await this.userService.findUser({ email });

//   const items = await this.repoService.getRepoListFromGithub(
//     githubAccessToken,
//     username,
//   );
//   const httpStatus = !items
//     ? HttpStatus.INTERNAL_SERVER_ERROR
//     : HttpStatus.OK;
//   const message = !items
//     ? '유저의 레포지토리 리스트를 알 수 없는 이유로 찾을 수 없습니다.'
//     : '유저의 레포지토리 리스트를 성공적으로 가지고 왔습니다.';

//   return {
//     items,
//     message,
//     httpStatus,
//   };
// }
