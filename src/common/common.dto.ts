import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class SwaggerResponseDto<T> {
  @ApiProperty()
  httpStatus: HttpStatus;

  @ApiProperty()
  message: string;

  @ApiProperty()
  items?: T[];

  @ApiProperty()
  item?: T;
}

export interface ServiceResultDto<T> {
  items?: T;
  item?: T;
}
