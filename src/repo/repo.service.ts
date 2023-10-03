import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { REQUEST_INFO } from 'src/common/request-url';
import { Repository } from 'typeorm';
import { RepoEntity } from './entity/repo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(RepoEntity)
    private repoRepository: Repository<RepoEntity>,

    private httpService: HttpService,
  ) {}

  async findUserRepos(userId) {
    const userRepos = await this.repoRepository.findAndCount({
      where: {
        user: userId,
      },
    });

    return { items: userRepos };
  }

  async getReposFromGithub(authorization) {
    const requestHeaders = {
      'Content-Type': REQUEST_INFO.GITHUB.CONTENT_TYPE,
      'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
      Authorization: authorization,
    };

    try {
      const observable = this.httpService
        .get(`${REQUEST_INFO.GITHUB.PREFIX}/user/repos`, {
          headers: requestHeaders,
        })
        .pipe(map((res) => res.data));

      const items = await lastValueFrom(observable);

      return { items };
    } catch (error) {
      Logger.error(`[RepoService][getRepos] message: ${error.message}`);
      return { items: null };
    }
  }

  async getRepoFromGithub(authorization, owner, repo, branch) {
    const requestHeaders = {
      'Content-Type': REQUEST_INFO.GITHUB.CONTENT_TYPE,
      'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
      Authorization: authorization,
    };

    try {
      let requestUrl = `${REQUEST_INFO.GITHUB.PREFIX}/repos/${owner}/${repo}`;
      branch ? (requestUrl += '/branches') : requestUrl;

      const observable = this.httpService
        .get(requestUrl, {
          headers: requestHeaders,
        })
        .pipe(map((res) => res.data));

      const item = await lastValueFrom(observable);

      return { item };
    } catch (error) {
      Logger.error(`[RepoService][getRepo] message: ${error.message}`);
      return { item: null };
    }
  }

  // TODO updateRepo
  // TODO updateRepoBranch
}
