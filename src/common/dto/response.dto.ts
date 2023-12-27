import { HttpStatus } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @Exclude() private readonly _statusCode: HttpStatus;
  @Exclude() private readonly _data: T;
  @Exclude() private readonly _message: string = '';

  constructor(status: HttpStatus, options?: { data?: T; message?: string }) {
    this._statusCode = status;

    if (options && options.data) this._data = options?.data;
    if (options && options.message) this._message = options?.message;
  }

  static OK<T>(data?: T, message?: string): ResponseDto<T> {
    return new ResponseDto<T>(HttpStatus.OK, { data, message });
  }

  static CREATED<T>(data?: T, message?: string): ResponseDto<T> {
    return new ResponseDto<T>(HttpStatus.CREATED, { data, message });
  }

  @Expose()
  get statusCode(): HttpStatus {
    return this._statusCode;
  }

  @Expose()
  get message(): string | undefined {
    return this._message;
  }

  @Expose()
  get data(): T | undefined {
    return this._data;
  }
}
