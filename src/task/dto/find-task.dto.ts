import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';
import { ResTaskDto } from './task.dto';

export class FindTaskByIdDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class ResFindTaskDto extends ResDto {
  @ApiProperty({ description: '조회된 레포지토리' })
  item: ResTaskDto;
}
