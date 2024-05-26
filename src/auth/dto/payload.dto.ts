import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';

class PayLoad {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}

export class ResPayloadDto extends ResDto {
  @ApiProperty({ description: '로그인 유저' })
  item: PayLoad;
}
