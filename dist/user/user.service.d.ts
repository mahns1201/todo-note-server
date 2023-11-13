import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InputCreateUserDto } from './dto/create-user.dto';
import { ServiceResultDto } from 'src/common/common.dto';
import { InputFindUserDto } from './dto/find-user.dto';
import { InputGithubAccessTokenUpdateDto } from './dto/update-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    createUser(input: InputCreateUserDto): Promise<ServiceResultDto<UserEntity>>;
    findUser(input: InputFindUserDto): Promise<ServiceResultDto<UserEntity>>;
    updateGithubAccessToken(input: InputGithubAccessTokenUpdateDto): Promise<ServiceResultDto<UpdateResult>>;
}
