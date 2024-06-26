import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { ErrorTypeEnum } from '../../enum/errorType.enum';

export class NotFoundException extends BaseException {
  constructor(param: { message: string }) {
    super({
      message: param.message,
      statusCode: HttpStatus.NOT_FOUND,
      errorType: ErrorTypeEnum.WARN,
    });
  }
}
