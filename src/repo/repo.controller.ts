import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RepoService } from './repo.service';
import { CreateRepoDto, ResCreateRepoDto } from './dto/create-repo.dto';
import { PagingReqDto } from 'src/common/common.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResFindRepoDto } from './dto/find-repo.dto';
import { ResFindReposDto } from './dto/find-repos.dto';
import { ResSyncRepoDto } from './dto/sync-repo.dto';
import { ResRepoDto } from './dto/repo.dto';

@UseGuards(JwtAuthGuard)
@Controller('repo')
@ApiBearerAuth('accessToken')
@ApiTags('repo')
export class RepoController {
  constructor(private repoService: RepoService) {}

  serialize(repo) {
    return {
      id: repo.id,
      createdAt: repo.createdAt,
      updatedAt: repo.updatedAt,
      userId: repo.userId,
      repoName: repo.repoName,
      defaultBranch: repo.defaultBranch,
      htmlUrl: repo.htmlUrl,
      isPrivate: repo.isPrivate,
      isFork: repo.isFork,
      imageUrl: repo.imageUrl,
      description: repo.description,
      language: repo.language,
      ownerAvatarUrl: repo.ownerAvatarUrl,
      synchronizedAt: repo.synchronizedAt,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '레포지토리 생성',
    description: '새로운 레포지토리를 생성합니다.',
  })
  @ApiCreatedResponse({
    type: ResRepoDto,
    status: HttpStatus.CREATED,
    description: '레포지토리를 성공적으로 생성하였습니다.',
  })
  async createRepo(
    @Request() req,
    @Body() body: CreateRepoDto,
  ): Promise<ResCreateRepoDto> {
    const repo = await this.repoService.createRepo({
      ...body,
      userId: req.user.id,
    });

    return {
      message: '레포지토리를 생성했습니다.',
      statusCode: HttpStatus.CREATED,
      item: this.serialize(repo),
    };
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '레포지토리 리스트 조회',
    description: '레포지토리 리스트를 조회합니다.',
  })
  @ApiOkResponse({
    type: [ResRepoDto],
    status: HttpStatus.OK,
  })
  async findUserRepos(
    @Request() req,
    @Query() query: PagingReqDto,
  ): Promise<ResFindReposDto> {
    const [repos, totalCount] = await this.repoService.findRepos({
      userId: req.user.id,
      page: query.page,
      pageSize: query.pageSize,
      orderBy: query.orderBy,
      sortBy: query.sortBy,
    });

    return {
      statusCode: HttpStatus.OK,
      message: `총 ${totalCount}개중 ${repos.length}개의 레포지토리 리스트를 조회했습니다.`,
      items: repos.map((repo) => this.serialize(repo)),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @ApiOperation({
    summary: '레포지토리 조회',
    description: '레포지토리를 조회합니다.',
  })
  @ApiOkResponse({
    type: ResRepoDto,
    status: HttpStatus.OK,
  })
  async findUserRepo(@Request() req, @Param() param): Promise<ResFindRepoDto> {
    const repo = await this.repoService.findRepo({
      id: param.id,
      userId: req.user.id,
    });

    return {
      statusCode: HttpStatus.OK,
      message: '레포지토리를 조회했습니다.',
      item: this.serialize(repo),
    };
  }

  // @Get('list')
  // @HttpCode(HttpStatus.OK)
  // async findUserRepos(
  //   @User() user: jwtUserT,
  //   @Query() query: PagingRequestDto,
  // ) {
  //   const { page, limit } = query;
  //   const { items, totalCount } = await this.repoService.find({
  //     id: user.id,
  //     page,
  //     limit,
  //   });

  //   return {
  //     httpStatus: HttpStatus.OK,
  //     message: `${page}p 레포지토리 리스트를 성공적으로 조회했습니다.`,
  //     currentPage: page,
  //     limit,
  //     totalCount,
  //     items,
  //   };
  // }

  @Post('sync')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '레포지토리 동기화',
    description: '깃허브 레포지토리를 동기화합니다.',
  })
  @ApiCreatedResponse({
    type: ResSyncRepoDto,
    status: HttpStatus.CREATED,
    description: '레포지토리를 성공적으로 동기화 하였습니다.',
  })
  async syncUserRepos(@Request() req): Promise<ResSyncRepoDto> {
    const { syncRepoNames, syncCount } = await this.repoService.syncUserRepos({
      userId: req.user.id,
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: `${syncCount}개 레포지토리가 동기화됐습니다.`,
      items: syncRepoNames,
    };
  }
}
