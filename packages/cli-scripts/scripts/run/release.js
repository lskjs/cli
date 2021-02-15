#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell, findBin } = require("@lskjs/cli-utils");

const main = async ({ argv } = {}) => {
  const args = argv.join(" ");
  await shell(`DIST=release lsk run build`);
  await shell(`${findBin("lerna")} publish --exact --contents release ${args}`);
  await shell("lsk run release:after");
};

run(main);
