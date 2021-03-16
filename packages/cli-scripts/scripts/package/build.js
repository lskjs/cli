#!/usr/bin/env node
const { shell, hasCra, run } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('lsk run build:js');
  if (hasCra()) {
    await shell('lsk run build:cra');
  }
};

run(main);
