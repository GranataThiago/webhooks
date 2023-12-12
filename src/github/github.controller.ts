import { Body, Controller, Headers, Post } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubBody } from 'src/interfaces/github.interface';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post()
  webhookHandler(
    @Headers('x-github-event') githubEvent: string,
    @Body() body: GithubBody,
  ) {
    this.githubService.notify(githubEvent, body);
    return { githubEvent };
  }
}
