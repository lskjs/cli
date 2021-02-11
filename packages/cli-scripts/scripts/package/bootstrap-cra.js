#!/usr/bin/env node
const { shell, run, isDebug } = require('@lskjs/cli-utils');

const main = async () => {
  if (isDebug()) {
    await shell(`ncu -l error --dep=prod,dev,peer,optional`, { cwd: 'cra' });
  }
  await shell('lsk run npm:install', { cwd: 'cra' });
};

run(main);
