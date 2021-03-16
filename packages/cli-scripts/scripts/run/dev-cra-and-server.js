#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`${findBin('lerna')} exec -- lsk run dev:cra-and-server`);
};

run(main);
