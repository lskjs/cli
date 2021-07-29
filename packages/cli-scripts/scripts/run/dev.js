#!/usr/bin/env node
const { run, lernaParallel } = require('@lskjs/cli-utils');

// @TODO: extract env file
const main = async () => {
  await lernaParallel(`exec --no-bail --no-prefix -- npm run dev`);
};

run(main);
