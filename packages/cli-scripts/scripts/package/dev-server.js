#!/usr/bin/env node

const { run, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(`${findBin('nodemon')} --delay 0.5 index.server.js`);
};

run(main);