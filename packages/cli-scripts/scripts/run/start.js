#!/usr/bin/env node
const { run, lerna } = require('@lskjs/cli-utils');

// @TODO: extract env file
const main = async () => {
  await lerna(`exec --parallel --no-prefix -- npm run start`);
};

run(main);
