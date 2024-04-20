import { DynamicModule, Module } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

import { LogService } from './log.service';

const winstonOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env['NODE_ENV'] === 'prod' ? 'http' : 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('Server', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
};

@Module({
  imports: [WinstonModule.forRoot(winstonOptions)],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: LogModule,
    };
  }
}
