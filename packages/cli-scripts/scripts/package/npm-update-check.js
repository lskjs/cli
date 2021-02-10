#!/usr/bin/env node

const { shell } = require('@lskjs/cli/utils')
const { run } = require('@lskjs/cli/utils')

const main = async () => {
  await shell(`ncu -l error --dep=prod,dev,peer,optional`);
};

run(main);
