#!/usr/bin/env node
const { shell, run } = require('@lskjs/cli-utils');

const main = async () => {
  if (process.env.NODE_ENV === 'production') {
    await shell('npm ci --loglevel=error');
  } else {
    await shell('npm i --loglevel=error');
  }
};

run(main);
