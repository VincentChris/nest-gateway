import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';
import { IEnvConfig } from '../../interface';
import { AppTokenFeishu } from './dto/app-token-feishu.dto';
import { CreateFeishuDto } from './dto/create-feishu.dto';
import { UpdateFeishuDto } from './dto/update-feishu.dto';

@Injectable()
export class FeishuService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {}
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

  getAppToken() {
    const { FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_URL } =
      this.configService.get<IEnvConfig['FEISHU_CONFIG']>('FEISHU_CONFIG');
    return this.httpService
      .post<AppTokenFeishu>(`${FEISHU_URL}/auth/v3/app_access_token/internal`, {
        app_id: FEISHU_APP_ID,
        app_secret: FEISHU_APP_SECRET,
      })
      .pipe(map((res) => res.data));
  }
}
