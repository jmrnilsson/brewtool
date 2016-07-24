#!/bin/sh
rm -rf ./client/bower_components
rm -rf ./client/node_modules
rm -rf ./client/lib
rm -rf ./node_modules
(cd client; npm install; mkdir lib; curl -OL https://raw.githubusercontent.com/mtrpcic/pathjs/master/path.min.js; mv path.min.js ./lib/; curl -OL https://raw.githubusercontent.com/grofit/knockout.chart/master/src/knockout.chart.js; mv knockout.chart.js ./lib/)
npm install
