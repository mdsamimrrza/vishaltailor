@echo off
setlocal
set PORT=26170
set BASE_PATH=/
pnpm --filter @workspace/vishal-tailors run dev
