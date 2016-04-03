#!/bin/sh
./node_modules/.bin/eslint ./ --ext .js && node ./fdeamon.js
