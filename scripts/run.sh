#!/usr/bin/env bash
concurrently "cd code/api && npm run dev" "cd code/web && npm run dev"
