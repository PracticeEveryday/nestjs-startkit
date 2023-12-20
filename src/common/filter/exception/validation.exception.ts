import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(errors: ValidationError[]) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: errors
        .map((error, idx) => {
          console.log(error);
          const { property, value, constraints } = error;
          return `[property: ${property}, value: ${value}] ${Object.values(
            constraints,
          )
            .map((value) => value)
            .join(` + `)}`;
        })
        .join(` && `),
      stack: new Error(JSON.stringify(errors)).stack,
    });
  }
}
