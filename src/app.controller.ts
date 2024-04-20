import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { ResponseDto } from './common/dto/response.dto';
import { TestApiDto } from './common/dto/testApi.dto';
import { TestListQueryDto } from './common/dto/testListApi.dto';
import { toPagination } from './common/helper/pagination.helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): ResponseDto<TestApiDto> {
    return ResponseDto.OK<TestApiDto>(this.appService.getHello());
  }

  @Get('/list')
  getHelloList(@Query() queryDto: TestListQueryDto) {
    const data = this.appService.getHello();
    return toPagination<TestApiDto>({ queryDto, data, totalCount: 1 });
  }
}
