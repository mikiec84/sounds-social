#!/usr/bin/env bash

# Outputs malicious packages beneath directory if found
find . -type d -maxdepth 4 -name node_modules -print0 | xargs -0 -L1 sh -c 'cd "$0/.." && pwd && npm ls 2>/dev/null | grep -E "babelcli|crossenv|cross-env.js|d3.js|fabric-js|ffmepg|gruntcli|http-proxy.js|jquery.js|mariadb|mongose|mssql.js|mssql-node|mysqljs|nodecaffe|nodefabric|node-fabric|nodeffmpeg|nodemailer-js|nodemailer.js|nodemssql|node-opencv|node-opensl|node-openssl|noderequest|nodesass|nodesqlite|node-sqlite|node-tkinter|opencv.js|openssl.js|proxy.js|shadowsock|smb|sqlite.js|sqliter|sqlserver|tkinter"'

cd code/api/ && npm run deploy-dev
cd ../../code/web/ && npm run deploy-dev
