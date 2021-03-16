#!/usr/bin/env node
const { run, findBin, shell } = require('@lskjs/cli-utils');

const main = async () => {
  await require('../package/update-readme');
  await shell(`${findBin('lerna')} exec --parallel -- lsk run update:readme`);
};

run(main);
