#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell, findBin } = require("@lskjs/cli-utils");

const main = async () => {
  await shell(`${findBin("lerna")} publish --skip-npm --exact`);
  await shell("lsk run release:after");
};

run(main);
