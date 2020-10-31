#!/bin/bash

cd /home/ubuntu/deploy

npm install

pm2 restart app.js