import { ResDto } from 'src/common/dto/res.dto';
import { ResUserTokenDto } from 'src/user/dto/user.dto';
export declare class GetGithubTokenByCodeDto {
    code: string;
}
export declare class ResGetGithubTokenDto extends ResDto {
    item: ResUserTokenDto;
}
