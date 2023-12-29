# nestjs-startkit

## Description

-   TypeScript Nestjs 프레임워크를 사용하여 서버를 바로 실행시키는 Startkit입니다.

### npx

-   `npx nestjs-startkit [repoName]`
    -   링크: https://www.npmjs.com/package/nestjs-startkit

### git clone

-   dev

1. git clone https://github.com/PracticeEveryday/nestjs-startkit.git
2. cd nestjs-startkit
3. yarn install 
4. .env.local 파일 생성 (각 환경에 맞는 .env를 만들어 줍니다. ex) .env.dev, .env.qa...)
```
// .env.local
PORT=8080

SWAGGER_USER=user
SWAGGER_PASSWORD=password
```
5. yarn start:local

## Test API
### 스웨거 링크 http://localhost:8080/api  

-   `GET /`

```json
{
  "message": "",
  "data": {
    "hello": "Hello World!"
  }
}
```

**Error Test**

-   `GET /warn`

```json
{
  "data": {
    "message": "못 찾았어요!"
  }
}
```
