interface Data {
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

export interface UserTokenFeishu {
  code: number;
  msg: string;
  data: Data;
}
