#!/usr/bin/env node
const { run, shell } = require("@lskjs/cli-utils");

// @TODO: extract env file
const main = async () => {
  await shell(`lerna exec --parallel --no-prefix -- npm run start`);
};

run(main);
