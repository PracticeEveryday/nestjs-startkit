import {
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  applyDecorators,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type RouteProps<T> = {
  request: {
    path?: string;
    method: MethodEnum;
    headers?: string[];
  };
  response: {
    type?: T;
    isArray?: boolean;
    description?: string;
    code: HttpStatus.OK | HttpStatus.CREATED | HttpStatus.NO_CONTENT;
  };
  summary?: string;
  description?: string;
};

export function Route<T extends string | Function>({
  request,
  response,
  summary,
  description,
}: RouteProps<T>) {
  const conditionDecorator: (
    | ClassDecorator
    | MethodDecorator
    | PropertyDecorator
  )[] = [];

  if (request && request.headers) {
    request.headers.forEach((key) => {
      conditionDecorator.push(
        ApiHeader({
          required: true,
          name: key,
        }),
      );
    });
  }

  switch (response.code) {
    case HttpStatus.OK:
      conditionDecorator.push(
        ApiOkResponse({
          description: response.description ?? `${request.method} 요청 응답`,
          type: response.type,
          isArray: response.isArray,
        }),
      );
      break;
    case HttpStatus.CREATED:
      conditionDecorator.push(
        ApiCreatedResponse({
          description: response.description ?? `${request.method} 요청 응답`,
          type: response.type,
          isArray: response.isArray,
        }),
      );
      break;
    case HttpStatus.NO_CONTENT:
      conditionDecorator.push(
        ApiNoContentResponse({
          description:
            response.description ?? `${request.method} 요청 응답 대기 후 진행`,
        }),
      );
      break;
  }

  let methodDecorator: (path?: string | string[]) => MethodDecorator;
  switch (request.method) {
    case MethodEnum.GET:
      methodDecorator = Get;
      break;
    case MethodEnum.POST:
      methodDecorator = Post;
      break;
    case MethodEnum.PUT:
      methodDecorator = Put;
      break;
    case MethodEnum.PATCH:
      methodDecorator = Patch;
      break;
    case MethodEnum.DELETE:
      methodDecorator = Delete;
      break;
  }

  return applyDecorators(
    ...conditionDecorator,
    methodDecorator(request.path),
    ApiOperation({ summary, description }),
  );
}
