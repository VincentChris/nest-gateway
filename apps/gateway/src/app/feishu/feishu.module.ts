import { Module } from '@nestjs/common';
import { FeishuService } from './feishu.service';
import { FeishuController } from './feishu.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [FeishuController],
  providers: [FeishuService],
})
export class FeishuModule {}
