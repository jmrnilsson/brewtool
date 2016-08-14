######################################################
## Defaults
######################################################

SHELL=bash

######################################################
## Setup
######################################################

.PHONY: setup lint

setup: client/packages.old lint

client/packages.old:
	npm install
	# npm outdated
	cp -f ./package.json ./client/packages.old
	cp -f ./node_modules/jquery/dist/jquery.min.js ./client/libs/
	cp -f ./node_modules/knockout/build/output/knockout-latest.js ./client/libs/
	cp -f ./node_modules/text/text.js ./client/libs/
	cp -f ./node_modules/socket.io-client/socket.io.js ./client/libs/
	cp -f ./node_modules/toastr/toastr.js ./client/libs/
	cp -f ./node_modules/toastr/build/toastr.min.css ./client/libs/
	cp -f ./node_modules/d3/build/d3.min.js ./client/libs/
	cp -f ./node_modules/c3/c3.min.js ./client/libs/
	cp -f ./node_modules/c3/c3.min.css ./client/libs/
	curl -OL https://raw.githubusercontent.com/mtrpcic/pathjs/master/path.min.js;
	mv path.min.js ./client/libs/
	cp -rf ./node_modules/bootstrap/dist ./client/libs/bootstrap
	cp -f ./node_modules/requirejs/require.js ./client/libs/
	cp -f ./node_modules/jquery/dist/jquery.min.js ./client/libs/


lint:
	@ echo "Running linter"
	@ ./node_modules/.bin/eslint ./ --ext .js

######################################################
## Testing
######################################################

.PHONY: test test-unit

test: test-unit

test-unit: setup
	@ echo "Running unit tests"
	@ ./node_modules/.bin/eslint ./ --ext .js

######################################################
## Running
######################################################

.PHONY: run, frun, fake-run

run: setup
	@ echo "Starting daemon"
	@ node ./daemon.js

frun: setup
	@ echo "Starting fake daemon"
	@ node ./fdaemon.js

fake-run: frun
