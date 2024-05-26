import { ApiProperty } from '@nestjs/swagger';
import { ResDto } from 'src/common/dto/res.dto';

export class ResGetGithubLoginUrlDto extends ResDto {
  @ApiProperty({ description: '로그인 유저' })
  item: string;
}
