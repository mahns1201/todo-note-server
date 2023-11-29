import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Octokit } from 'octokit';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,

    private httpService: HttpService,
  ) {}

  async getProjectsFromGithub(githubAccessToken, username) {
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    const query = `query ($owner: String!, $pV2Number: Int!) {
      user(login: $owner) {
        projectsV2(first: $pV2Number) {
          totalCount
          nodes {
            id
            title
            number
          }
        }
      }
      }`;

    const items = await octokit.graphql<{
      user: {
        projectsV2: {
          nodes: {
            id: string;
            title: string;
            number: string;
          };
        };
      };
    }>(query, { owner: username, pV2Number: 20 });

    return { items };
  }

  async getProjectFromGithub(githubAccessToken, username, pV2Number) {
    const octokit = new Octokit({
      auth: githubAccessToken,
    });

    const query = `query ($owner: String!, $pV2Number: Int!) {
      user(login: $owner) {
        projectV2(number: $pV2Number) {
          id
          title
          number
          url
        }
      }
    }`;

    // projectV2
    // field(name:"Status"){
    //   __typename
    //   ... on ProjectV2SingleSelectField{
    //   id
    //   options{
    //     id
    //     name
    //   }
    //   }
    // }

    const item = await octokit.graphql<{
      user: {
        projectV2: {
          id: string;
        };
      };
    }>(query, { owner: username, pV2Number });

    return { item };
  }
}
