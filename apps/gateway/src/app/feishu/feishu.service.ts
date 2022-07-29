import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { IEnvConfig } from '../../interface';
import { AppTokenFeishu } from './dto/app-token-feishu.dto';
import { CreateFeishuDto } from './dto/create-feishu.dto';
import { FeishuMessageDto } from './dto/feishu-message.dto';
import { UpdateFeishuDto } from './dto/update-feishu.dto';
import { UserTokenFeishu } from './dto/user-token-feishu.dto';

@Injectable()
export class FeishuService {
  private readonly FEISHU_APP_ID: string;
  private readonly FEISHU_APP_SECRET: string;
  private readonly FEISHU_URL: string;
  private readonly APP_TOKEN_CACHE_KEY: string;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {
    const {
      FEISHU_APP_ID,
      FEISHU_APP_SECRET,
      FEISHU_URL,
      APP_TOKEN_CACHE_KEY,
    } = this.configService.get<IEnvConfig['FEISHU_CONFIG']>('FEISHU_CONFIG');
    this.FEISHU_APP_ID = FEISHU_APP_ID;
    this.FEISHU_APP_SECRET = FEISHU_APP_SECRET;
    this.FEISHU_URL = FEISHU_URL;
    this.APP_TOKEN_CACHE_KEY = APP_TOKEN_CACHE_KEY;
  }

  getAppToken() {
    return from(this.cacheManager.get<string>(this.APP_TOKEN_CACHE_KEY)).pipe(
      switchMap((token) => {
        if (!token) {
          return this.httpService
            .post<AppTokenFeishu>(
              `${this.FEISHU_URL}/auth/v3/app_access_token/internal`,
              {
                app_id: this.FEISHU_APP_ID,
                app_secret: this.FEISHU_APP_SECRET,
              }
            )
            .pipe(
              map(({ data }) => {
                this.cacheManager.set(
                  this.APP_TOKEN_CACHE_KEY,
                  data.app_access_token,
                  {
                    ttl: data.expire - 60,
                  }
                );
                return data.app_access_token;
              })
            );
        }
        return of(token);
      })
    );
  }

  getUserToken(code: string) {
    return this.getAppToken().pipe(
      switchMap((app_token) =>
        this.httpService
          .post<UserTokenFeishu>(
            `${this.FEISHU_URL}/authen/v1/access_token`,
            { grant_type: 'authorization_code', code },
            {
              headers: {
                Authorization: `Bearer ${app_token}`,
              },
            }
          )
          .pipe(map((res) => res.data))
      )
    );
  }

  sendMessage({ receive_id_type, ...params }: FeishuMessageDto) {
    return this.getAppToken().pipe(
      switchMap((token) =>
        this.httpService
          .post(`${this.FEISHU_URL}/im/v1/messages`, params, {
            params: { receive_id_type },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .pipe(
            catchError((err) => {
              return of(err);
            }),
            map((res) => res.data)
          )
      )
    );
  }

  create(createFeishuDto: CreateFeishuDto) {
    return 'This action adds a new feishu';
  }

  findAll() {
    return `This action returns all feishu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feishu`;
  }

  update(id: number, updateFeishuDto: UpdateFeishuDto) {
    return `This action updates a #${id} feishu`;
  }

  remove(id: number) {
    return `This action removes a #${id} feishu`;
  }
}
