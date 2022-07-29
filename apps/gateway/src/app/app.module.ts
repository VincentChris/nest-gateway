import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeishuModule } from './feishu/feishu.module';
import { UserModule } from './user/user.module';
import configuration from '../config/configuration';
import { IEnvConfig } from '../interface';
import { LoggerModule } from 'nestjs-pino';
import { getLogConfig } from '../utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { HOST, PORT, DATA_BASE } =
          configService.get<IEnvConfig['MONGO_CONFIG']>('MONGO_CONFIG');
        return {
          type: 'mongodb',
          host: HOST,
          port: PORT,
          database: DATA_BASE,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { HOST, PORT, DATA_BASE } =
          configService.get<IEnvConfig['REDIS_CONFIG']>('REDIS_CONFIG');
        return {
          store: redisStore,
          host: HOST,
          port: PORT,
          db: DATA_BASE,
        };
      },
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'gateway',
        transport: {
          targets: getLogConfig([
            'fatal',
            'error',
            'warn',
            'info',
            'debug',
            'trace',
          ]),
        },
      },
    }),
    FeishuModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
