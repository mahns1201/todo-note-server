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
import { CreateBranchDto } from './dto/create-branch.dto';

// TODO swagger
// TODO ResDto

@UseGuards(JwtAuthGuard)
@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Post()
  async createRepo(@Request() req, @Body() body: CreateBranchDto) {
    const result = await this.branchService.createBranch({
      ...body,
      userId: req.user.id,
    });
    return result;
  }

  @Get(':repoId/:id')
  @HttpCode(HttpStatus.OK)
  async findUserRepo(@Request() req, @Param() param) {
    const result = await this.branchService.findBranch({
      ...param,
      userId: req.user.id,
    });
    return result;
  }

  @Post(':repoId/sync')
  @HttpCode(HttpStatus.OK)
  async syncRepoBranches(@Request() req, @Param() param) {
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
