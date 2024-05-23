import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = this.createOctokitInstance();
  }

  private createOctokitInstance() {
    return new Octokit({
      request: {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    });
  }

  // private async getOctokitInstance() {
  //   if (!this.octokit) {
  //     this.octokit = await this.createOctokitInstance();
  //   }
  //   return this.octokit;
  // }

  async getProfile(token: string) {
    // const octokit = await this.getOctokitInstance();
    const { data } = await this.octokit.request('GET /user', {
      headers: { authorization: `token ${token}` },
    });
    return data;
  }
}
