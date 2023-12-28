import { Injectable } from '@nestjs/common';
// import { ServiceResultDto } from 'src/common/common.dto';
import { Octokit } from 'octokit';
import { REQUEST_INFO } from 'src/common/request-url';
import { UserService } from 'src/user/user.service';

async function callGitHubApi(endpoint: string, params: object, token: string) {
  try {
    const octokit = new Octokit({ auth: token });
    const { data: result } = await octokit.request(endpoint, {
      ...params,
      headers: {
        'X-GitHub-Api-Version': REQUEST_INFO.GITHUB.API_VERSION,
      },
    });
    return result;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
}

@Injectable()
export class GithubService {
  constructor(private userService: UserService) {}
  // ********** github **********

  /**
   * @param input githubAccessToken, username
   */
  async findRepos(input) {
    const { githubAccessToken, username } = input;

    const repos = await callGitHubApi(
      `GET /user/repos`,
      username,
      githubAccessToken,
    );

    return { items: repos };
  }

  /**
   * @param input githubAccessToken, username, repoName
   */
  async findOneRepo(input) {
    const { githubAccessToken, username, repoName } = input;
    const repo = await callGitHubApi(
      `GET /repos/${username}/${repoName}`,
      username,
      githubAccessToken,
    );

    return { item: repo };
  }

  /**
   * @param input githubAccessToken, repoName, description
   */
  async createRepo(input) {
    const { githubAccessToken, repoName, description } = input;
    const createdRepo = await callGitHubApi(
      `Post /user/repos`,
      { repoName, description },
      githubAccessToken,
    );

    return { item: createdRepo };
  }

  /**
   * @param input githubAccessToken, username, repoName
   */
  async findMilestones(input) {
    // findSprints를 하기보단 github용어에 맞추어서 변수명 작성

    const { githubAccessToken, username, repoName } = input;

    const milestones = await callGitHubApi(
      `GET /repos/${username}/${repoName}/milestones`,
      { owner: username },
      githubAccessToken,
    );

    return { items: milestones };
  }

  /**
   * @param input githubAccessToken, username, repoName, number
   */
  async findOneMilestone(input) {
    const { githubAccessToken, username, repoName, number } = input;

    const milestone = await callGitHubApi(
      `GET /repos/${username}/${repoName}/milestones/${number}`,
      { owner: username },
      githubAccessToken,
    );

    return { item: milestone };
  }

  /**
   * @param input githubAccessToken, username, repoName, title, description
   */
  async createMilestone(input) {
    const { githubAccessToken, username, repoName, title, description } = input;
    const createdMilestone = await callGitHubApi(
      `Post /repos/${username}/${repoName}/milestones`,
      { title, description },
      githubAccessToken,
    );

    return { item: createdMilestone };
  }

  /**
   * @param input githubAccessToken, username, repoName
   */
  async findIssues(input) {
    const { githubAccessToken, username, repoName } = input;

    const issues = await callGitHubApi(
      `GET /repos/${username}/${repoName}/issues`,
      { owner: username },
      githubAccessToken,
    );

    return { items: issues };
  }

  /**
   * @param input githubAccessToken, username, repoName, number
   */
  async findOneIssue(input) {
    const { githubAccessToken, username, repoName, number } = input;

    const issue = await callGitHubApi(
      `GET /repos/${username}/${repoName}/issues/${number}`,
      { owner: username },
      githubAccessToken,
    );

    return { item: issue };
  }

  /**
   * @param input githubAccessToken, username, repoName, title, description
   */
  async createIssue(input) {
    const { githubAccessToken, username, repoName, title, description } = input;

    const createdIssue = await callGitHubApi(
      `Post /repos/${username}/${repoName}/issues`,
      { title, body: description },
      githubAccessToken,
    );

    return { item: createdIssue };
  }
}
