import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InputCreateUserDto } from './dto/create-user.dto';
import { ServiceResultDto } from 'src/common/common.dto';
import { InputFindUserDto } from './dto/find-user.dto';
import { InputGithubAccessTokenUpdateDto } from './dto/update-user.dto';
import { Octokit } from 'octokit';
import { REQUEST_INFO } from 'src/common/request-url';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(
    input: InputCreateUserDto,
  ): Promise<ServiceResultDto<UserEntity>> {
    const {
      email,
      githubId,
      password,
      avatarUrl,
      isGithub,
      githubAccessToken,
    } = input;

    const newUser = this.userRepository.create({
      email,
      githubId,
      password,
      avatarUrl,
      isGithub,
      githubAccessToken,
    });

    const savedUser = await this.userRepository.save(newUser);

    Logger.log(`유저: ${email} 회원가입 완료`);

    return { item: savedUser };
  }

  async findOne(
    input: InputFindUserDto,
  ): Promise<ServiceResultDto<UserEntity>> {
    const { id } = input;
    const user = await this.userRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`id: ${id} 유저를 찾을 수 없습니다.`);
    }

    return { item: user };
  }

  async getGithubAccessToken(
    input: InputFindUserDto,
  ): Promise<ServiceResultDto<string>> {
    const { id } = input;
    const { item: user } = await this.findOne({ id });

    return { item: user?.githubAccessToken };
  }

  /**
   * @deprecated
   */
  async findUser(input): Promise<ServiceResultDto<UserEntity>> {
    const { email } = input;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return { item: user };
  }

  async updateGithubAccessToken(
    input: InputGithubAccessTokenUpdateDto,
  ): Promise<ServiceResultDto<UpdateResult>> {
    const { email, githubAccessToken } = input;

    const user = await this.userRepository.update(
      { email },
      { githubAccessToken },
    );

    return { item: user };
  }

  async getGithubProfile(githubAccessToken) {
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    const { data: result } = await octokit.request('GET /user', {
      headers: {
        'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
      },
    });

    return result;
  }

  async getGithubEmail(githubAccessToken) {
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    const { data } = await octokit.request('GET /user/emails', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    const result = data
      .filter((item) => item.primary)
      .map((item) => item.email)[0];

    return result;
  }
}

// async findAll(): Promise<UserEntity[]> {
//   return this.userRepository.find();
// }

// async remove(id: number): Promise<number> {
//   await this.userRepository.delete(id);
//   return id;
// }
