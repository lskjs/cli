#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`lsk run update:contributors`);
  await shell(`lsk run update:readme`);
  await shell(`${findBin('lerna')} exec --parallel -- lsk run update`);
};

run(main);
