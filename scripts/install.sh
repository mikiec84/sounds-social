#!/usr/bin/env bash
npm install
cd code/api/ && npm install
cd ../../code/web/ && npm install
npm install -g concurrently
npm install -g release
