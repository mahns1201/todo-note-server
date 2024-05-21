import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  repoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  branchName: string;
}
