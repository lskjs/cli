#!/usr/bin/env node
const { run, shell, findBin } = require("@lskjs/cli-utils");

const main = async () => {
  await shell(`${findBin("lerna")} -v`);
};

run(main);
