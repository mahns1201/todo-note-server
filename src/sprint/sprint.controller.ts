import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
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
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { UserService } from 'src/user/user.service';
import { SprintService } from './sprint.service';
import {
  InputCreateSprintDto,
  OutputCreateSprintDto,
} from './dto/create-sprint.dto';
import { jwtUserT } from 'src/constant/jwt.constant';
import { User } from 'src/decorator/user.decorator';
import { RepoService } from 'src/repo/repo.service';
import { ErrorResponseDto, PagingRequestDto } from 'src/common/common.dto';
import { SprintDto } from './dto/sprint.dto';
import { OutputFindSprintsDto } from './dto/find-sprint.dto';

@Controller('sprint')
@UseGuards(AuthGuard)
@ApiTags('sprint')
@ApiBearerAuth('accessToken')
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
export class SprintController {
  constructor(
    private sprintService: SprintService,
    private userService: UserService,
    private repoService: RepoService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '스프린트를 생성한다.' })
  @ApiCreatedResponse({
    type: OutputCreateSprintDto,
    status: HttpStatus.CREATED,
  })
  async create(
    @User() user: jwtUserT,
    @Body() input: InputCreateSprintDto,
  ): Promise<OutputCreateSprintDto> {
    const { id: userId } = user;
    const { repo: repoId } = input;
    input['user'] = userId;

    const { item: repo } = await this.repoService.findOne({ id: repoId });
    const { item: createdSprint } = await this.sprintService.create(
      input,
      repo,
    );

    return {
      httpStatus: HttpStatus.CREATED,
      message: '스프린트가 성공적으로 생성되었습니다.',
      item: createdSprint,
    };
  }

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '유저의 레포지토리 리스트를 조회한다.' })
  @ApiOkResponse({
    type: OutputFindSprintsDto,
    status: HttpStatus.OK,
  })
  async find(
    @User() user: jwtUserT,
    @Query() query: PagingRequestDto,
  ): Promise<OutputFindSprintsDto> {
    const { page, limit } = query;
    const { items, totalCount } = await this.sprintService.find({
      id: user.id,
      page,
      limit,
    });

    return {
      httpStatus: HttpStatus.OK,
      message: `${page}p 스프린트 리스트를 성공적으로 조회했습니다.`,
      currentPage: page,
      limit,
      totalCount,
      items,
    };
  }
}
