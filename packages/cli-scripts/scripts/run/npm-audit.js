#!/usr/bin/env node
const { run, shell, lerna } = require('@lskjs/cli-utils');

const main = async () => {
  await shell('npm audit fix');
  await lerna(`exec --parallel --no-bail -- npm audit fix`);
};

run(main);
