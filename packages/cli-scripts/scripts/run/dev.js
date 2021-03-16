#!/usr/bin/env node
const { run, shell, findBin } = require('@lskjs/cli-utils');

// @TODO: extract env file
const main = async () => {
  await shell(`${findBin('lerna')} exec --parallel --no-prefix -- npm run dev`);
};

run(main);
