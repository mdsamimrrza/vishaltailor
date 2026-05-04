#!/bin/sh
set -eu

concurrently -n frontend,api -c cyan,magenta "pnpm --filter @workspace/vishal-tailors dev" "pnpm --filter @workspace/api-server dev"