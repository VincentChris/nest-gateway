import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeishuModule } from './feishu/feishu.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    FeishuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
