import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './libs/log/log.module';
import { LogInterceptor } from './common/interceptor/log.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

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

@Module({
  imports: [LogModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ...interceptors],
})
export class AppModule {}
