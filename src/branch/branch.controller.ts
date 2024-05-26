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
import { BranchService } from './branch.service';
import { CreateBranchDto, ResCreateBranchDto } from './dto/create-branch.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResFindBranchDto } from './dto/find-branch.dto';
import { ResSyncBranchDto } from './dto/sync-branch.dto';

@UseGuards(JwtAuthGuard)
@Controller('branch')
@ApiBearerAuth('accessToken')
@ApiTags('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '브랜치 생성',
    description: '새로운 브랜치를 생성합니다.',
  })
  @ApiCreatedResponse({
    type: ResCreateBranchDto,
    status: HttpStatus.CREATED,
    description: '브랜치를 성공적으로 생성하였습니다.',
  })
  async createBranch(
    @Request() req,
    @Body() body: CreateBranchDto,
  ): Promise<ResCreateBranchDto> {
    const branch = await this.branchService.createBranch({
      ...body,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: '브랜치를 생성했습니다.',
      item: {
        id: branch.id,
        userId: branch.userId,
        createdAt: branch.createdAt,
        updatedAt: branch.updatedAt,
        branchName: branch.branchName,
      },
    };
  }

  @Get(':repoId/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @ApiParam({
    name: 'repoId',
    type: 'number',
    required: true,
  })
  @ApiOperation({
    summary: '브랜치 조회',
    description: '브랜치를 조회합니다.',
  })
  @ApiOkResponse({
    type: ResFindBranchDto,
    status: HttpStatus.OK,
  })
  async findUserRepo(
    @Request() req,
    @Param() param,
  ): Promise<ResFindBranchDto> {
    const branch = await this.branchService.findBranch({
      ...param,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.OK,
      message: '브랜치를 조회했습니다..',
      item: {
        id: branch.id,
        userId: branch.userId,
        createdAt: branch.createdAt,
        updatedAt: branch.updatedAt,
        branchName: branch.branchName,
      },
    };
  }

  @Post(':repoId/sync')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '브랜치 동기화',
    description: '깃허브 브랜치를 동기화합니다.',
  })
  @ApiCreatedResponse({
    type: ResSyncBranchDto,
    status: HttpStatus.CREATED,
    description: '브랜치를 성공적으로 동기화 하였습니다.',
  })
  async syncRepoBranches(
    @Request() req,
    @Param() param,
  ): Promise<ResSyncBranchDto> {
    const { syncBranchNames, syncCount } =
      await this.branchService.syncRepoBranches({
        userId: req.user.id,
        repoId: param.repoId,
      });

    return {
      statusCode: HttpStatus.CREATED,
      message: `${syncCount}개 브랜치가 동기화됐습니다.`,
      items: syncBranchNames,
    };
  }
}
