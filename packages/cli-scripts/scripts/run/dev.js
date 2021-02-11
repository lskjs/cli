#!/usr/bin/env bash
const { run, shell } = require("@lskjs/cli-utils");

// @TODO: extract env file
const main = async () => {
  await shell(`lerna exec --parallel --no-prefix -- npm run dev`);
};

run(main);
