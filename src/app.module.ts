import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationException } from './common/filter/exception/validation.exception';
import { HttpExceptionFilter } from './common/filter/httpException.filter';
import { LogInterceptor } from './common/interceptor/log.interceptor';
import { EnvModule } from './libs/env/env.module';
import { LogModule } from './libs/log/log.module';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LogInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
];

const filters = [{ provide: APP_FILTER, useClass: HttpExceptionFilter }];

const pipes = [
  {
    provide: APP_PIPE,
    useFactory: () =>
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => {
          throw new ValidationException(errors);
        },
      }),
  },
];
@Module({
  imports: [LogModule.forRoot(), EnvModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ...interceptors, ...filters, ...pipes],
})
export class AppModule {}
