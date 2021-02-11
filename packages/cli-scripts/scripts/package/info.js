#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell } = require("@lskjs/cli-utils");

const main = async () => {
  await shell("lsk info");
};

run(main);
