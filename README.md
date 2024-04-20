# nestjs-startkit

The nestjs-startkit was created to automatically build the basic structure of the nestjs framework.

### npx

-   `npx nestjs-startkit [repoName]`
    -   link: https://www.npmjs.com/package/nestjs-startkit

### git clone

-   dev

1. git clone https://github.com/PracticeEveryday/nestjs-startkit.git
2. cd nestjs-startkit
3. yarn install 
4. make `.env.local` file

```
// .env.local
PORT=8080
```
5. yarn start:local

## Test API 

-   `GET /`

```json
{
  "message": "",
  "data": {
    "hello": "Hello World!"
  }
}
```
