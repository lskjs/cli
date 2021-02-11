#!/usr/bin/env node
const { hasCra, run, shell } = require('@lskjs/cli-utils')

const main = async () => {
  if (hasCra()) {
    await shell('lsk run dev:cra-and-server');
  } else {
    await shell('lsk run watch');
  }
};

run(main);
