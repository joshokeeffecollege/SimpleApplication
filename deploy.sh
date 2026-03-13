#!/usr/bin/env bash
set -e

sudo apt update
sudo apt install -y curl

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install -g pm2

cd ~/SimpleApplication

npm install

pm2 stop SimpleApplication || true
pm2 delete SimpleApplication || true

pm2 start ./bin/www --name SimpleApplication
pm2 save