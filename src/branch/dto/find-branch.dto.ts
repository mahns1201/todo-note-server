import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindBranchByIdDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  repoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
