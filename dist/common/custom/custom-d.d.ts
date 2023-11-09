import { UserEntity } from 'src/user/entity/user.entity';
declare module 'express' {
    interface Request {
        user: {
            user: UserEntity;
            accessToken: string;
        };
    }
}
