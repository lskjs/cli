#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell } = require('@lskjs/cli/utils');

const main = async () => {
  await shell('lerna exec -- npm run dev:server')
};

run(main);