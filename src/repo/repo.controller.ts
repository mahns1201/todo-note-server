import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RepoService } from './repo.service';

@Controller('repo')
@ApiTags('repository')
export class RepoController {
  constructor(private repoService: RepoService) {}

  @Get('/list')
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
  async getRepos(@Headers() headers) {
    const { authorization } = headers;

    const { items } = await this.repoService.getRepos(authorization);
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '유저 레포지토리 조회',
    description: '유저의 레포지토리를 조회합니다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '유저 레포지토리 조회에 성공했습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '유저 레포지토리 조회에 실패했습니다.',
  })
  async getRepo(@Headers() headers, @Query() input) {
    const { authorization } = headers;
    const { owner, repo } = input;

    const { item } = await this.repoService.getRepo(authorization, owner, repo);
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

  // TODO sync-repo
  // TODO sync-branch param: repoName
  // TODO create-repo 레포지토리를 여기서 생성할 수도 있겠다. 생성 후 sync 맞추기 (웹 훅에서?)
}
