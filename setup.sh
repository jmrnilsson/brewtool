#!/bin/sh
rm -rf ./client/bower_components
rm -rf ./node_modules
(cd client; npm install)
npm install
