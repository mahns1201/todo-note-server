import { Injectable } from '@nestjs/common';
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

  // ********** Repositories **********
  /**
   * @param input.githubAccessToken - GitHub 토큰
   * @param input.username - GitHub 사용자의 이름
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
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - 찾으려는 Repo의 이름
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
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.repoName - 생성하려는 Repo의 이름
   * @param {string} input.description - 생성하려는 Repo의 설명
   * @param {string} input.otherFields - 그 외에 들어올 수 있는 값들
   */
  async createRepo(input) {
    const { githubAccessToken, repoName, description, ...otherFields } = input;
    const createdRepo = await callGitHubApi(
      `Post /user/repos`,
      { repoName, description, ...otherFields },
      githubAccessToken,
    );

    return { item: createdRepo };
  }

  /**
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - 수정할 리포의 이름
   * @param {string} input.updateRepoName - 수정하려는 리포의 이름
   * @param {string} input.updateDescription - 수정하려는 리포의 설명
   * @param {string} input.otherFields - 그 외에 들어올 수 있는 값들
   */
  async updateRepo(input) {
    const {
      githubAccessToken,
      username,
      repoName,
      updateRepoName,
      updateDescription,
      ...otherFields
    } = input;
    const updatedRepo = await callGitHubApi(
      `PATCH /repos/${username}/${repoName}`,
      { name: updateRepoName, description: updateDescription, ...otherFields },
      githubAccessToken,
    );

    return { item: updatedRepo };
  }

  /**
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - 삭제할 리포의 이름
   */
  async deleteRepo(input) {
    const { githubAccessToken, username, repoName } = input;
    const deletedRepo = await callGitHubApi(
      `DELETE /repos/${username}/${repoName}`,
      {},
      githubAccessToken,
    );

    return { item: deletedRepo };
  }
  // ********** Milestones **********

  /**
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - Milestion이 위치한 Repo의 이름
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
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - Milestone이 위치한 리포의 이름
   * @param {string} input.number - 찾으려는 Milestone의 number
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
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - 수정할 Repo의 이름
   * @param {string} input.title - 생성하려는 Milestone 이름
   * @param {string} input.description - 생성하려는 Milestone 설명
   * @param {string} input.otherFields - 그 외에 들어올 수 있는 값들
   */
  async createMilestone(input) {
    const {
      githubAccessToken,
      username,
      repoName,
      title,
      description,
      ...otherFields
    } = input;
    const createdMilestone = await callGitHubApi(
      `Post /repos/${username}/${repoName}/milestones`,
      { title, description, ...otherFields },
      githubAccessToken,
    );

    return { item: createdMilestone };
  }

  /**
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - Milestone이 위치한 Repo의 이름
   * @param {string} input.updateTitle - 수정하려는 Milestone의 이름
   * @param {string} input.updateDescription - 해당값으로 Milestone 설명 수정
   * @param {string} input.number - 수정하려는 Milestone의 Number
   * @param {string} input.otherFields - 그 외에 들어올 수 있는 값들
   */
  async updateMilestone(input) {
    const {
      githubAccessToken,
      username,
      repoName,
      updateTitle,
      updateDescription,
      number,
      ...otherFields
    } = input;
    const updatedMilestone = await callGitHubApi(
      `PATCH /repos/${username}/${repoName}/milestones/${number}`,
      { title: updateTitle, description: updateDescription, ...otherFields },
      githubAccessToken,
    );

    return { item: updatedMilestone };
  }

  /**
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - Milestone이 위치한 Repo의 이름
   * @param {string} input.number - 삭제하려는 Milestone의 Number
   */
  async deleteMilestone(input) {
    const { githubAccessToken, username, repoName, number } = input;
    const deletedMilestone = await callGitHubApi(
      `DELETE /repos/${username}/${repoName}/milestones/${number}`,
      {},
      githubAccessToken,
    );

    return { item: deletedMilestone };
  }

  // ********** Issues **********

  /**
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - 찾으려는 Issue가 위치한 Repo의 이름
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
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - 찾으려는 Issue가 위치한 Repo의 이름
   * @param {string} input.number - 찾으려는 Issue의 Number
   * @param {string} input.otherFields - 그 외에 들어올 수 있는 값들
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
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - 생성하려는 Issue가 위치한 Repo의 이름
   * @param {string} input.title - 생성하려는 Issue의 이름
   * @param {string} input.description - 생성하려는 Issue의 설명
   * @param {string} input.otherFields - 그 외에 들어올 수 있는 값들
   */
  async createIssue(input) {
    const {
      githubAccessToken,
      username,
      repoName,
      title,
      description,
      ...otherFields
    } = input;

    const createdIssue = await callGitHubApi(
      `Post /repos/${username}/${repoName}/issues`,
      { title, body: description, ...otherFields },
      githubAccessToken,
    );

    return { item: createdIssue };
  }

  /**
   * @param {Object} input
   * @param {string} input.githubAccessToken - GitHub 토큰
   * @param {string} input.username - GitHub 사용자의 이름
   * @param {string} input.repoName - 수정하려는 Issue가 위치한 Repo의 이름
   * @param {string} input.updateTitle - 해당 값으로 Issue 제목 수정
   * @param {string} input.updateDescription - 해당 값으로 Issue 설명 수정
   * @param {string} input.number - 수정하려는 Issue의 Number
   * @param {string} input.otherFields - 그 외에 들어올 수 있는 값들
   */
  async updateIssue(input) {
    const {
      githubAccessToken,
      username,
      repoName,
      updateTitle,
      updateDescription,
      number,
      ...otherFields
    } = input;
    const updatedIssue = await callGitHubApi(
      `PATCH /repos/${username}/${repoName}/issues/${number}`,
      { title: updateTitle, description: updateDescription, ...otherFields },
      githubAccessToken,
    );

    return { item: updatedIssue };
  }
}
