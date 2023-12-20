import { HttpException } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';

export class BaseException extends HttpException {
  @Exclude() private _statusCode: number;
  @Exclude() private _stack?: string;

  constructor(param: { message: string; statusCode: number; stack?: string }) {
    super(param.message, param.statusCode);
    this.statusCode = param.statusCode;
    param.stack && (this.stack = param.stack);
  }

  getResponse() {
    return {
      statusCode: this.statusCode,
      data: {
        message: this.message,
      },
    };
  }

  @Expose()
  get statusCode(): number {
    return this._statusCode;
  }

  @Expose()
  get stack(): string {
    return this._stack;
  }

  set statusCode(value: number) {
    this._statusCode = value;
  }

  set stack(value: string) {
    this._stack = value;
  }
}
