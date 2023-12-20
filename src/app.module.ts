import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './libs/log/log.module';
import { LogInterceptor } from './common/interceptor/log.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/httpException.filter';

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

@Module({
  imports: [LogModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ...interceptors, ...filters],
})
export class AppModule {}
