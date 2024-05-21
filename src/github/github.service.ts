import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor(githubAccessToken: string) {
    this.octokit = this.createOctokitInstance(githubAccessToken);
  }

  private createOctokitInstance(githubAccessToken: string): Octokit {
    return new Octokit({
      auth: githubAccessToken,
      request: {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    });
  }

  async getGithubProfile() {
    return await this.octokit.request('GET /user');
  }
}
