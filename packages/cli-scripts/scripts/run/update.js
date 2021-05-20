#!/usr/bin/env node
const { run, shell, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`lsk run update:contributors`);
  await shell(`lsk run update:readme`);
  await lerna(`exec --parallel -- lsk run update`);
};

run(main);
