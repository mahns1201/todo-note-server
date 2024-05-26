import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResBranchDto } from './branch.dto';

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

export class ResFindBranchDto extends ResDto {
  @ApiProperty({ description: '조회된 브랜치' })
  item: ResBranchDto;
}
