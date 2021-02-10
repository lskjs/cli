#!/usr/bin/env node

const { shell } = require('@lskjs/cli-utils');
const { run, getLskConfig } = require('@lskjs/cli-utils');

const config = getLskConfig();

const main = async () => {
  const ncu = (config && config.ncu) || {};
  const packages = ncu.packages || '/^@(lskjs)/.*$/';
  try {
    const params = [`--dep=${ncu.dep || 'prod,dev,peer,optional'}`, ncu.newest ? '--target newest' : ''].join(' ');
    await shell(`ncu -u -l error -e 2 ${params} "${packages}"`);
  } catch (err) {
    if (err.code === 1) {
      await shell(`npm install`);
      return;
    }
    throw err;
  }
};

run(main);
