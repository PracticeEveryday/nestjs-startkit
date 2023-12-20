import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseException } from './common/filter/exception/base.exception';
import { TestDto } from './test.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/a/:test/:testt')
  getHello(@Param() dto: TestDto) {
    return dto;
    // return this.appService.getHello();
  }

  @Get('/error')
  getError() {
    throw new BaseException({
      message: '에러 메시지입니다.',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
