import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppTokenFeishu } from './dto/app-token-feishu.dto';
import { CreateFeishuDto } from './dto/create-feishu.dto';
import { UpdateFeishuDto } from './dto/update-feishu.dto';

@Injectable()
export class FeishuService {
  constructor(private readonly httpService: HttpService) {}
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
    return this.httpService
      .post<AppTokenFeishu>(
        `${environment.FEISHU_CONFIG.FEISHU_URL}/auth/v3/app_access_token/internal`,
        {
          app_id: environment.FEISHU_CONFIG.FEISHU_APP_ID,
          app_secret: environment.FEISHU_CONFIG.FEISHU_APP_SECRET,
        }
      )
      .pipe(map((res) => res.data));
  }
}
