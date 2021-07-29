#!/usr/bin/env node
const { run, lernaParallel } = require('@lskjs/cli-utils');

const main = async () => {
  await require('../package/update-contributors');
  await lernaParallel(`exec --no-bail -- lsk run update:contributors`);
};

run(main);
