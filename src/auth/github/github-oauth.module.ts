import { Module } from '@nestjs/common';

import { GithubOauthController } from './github-oauth.controller';
import { GithubOauthStrategy } from './github-oauth.strategy';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { AuthService } from '../jwt/auth.service';
import { GithubOauthService } from './github-oauth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [GithubOauthController],
  providers: [
    GithubOauthStrategy,
    UserService,
    AuthService,
    GithubOauthService,
  ],
})
export class GithubOauthModule {}
