import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserDao {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(dto: CreateUserDto): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    update(id: number, dto: Partial<CreateUserDto>): Promise<UserEntity>;
}
