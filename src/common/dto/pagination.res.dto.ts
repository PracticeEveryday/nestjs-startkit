import { Exclude, Expose } from 'class-transformer';

class PaginationMetaData {
  @Exclude() private readonly _pageNo: number;
  @Exclude() private readonly _pageSize: number;
  @Exclude() private readonly _totalCount: number;
  @Exclude() private readonly _totalPage: number;

  constructor(params: { pageNo: number; pageSize: number; totalCount: number; totalPage: number }) {
    this._pageNo = params.pageNo;
    this._pageSize = params.pageSize;
    this._totalCount = params.totalCount;
    this._totalPage = params.totalPage;
  }

  @Expose()
  get pageNo() {
    return this._pageNo;
  }

  @Expose()
  get pageSize() {
    return this._pageSize;
  }

  @Expose()
  get totalCount() {
    return this._totalCount;
  }

  @Expose()
  get totalPage() {
    return this._totalPage;
  }
}

export class PaginationResDto<T> {
  @Exclude() private readonly _metaData: PaginationMetaData;
  @Exclude() private readonly _data: T;

  constructor(info: { pageNo: number; pageSize: number; totalCount: number; totalPage: number; data: T }) {
    const { pageNo, pageSize, totalPage, totalCount, data } = info;

    this._metaData = new PaginationMetaData({ pageNo, pageSize, totalPage, totalCount });
    this._data = data;
  }

  @Expose()
  get metaData(): PaginationMetaData {
    return this._metaData;
  }

  @Expose()
  get data() {
    return this._data;
  }
}
