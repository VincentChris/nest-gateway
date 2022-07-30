import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map, switchMap } from 'rxjs';
import {
  UserDataFeishu,
  UserInfoFeishu,
} from '../feishu/dto/user-token-feishu.dto';
import { FeishuService } from '../feishu/feishu.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private feishuService: FeishuService
  ) {}

  getFeishuInfoByCode(code: string) {
    return this.feishuService.getFeishuUserInfoByCode(code).pipe(
      map<UserDataFeishu, UserInfoFeishu>((userinfo) => {
        const {
          access_token,
          avatar_big,
          avatar_middle,
          avatar_thumb,
          avatar_url,
          email,
          en_name,
          mobile,
          name,
          user_id,
          union_id,
        } = userinfo;
        return {
          access_token,
          avatar_big,
          avatar_middle,
          avatar_thumb,
          avatar_url,
          email,
          en_name,
          mobile,
          name,
          feishuUserId: user_id,
          feishuUnionId: union_id,
        };
      })
    );
  }

  validateFeishuUser(code: string) {
    this.getFeishuInfoByCode(code).pipe(
      switchMap((userInfo) => this.userService.createOrSaveByFeishu(userInfo))
    );
  }

  login(user) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
