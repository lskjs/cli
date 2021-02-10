#!/usr/bin/env node
const { shell } = require('@lskjs/cli-utils');
const { run } = require('@lskjs/cli-utils');

const main = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await shell(`ncu -l error --dep=prod,dev,peer,optional`, { cwd: 'cra' });
  }
  await shell('npm i', { cwd: 'cra' });
};

run(main);
