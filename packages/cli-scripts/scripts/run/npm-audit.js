#!/usr/bin/env node
const { run, shell, lernaParallel } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('npm audit fix');
  await lernaParallel(`exec --no-bail -- npm audit fix`);
};

run(main);
