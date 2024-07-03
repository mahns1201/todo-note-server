import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {
  private readonly octokit: Octokit;

  constructor() {
    this.octokit = this.createOctokitInstance();
  }

  private createOctokitInstance() {
    return new Octokit({});
  }

  async callGitHubApi(url: string, githubToken: string, params?: object) {
    try {
      const { data } = await this.octokit.request(url, {
        ...params,
        headers: {
          authorization: `token ${githubToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      return data;
    } catch (error) {
      Logger.error(error.message, error.stack, 'GithubService.callGitHubApi');
      throw error;
    }
  }

  async getProfile(githubToken: string) {
    return await this.callGitHubApi('GET /user', githubToken);
  }

  async getEmail(githubToken: string) {
    const { data } = await this.octokit.request('GET /user/emails', {
      headers: { authorization: `token ${githubToken}` },
    });

    return data.filter((item) => item.primary).map((item) => item.email)[0];
  }

  async getRepos(githubToken: string) {
    return await this.callGitHubApi('GET /user/repos', githubToken);
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

  async getMilestones(githubToken: string, owner: string, repo: string) {
    return this.callGitHubApi(
      `GET /repos/${owner}/${repo}/milestones`,
      githubToken,
      { owner },
    );
  }

  async getIssues(githubToken: string, owner: string, repo: string) {
    return this.callGitHubApi(
      `GET /repos/${owner}/${repo}/issues`,
      githubToken,
      { owner },
    );
  }
}
