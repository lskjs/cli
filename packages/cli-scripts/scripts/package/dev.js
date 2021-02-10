#!/usr/bin/env node
const { shell } = require('@lskjs/cli-utils')
const { hasCra, run } = require('@lskjs/cli-utils')

const main = async () => {
  if (hasCra()) {
    await shell('lsk run dev:cra-and-server');
  } else {
    await shell('lsk run watch');
  }
};

run(main);
