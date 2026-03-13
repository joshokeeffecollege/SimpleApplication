#!/usr/bin/env bash
set -e

sudo apt-get update
sudo apt-get install -y curl

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo npm install -g pm2

cd ~/SimpleApplication

if [ ! -f privatekey.pem ] || [ ! -f server.crt ]; then
  echo "HTTPS certificate files are missing."
  exit 1
fi

chmod 600 privatekey.pem
chmod 644 server.crt

npm install

pm2 stop SimpleApplication || true
pm2 delete SimpleApplication || true
pm2 start ./bin/www --name SimpleApplication
pm2 save