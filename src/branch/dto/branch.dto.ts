import { IsString, IsNumber } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseDto } from 'src/common/common.dto';

export class BranchDto extends BaseDto {
  @ApiProperty()
  @IsNumber()
  repoId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  branchName: string;
}

export class ResBranchDto extends PickType(BranchDto, [
  'id',
  'userId',
  'createdAt',
  'updatedAt',
  'branchName',
] as const) {}
