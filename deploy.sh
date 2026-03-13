#!/usr/bin/env bash
set -e

cd ~/SimpleApplication

npm install

pm2 stop SimpleApplication || true
pm2 delete SimpleApplication || true
pm2 start ./bin/www --name SimpleApplication
pm2 save