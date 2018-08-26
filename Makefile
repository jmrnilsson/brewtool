######################################################
## Defaults
######################################################

SHELL=bash

######################################################
## Setup
######################################################

.PHONY: setup lint clean

clean:
	@ rm -rf ./node_modules
	@ rm -rf ./client/libs
	@ mkdir -p ./client/libs

setup: lint package

package: client/package.old

client/package.old: package.json
	@ npm install
	@ npm outdated
	mkdir -p ./client/libs
	cp -f ./node_modules/jquery/dist/jquery.min.js ./client/libs/
	cp -f ./node_modules/knockout/build/output/knockout-latest.js ./client/libs/
	cp -f ./node_modules/text/text.js ./client/libs/
	cp -f ./node_modules/socket.io-client/dist/socket.io.js ./client/libs/
	cp -f ./node_modules/toastr/toastr.js ./client/libs/
	cp -f ./node_modules/toastr/build/toastr.min.css ./client/libs/
	cp -f ./node_modules/d3/d3.min.js ./client/libs/
	cp -rf ./node_modules/c3 ./client/libs/c3
	curl -OL https://raw.githubusercontent.com/mtrpcic/pathjs/master/path.min.js;
	mv path.min.js ./client/libs/
	cp -rf ./node_modules/bootstrap/dist ./client/libs/bootstrap
	cp -f ./node_modules/requirejs/require.js ./client/libs/
	cp -f ./node_modules/jquery/dist/jquery.min.js ./client/libs/
	cp -f package.json ./client/packages.old



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
	@ node ./fakeDaemon.js

fake-run: frun
