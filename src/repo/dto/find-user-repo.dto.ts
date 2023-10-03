import { SwaggerResponseDto } from 'src/common/common.dto';
import { RepoDto } from './repo.dto';
import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';

// export class InputFindUserReposDto extends PickType(RepoDto, [
//   'user',
// ] as const) {}
// export class InputFindUserReposDto {
//   email: string;
// }
export class InputFindUserReposDto extends PickType(UserDto, [
  'email',
] as const) {}
// export class OutputFindUserReposDto extends SwaggerResponseDto<UserDto> {}
