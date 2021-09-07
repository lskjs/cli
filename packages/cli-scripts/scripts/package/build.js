#!/usr/bin/env node
const { shell, hasCra, run } = require('@lskjs/cli-utils');
const { hasTsHere } = require('../utils');

const main = async () => {
  if (hasTsHere()) {
    await shell('lsk run build:ts');
  } else {
    await shell('lsk run build:js');
  }
  if (hasCra()) {
    await shell('lsk run build:cra');
  }
};

run(main);
