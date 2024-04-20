import { Exclude, Expose } from 'class-transformer';

export class TestApiDto {
  @Exclude() private readonly _hello: string;

  constructor(hello: string) {
    this._hello = hello;
  }

  @Expose()
  get hello(): string {
    return this._hello;
  }
}
