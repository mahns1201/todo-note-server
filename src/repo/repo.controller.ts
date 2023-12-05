import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RepoService } from './repo.service';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { User } from 'src/decorator/user.decorator';
import { jwtUserT } from 'src/constant/jwt.constant';
import { OutputFindReposDto } from './dto/find-repo.dto';
import {
  BaseResponseDto,
  ErrorResponseDto,
  PagingRequestDto,
} from 'src/common/common.dto';
import { Response } from 'express';

@Controller('repo')
@UseGuards(AuthGuard)
@ApiTags('repository')
@ApiBearerAuth('accessToken')
export class RepoController {
  constructor(
    private repoService: RepoService,
    private userService: UserService,
  ) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저의 레포지토리 리스트를 조회한다.' })
  @ApiOkResponse({
    type: OutputFindReposDto,
    status: HttpStatus.OK,
  })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponseDto,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    status: HttpStatus.NOT_FOUND,
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async findUserRepos(
    @User() user: jwtUserT,
    @Query() query: PagingRequestDto,
  ) {
    const { page, limit } = query;
    const { items, totalCount } = await this.repoService.find({
      id: user.id,
      page,
      limit,
    });

    return {
      httpStatus: HttpStatus.OK,
      message: `${page}p 레포지토리 리스트를 성공적으로 조회했습니다.`,
      currentPage: page,
      limit,
      totalCount,
      items,
    };
  }

  @Post('github/sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저의 레포지토리/브랜치를 깃허브와 동기화 한다.' })
  @ApiOkResponse({
    type: BaseResponseDto,
    status: HttpStatus.OK,
  })
  @ApiCreatedResponse({
    type: BaseResponseDto,
    status: HttpStatus.OK,
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponseDto,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiInternalServerErrorResponse({
    type: ErrorResponseDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async syncRepoByGithub(@User() user: jwtUserT, @Res() res: Response) {
    let message = '모두 동기화 완료 상태입니다.';
    let httpStatus = HttpStatus.OK;

    const { id: userId, username } = user;
    const { item: githubAccessToken } =
      await this.userService.getGithubAccessToken({ id: userId });

    const githubRepositories = await this.repoService.getRepoListFromGithub(
      githubAccessToken,
      username,
    );

    const { items: userRepos } = await this.repoService.findAll({
      id: userId,
    });

    const {
      item: { syncRepoNames, syncCount: syncRepoCount },
    } = await this.repoService.syncUserRepos(
      userId,
      githubRepositories,
      userRepos,
    );

    if (syncRepoCount) {
      message = `${syncRepoCount}개 레포지토리 동기화: [${syncRepoNames}]`;
      httpStatus = HttpStatus.CREATED;
    }

    for (const repoName of syncRepoNames) {
      const githubRepoBranches =
        await this.repoService.getRepoBranchesFromGithub(
          githubAccessToken,
          username,
          repoName,
        );

      const {
        item: { id: repoId },
      } = await this.repoService.findRepoByUserIdAndRepoName(userId, repoName);

      const repoBranches = await this.repoService.findRepoBranchesByRepoId(
        repoId,
      );

      const {
        item: { syncBranchNames },
      } = await this.repoService.syncRepoBranches(
        repoId,
        githubRepoBranches,
        repoBranches,
      );

      if (syncBranchNames.length) {
        message += `\n레포지토리 ${repoName}의 ${syncBranchNames.length}개 브랜치 동기화: [${syncBranchNames}]`;
      }
    }

    res.status(httpStatus).json({ message, httpStatus });
  }

  // @Post('github/sync/branch')
  // async syncRepoBranch(@Request() request, @Body() body) {
  //   const { id: userId, username: owner } = request.user;
  //   const { repoName } = body;

  // const {
  //   item: { githubAccessToken },
  // } = await this.userService.findOne(userId);

  // const githubRepoBranches = await this.repoService.getRepoBranchesFromGithub(
  //   githubAccessToken,
  //   owner,
  //   repoName,
  // );

  // const { id: repoId } = await this.repoService.findRepoByUserIdAndRepoName(
  //   userId,
  //   repoName,
  // );

  // const repoBranches = await this.repoService.findRepoBranchesByRepoId(
  //   repoId,
  // );

  // const {
  //   item: { syncCount },
  // } = await this.repoService.syncRepoBranches(
  //   repoId,
  //   githubRepoBranches,
  //   repoBranches,
  // );

  //   const message = syncCount
  //     ? `레포지토리 ${repoName}의 브랜치 ${syncCount}개가 성공적으로 동기화 되었습니다.`
  //     : `레포지토리 ${repoName}의 브랜치 동기화 상태가 최신입니다.`;
  //   const httpStatus = syncCount ? HttpStatus.CREATED : HttpStatus.OK;

  //   return { message, httpStatus };
  // }

  // @Post('github/sync')
  // async syncRepos(@Request() request) {
  //   const { id: userId, username, email } = request.user;
  //   const { item: user } = await this.userService.findOne(userId);
  //   const { githubAccessToken } = user;
  //   if (!githubAccessToken) {
  //     Logger.error(`유저 [${email}]의 github accessToken이 없습니다.`);
  //     throw new UnauthorizedException();
  //   }

  //   const githubRepositories = await this.repoService.getRepoListFromGithub(
  //     githubAccessToken,
  //     username,
  //   );

  //   const [userRepos] = await this.repoService.findReposByUserId(user); // 삭제됨

  //   const {
  //     item: { syncCount },
  //   } = await this.repoService.syncUserRepos(
  //     userId,
  //     githubRepositories,
  //     userRepos,
  //   );
  //   const message = syncCount
  //     ? `레포지토리 ${syncCount}개가 성공적으로 동기화 되었습니다.`
  //     : '레포지토리 동기화 상태가 최신입니다.';
  //   const httpStatus = syncCount ? HttpStatus.CREATED : HttpStatus.OK;

  //   return { message, httpStatus };
  // }
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
