import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

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

export class TokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  githubToken: string;
}

export class PagingReqDto {
  @ApiProperty({ default: 1, required: false })
  @IsNumber()
  page: number = 1;

  @ApiProperty({ default: 10, required: false })
  @IsNumber()
  pageSize: number = 10;

  @ApiProperty({ default: 'id', required: false })
  @IsString()
  orderBy: string = 'id';

  @ApiProperty({ default: 'desc', enum: ['asc', 'desc'], required: false })
  @IsString()
  sortBy: string = 'desc';
}

export class CommonResDto {
  @ApiProperty({ description: 'http 상태 코드' })
  statusCode: HttpStatus;

  @ApiProperty({ description: 'api 응답 메시지' })
  message: string;
}

export class ResDto<T> extends CommonResDto {
  @ApiProperty({ description: 'http 상태 코드' })
  statusCode: HttpStatus;

  @ApiProperty({ description: 'api 응답 메시지' })
  message: string;

  @ApiProperty({ description: 'api 응답 결과' })
  item: T;
}

export class ListResDto<T> extends CommonResDto {
  @ApiProperty({ description: 'http 상태 코드' })
  statusCode: HttpStatus;

  @ApiProperty({ description: 'api 응답 메시지' })
  message: string;

  @ApiProperty({ description: 'api 응답 결과' })
  items: T[];
}
