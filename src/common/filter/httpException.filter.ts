import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LogService } from '../../libs/log/log.service';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseException } from './exception/base.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logService: LogService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(error: unknown, host: ArgumentsHost): any {
    const exception = (() => {
      if (error instanceof BaseException) {
        return error;
      }

      if (error instanceof HttpException) {
        return new BaseException({
          message: error.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          stack: error.stack,
        });
      }
    })();

    this.logService.error('error', exception);

    this.httpAdapterHost.httpAdapter.reply(
      (() => host.switchToHttp().getResponse())(),
      exception.getResponse(),
      exception.getStatus(),
    );
  }
}
