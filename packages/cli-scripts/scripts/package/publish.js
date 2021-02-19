#!/usr/bin/env node
const { run, shell } = require("@lskjs/cli-utils");

const main = async () => {
  await shell(`rm -rf release/package.json release/package-lock.json`);
  await shell(`cp package.json package-lock.json  release `);
  await shell(`npm publish release/`);
};

run(main);
