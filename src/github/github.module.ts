import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [GithubController],
  providers: [GithubService],
  imports: [ConfigModule],
})
export class GithubModule {}
