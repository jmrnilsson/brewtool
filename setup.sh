#!/bin/sh
rm -rf ./client/node_modules
rm -rf ./client/lib
rm -rf ./node_modules
(cd client; \
npm install; \
mkdir lib;  \
curl -OL https://raw.githubusercontent.com/mtrpcic/pathjs/master/path.min.js;  \
mv path.min.js ./lib/;)
npm install
