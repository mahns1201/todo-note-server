import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {
  private readonly octokit: Octokit;

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

  async getProfile(githubToken: string) {
    const { data } = await this.octokit.request('GET /user', {
      headers: { authorization: `token ${githubToken}` },
    });
    return data;
  }

  async getEmail(githubToken: string) {
    const { data } = await this.octokit.request('GET /user/emails', {
      headers: { authorization: `token ${githubToken}` },
    });

    return data.filter((item) => item.primary).map((item) => item.email)[0];
  }

  async getRepos(githubToken: string) {
    const { data } = await this.octokit.request('GET /user/repos', {
      headers: { authorization: `token ${githubToken}` },
    });
    return data;
  }

  async getBranches(githubToken: string, owner: string, repo: string) {
    const { data } = await this.octokit.request(
      'GET /repos/{owner}/{repo}/branches',
      {
        owner,
        repo,
        headers: { authorization: `token ${githubToken}` },
      },
    );

    return data;
  }
}
