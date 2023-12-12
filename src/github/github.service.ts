import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GithubBody } from 'src/interfaces/github.interface';

@Injectable()
export class GithubService {
  constructor(private configService: ConfigService) {}

  async notify(event: string, githubBody: GithubBody) {
    const { sender, action, repository } = githubBody;
    const body = {
      content: `${sender.login} just ${action || ''} ${event} to ${
        repository.html_url
      }`,
    };

    const resp = await fetch(
      this.configService.get<string>('DISCORD_WEBHOOK_URL'),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    if (!resp.ok) {
      console.log('Error while sending Discord Message');
      return false;
    }

    return true;
  }
}
