#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`${findBin('lerna')} exec --parallel -- lsk run build`);
};

run(main);
