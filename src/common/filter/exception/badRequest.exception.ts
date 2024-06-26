import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { ErrorTypeEnum } from '../../enum/errorType.enum';

export class BadRequestException extends BaseException {
  constructor(param: { message: string }) {
    super({
      message: param.message,
      statusCode: HttpStatus.BAD_REQUEST,
      errorType: ErrorTypeEnum.WARN,
    });
  }
}
