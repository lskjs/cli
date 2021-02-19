#!/usr/bin/env node
const { run, shell, findBin } = require("@lskjs/cli-utils");

const main = async () => {
  console.log("husky-pre-commit");
  await shell(`ls`);
};

run(main);
