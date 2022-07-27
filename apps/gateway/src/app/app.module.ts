import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeishuModule } from './feishu/feishu.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '106.15.62.53',
      port: 27017,
      database: 'fast_gateway_test',
      synchronize: true,
      autoLoadEntities: true,
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
