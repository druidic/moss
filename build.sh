#!/usr/bin/env bash -eEu

which jasmine || npm install --global jasmine

mkdir -p .build_tmp

cat $(find src -name '*.js') $(find test -name '*.js') \
  > .build_tmp/test.js

jasmine .build_tmp/test.js
