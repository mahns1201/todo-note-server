import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResRepoDto } from './repo.dto';

export class FindRepoByIdDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class ResFindRepoDto extends ResDto {
  @ApiProperty({ description: '조회된 레포지토리' })
  item: ResRepoDto;
}
