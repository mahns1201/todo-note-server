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
  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  pageSize: number;

  @ApiProperty()
  @IsString()
  orderBy: string;

  @ApiProperty()
  @IsString()
  sortBy: string;
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
