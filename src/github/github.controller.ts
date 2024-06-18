import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github/backdoor')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  async backdoor() {
    return 'ok';
  }
}
