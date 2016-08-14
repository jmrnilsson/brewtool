######################################################
## Defaults
######################################################

SHELL=bash

######################################################
## Setup
######################################################

.PHONY: setup lint

setup: package.json lint

package.json:
	@ npm install
	@ npm outdated
	@ cp package.json packages.001

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

restore: setup
	@ echo "Restoring"
	@ . venv/bin/activate; ./beerestore.py