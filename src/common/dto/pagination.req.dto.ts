import { IsOptionalNumber } from '../decorator/isOptionalNumber.decorator';

export class PaginationQueryDto {
  @IsOptionalNumber('pageNo', 0)
  public pageNo: number;

  @IsOptionalNumber('pageSize', 0)
  public pageSize: number;

  constructor(pageNo: number, pageSize: number) {
    this.pageNo = pageNo;
    this.pageSize = pageSize;
  }
}
