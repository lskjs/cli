#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell } = require('@lskjs/cli/utils');

const main = async () => {
  await shell('lsk run lerna exec -- lsk run dev:cra-and-server');
};

run(main);
