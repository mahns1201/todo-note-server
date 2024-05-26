import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResDto {
  item?: any;

  items?: any[];

  @ApiProperty({ description: 'http 상태 코드' })
  statusCode: HttpStatus;

  @ApiProperty({ description: 'api 응답 메시지' })
  message: string;
}
