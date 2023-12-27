import { Injectable } from '@nestjs/common';
// import { ServiceResultDto } from 'src/common/common.dto';
import { Octokit } from 'octokit';
import { REQUEST_INFO } from 'src/common/request-url';
import { UserService } from 'src/user/user.service';

async function callGitHubApi(endpoint: string, params: object, token: string) {
  try {
    console.log({ endpoint });
    console.log({ params });
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

  // UserService에서 처리하는게 좋을 경우 제거
  // async getGithubAccessToken(input) {
  //   const { id } = input;
  //   const { item: user } = await this.userService.findOne({ id });

  //   return { item: user?.githubAccessToken };
  // }

  async findRepos(input) {
    const { githubAccessToken, username } = input;

    const repos = await callGitHubApi(
      `GET /user/repos`,
      username,
      githubAccessToken,
    );

    return { items: repos };
  }

  async findOneRepo(input) {
    const { githubAccessToken, username, name } = input;

    const repo = await callGitHubApi(
      `GET /repos/${username}/${name}`,
      username,
      githubAccessToken,
    );

    return { item: repo };
  }

  // async createRepos(input) {
  //   const { githubAccessToken } = input;
  //   const octokit = new Octokit({
  //     auth: githubAccessToken,
  //   });

  //   const { data: result } = await octokit.request('Post /user/repos', {
  //     ...input,
  //   });

  //   return result;
  // }

  async findMilestones(input) {
    // findSprints를 하기보단 github용어에 맞추어서 변수명 작성
    // 여기는 왜 username으로 되어있을까?

    const { githubAccessToken, username, name } = input;

    const milestones = await callGitHubApi(
      `GET /repos/${username}/${name}/milestones`,
      { owner: username },
      githubAccessToken,
    );

    return { items: milestones };
  }

  async findOneMilestone(input) {
    const { githubAccessToken, username, name, number } = input;

    const milestone = await callGitHubApi(
      `GET /repos/${username}/${name}/milestones/${number}`,
      { owner: username },
      githubAccessToken,
    );

    return { item: milestone };
  }

  async findIssues(input) {
    const { githubAccessToken, username, name } = input;

    const issues = await callGitHubApi(
      `GET /repos/${username}/${name}/issues`,
      { owner: username },
      githubAccessToken,
    );

    return { items: issues };
  }

  async findOneIssue(input) {
    const { githubAccessToken, username, name, number } = input;

    const issue = await callGitHubApi(
      `GET /repos/${username}/${name}/issues/${number}`,
      { owner: username },
      githubAccessToken,
    );

    return { item: issue };
  }
}
