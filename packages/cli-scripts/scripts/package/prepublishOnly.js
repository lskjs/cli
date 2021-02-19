#!/usr/bin/env node
const { run, shell } = require("@lskjs/cli-utils");

const main = async () => {
  await shell(
    `mkdir -p release && rm -rf release/package.json release/package-lock.json && cp package.json package-lock.json release`
  );
};

run(main);
