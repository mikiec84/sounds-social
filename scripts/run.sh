#!/usr/bin/env bash

if [ ! -d "code" ]; then
    echo "Execute script from project root!"
    exit
fi

concurrently "cd code/api && npm run dev" "cd code/web-app && npm run dev"
