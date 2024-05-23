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
import { RepoService } from './repo.service';
import { CreateRepoDto } from './dto/create-repo.dto';
import { ResDto } from 'src/common/common.dto';

// TODO swagger
// TODO ResDto 설정

@UseGuards(JwtAuthGuard)
@Controller('repo')
export class RepoController {
  constructor(private repoService: RepoService) {}
  @Post()
  async createRepo(@Request() req, @Body() body: CreateRepoDto) {
    const repo = await this.repoService.createRepo({
      ...body,
      userId: req.user.id,
    });

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findUserRepo(@Request() req, @Param() param) {
    const repo = await this.repoService.findRepo({
      id: param.id,
      userId: req.user.id,
    });

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
  async syncUserRepos(@Request() req): Promise<ResDto<string>> {
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
