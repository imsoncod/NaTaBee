#!/bin/bash

cd /home/ubuntu/deploy

npm install

pm2 start app.js