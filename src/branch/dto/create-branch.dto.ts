import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResBranchDto } from './branch.dto';

export class CreateBranchDto {
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  repoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  branchName: string;
}

export class ResCreateBranchDto extends ResDto {
  @ApiProperty({ description: '생성된 브랜치' })
  item: ResBranchDto;
}
