#!/usr/bin/env bash

if [ ! -d "code" ]; then
    echo "Execute script from project root!"
    exit
fi

echo "Installing concurrently npm package..."
npm install -g concurrently

echo "Installing dependencies for app..."
cd ./code/api/ && npm i && cd ../..

