#!/usr/bin/env node
const { run, findBin, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await require('../package/update-contributors');
  await shell(`${findBin('lerna')} exec --parallel -- lsk run update:contributors`);
};

run(main);
