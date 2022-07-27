import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeishuModule } from './feishu/feishu.module';
import { UserModule } from './user/user.module';
import configuration from '../config/configuration';
import { IEnvConfig } from '../interface';

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
    CacheModule.register({
      isGlobal: true,
    }),
    FeishuModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
