#!/usr/bin/env node
const { run, lernaParallel } = require('@lskjs/cli-utils');

const main = async () => {
  await require('../package/update-readme');
  await lernaParallel(`exec --no-bail -- lsk run update:readme`);
};

run(main);
