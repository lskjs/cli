#!/usr/bin/env node

const { run, shell } = require("@lskjs/cli-utils");

const main = async () => {
  await shell("nodemon --delay 0.5 index.server.js");
};

run(main);
