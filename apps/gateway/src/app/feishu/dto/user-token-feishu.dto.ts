export interface UserDataFeishu {
  access_token: string;
  token_type: string;
  expires_in: number;
  name: string;
  en_name: string;
  avatar_url: string;
  avatar_thumb: string;
  avatar_middle: string;
  avatar_big: string;
  open_id: string;
  union_id: string;
  email: string;
  enterprise_email: string;
  user_id: string;
  mobile: string;
  tenant_key: string;
  refresh_expires_in: number;
  refresh_token: string;
}
export interface UserInfoFeishu {
  access_token: UserDataFeishu['access_token'];
  avatar_big: UserDataFeishu['avatar_big'];
  avatar_middle: UserDataFeishu['avatar_middle'];
  avatar_thumb: UserDataFeishu['avatar_thumb'];
  avatar_url: UserDataFeishu['avatar_url'];
  email: UserDataFeishu['access_token'];
  en_name: UserDataFeishu['en_name'];
  mobile: UserDataFeishu['access_token'];
  name: UserDataFeishu['name'];
  feishuUserId: UserDataFeishu['user_id'];
  feishuUnionId: UserDataFeishu['union_id'];
}
export interface UserTokenFeishu {
  code: number;
  msg: string;
  data: UserDataFeishu;
}
