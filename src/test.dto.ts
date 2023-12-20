import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class TestDto {
  @IsNumber({}, { message: '숫자만 들어와야 합니다.' })
  @Type(() => Boolean)
  @IsNotEmpty()
  @Expose()
  test: number;

  @IsNumber({}, { message: '숫자만 들어와야 합니다.' })
  @Type(() => Number)
  @IsNotEmpty()
  @Expose()
  testt: number;
}
