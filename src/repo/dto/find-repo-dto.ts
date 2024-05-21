import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindRepoByIdDto {
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
