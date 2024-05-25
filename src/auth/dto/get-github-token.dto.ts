import { IsNotEmpty, IsString } from 'class-validator';

export class GetGithubTokenByCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
