import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BaseTimeDto {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}

export class BaseResponseDto {
  @ApiProperty({ description: 'http 상태 코드' })
  httpStatus: HttpStatus;

  @ApiProperty({ description: 'api 응답 메시지' })
  message: string;
}

export class ErrorResponseDto extends BaseResponseDto {
  @ApiProperty({ description: 'error 메시지' })
  error: string;
}

export class PagingRequestDto {
  @ApiProperty({ description: 'requestPage' })
  @IsNumber()
  page: number;

  @ApiProperty({ description: 'limit' })
  @IsNumber()
  limit: number;
}

export class PagingResponseDto extends BaseResponseDto {
  @ApiProperty({ description: 'currentPage' })
  @IsNumber()
  currentPage: number;

  @ApiProperty({ description: 'limit' })
  @IsNumber()
  limit: number;

  @ApiProperty({ description: 'totalCount' })
  @IsNumber()
  totalCount: number;
}

export interface ServiceResultDto<T> {
  items?: T;
  item?: T;
}

export interface ServicePagingResultDto<T> {
  items?: T;
  totalCount: number;
}

/**
 * @deprecated
 */
export class SwaggerResponseDto<T> {
  @ApiProperty({ description: 'http 상태 코드' })
  httpStatus: HttpStatus;

  @ApiProperty({ description: 'api 응답 메시지' })
  message: string;

  @ApiProperty({ description: 'api 응답 결과가 복수개 일 때의 결과' })
  items?: T[];

  @ApiProperty({ description: 'api 응답 결과가 단수개 일 때의 결과' })
  item?: T;
}
