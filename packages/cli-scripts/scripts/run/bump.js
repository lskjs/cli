#!/usr/bin/env node
const { run, lernaParallel } = require('@lskjs/cli-utils');

const main = async () => {
  await lernaParallel(`exec --no-bail -- lsk run bump`);
};

run(main);
