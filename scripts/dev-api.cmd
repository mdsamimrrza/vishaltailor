@echo off
setlocal
set PORT=3000
set NODE_ENV=development
pnpm --filter @workspace/api-server run build
if errorlevel 1 exit /b %errorlevel%
node artifacts\api-server\dist\index.mjs
