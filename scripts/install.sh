#!/usr/bin/env bash

if [ ! -d "code" ]; then
    echo "Execute script from project root!"
    exit
fi

echo "Installing concurrently npm package..."
npm install -g concurrently

echo "Installing dependencies for API..."
cd ./code/api/ && npm i && cd ../..
echo "Installing dependencies for Web App..."
cd ./code/web-app/ && npm i && cd ../..

