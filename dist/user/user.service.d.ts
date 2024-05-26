import { CreateUserDto } from './dto/create-user.dto';
import { UserDao } from './user.dao';
import { FindUserByEmailDto, FindUserByIdDto } from './dto/find-user.dto';
export declare class UserService {
    private readonly userDao;
    constructor(userDao: UserDao);
    createUser(createUserDto: CreateUserDto): Promise<import("./user.entity").UserEntity>;
    findUser(dto: FindUserByIdDto): Promise<import("./user.entity").UserEntity>;
    findUserByEmail(dto: FindUserByEmailDto): Promise<import("./user.entity").UserEntity>;
    findUserGithubToken(dto: FindUserByIdDto): Promise<string>;
    updateUser(findDto: FindUserByIdDto, updateDto: Partial<CreateUserDto>): Promise<import("./user.entity").UserEntity>;
}
