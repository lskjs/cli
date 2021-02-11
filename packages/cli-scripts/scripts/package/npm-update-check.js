#!/usr/bin/env node

const { run, shell } = require('@lskjs/cli-utils')

const main = async () => {
  await shell(`ncu -l error --dep=prod,dev,peer,optional`);
};

run(main);
