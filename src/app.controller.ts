import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseException } from './common/filter/exception/base.exception';
import { NotFoundException } from './common/filter/exception/notFound.exception';
import { ResponseDto } from './common/dto/response.dto';
import { TestApiDto } from './common/dto/testApi.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOkResponse({ type: TestApiDto })
  getHello(): ResponseDto<TestApiDto> {
    return ResponseDto.OK<TestApiDto>(this.appService.getHello());
  }

  @Get('/error')
  getError() {
    throw new BaseException({
      message: '에러 메시지입니다.',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  @Get('/warn')
  getWarn() {
    throw new NotFoundException({
      message: '못 찾았어요!',
    });
  }
}
