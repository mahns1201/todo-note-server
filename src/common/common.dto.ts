import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsDate()
  deletedAt: Date;

  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;
}

export class ResDto<T> {
  @ApiProperty({ description: 'http 상태 코드' })
  httpStatus: HttpStatus;

  @ApiProperty({ description: 'api 응답 메시지' })
  message: string;

  @ApiProperty({ description: 'api 응답 결과가 복수개 일 때의 결과' })
  items?: T[];

  @ApiProperty({ description: 'api 응답 결과가 단수개 일 때의 결과' })
  item?: T;
}
