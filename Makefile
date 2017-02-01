BIN = ./node_modules/.bin
TESTS = $(shell find ./src -name '*-test.js')
SRC = $(shell find ./src -name '*.js')
LIB = $(SRC:./src/%=lib/%)

build:: $(LIB)

build-test:: build
	@$(BIN)/mochify \
		--phantomjs $(BIN)/phantomjs \
		$(TESTS:./src/%=./lib/%)

test::
	@$(BIN)/mochify \
		--transform [ babelify --presets=latest,stage-0 ] \
		--phantomjs $(BIN)/phantomjs \
		$(TESTS)

lint::
	@$(BIN)/eslint $(SRC)

release-patch: build lint
	@$(call release,patch)

release-minor: build lint
	@$(call release,minor)

release-major: build lint
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	npm publish

lib/%.js: src/%.js
	@echo "building $@"
	@mkdir -p $(@D)
	@$(BIN)/babel --presets=latest,stage-0 --source-maps-inline -o $@ $<

clean:
	@rm -rf lib/

define release
	npm version $(1)
endef
