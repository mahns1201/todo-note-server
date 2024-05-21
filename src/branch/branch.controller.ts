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
import { CreateBranchDto } from './dto/create-branch-dto';

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
}
