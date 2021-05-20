#!/usr/bin/env node
const { run, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  await require('../package/update-readme');
  await lerna(`exec --parallel -- lsk run update:readme`);
};

run(main);
