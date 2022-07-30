export const environment = {
  production: false,
  FEISHU_CONFIG: {
    FEISHU_URL: 'https://open.feishu.cn/open-apis',
    FEISHU_API_HOST: 'https://open.feishu.cn',
    FEISHU_APP_ID: 'cli_a24010a4b138d013',
    FEISHU_APP_SECRET: 'U1hhN1orP7VBLv1fTXVCicp5BdCkL0g6',
    APP_TOKEN_CACHE_KEY: 'APP_TOKEN_CACHE_KEY',
    USER_TOKEN_CACHE_KEY: 'USER_TOKEN_CACHE_KEY',
    REFRESH_TOKEN_CACHE_KEY: 'REFRESH_TOKEN_CACHE_KEY',
  },
  MONGO_CONFIG: {
    HOST: '106.15.62.53',
    PORT: 27017,
    DATA_BASE: 'fast_gateway_test',
  },
  REDIS_CONFIG: {
    HOST: '106.15.62.53',
    PORT: 6379,
    DATA_BASE: 1,
  },
};
