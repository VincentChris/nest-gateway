import dayjs = require('dayjs');

export const getLogConfig = (
  levels: Array<
    'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent'
  >
) => {
  return levels
    .map((level) => [
      {
        level: level,
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: true,
          messageFormat: '{levelLabel} - {pid} - url:{req.url}',
          translateTime: 'yyyy-dd-mm h:MM:ss',
        },
      },
      {
        level: level,
        target: 'pino-pretty',
        options: {
          colorize: true,
          levelFirst: true,
          messageFormat: '{levelLabel} - {pid} - url:{req.url}',
          translateTime: 'yyyy-dd-mm h:MM:ss',
          destination: `${process.cwd()}/logs/gateway/${level}/${dayjs().format(
            'YYYY-MM-DD'
          )}.log`,
          mkdir: true,
          append: true,
        },
      },
    ])
    .reduce((pre, cur) => pre.concat(cur), []);
};
