import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseException } from './common/filter/exception/base.exception';
import { NotFoundException } from './common/filter/exception/notFound.exception';
import { MethodEnum, Route } from './common/decorator/router.decorator';
import { ResponseDto } from './common/dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Route({
    request: { method: MethodEnum.GET },
    response: { code: HttpStatus.OK },
  })
  getHello(): ResponseDto<string> {
    return ResponseDto.OK<string>(this.appService.getHello());
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
