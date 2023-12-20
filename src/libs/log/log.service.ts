import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';

@Injectable()
export class LogService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  debug(label: string, message: string, data: any = {}): void {
    this.logger.debug({ message, ...data }, label);
  }

  info(label: string, message: string, data: any = {}): void {
    this.logger.log({ message, ...data }, label);
  }

  error(label: string, error: Error): void {
    this.logger.error(
      error.name,
      [error.message, error.stack].join('\n'),
      label,
    );
  }
}
