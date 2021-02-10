#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell } = require('@lskjs/cli/utils');

const main = async () => {
  await shell('npm audit fix');
  await shell('lerna exec --parallel --no-bail -- npm audit fix');
};

run(main);
