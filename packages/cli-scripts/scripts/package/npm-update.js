#!/usr/bin/env node
const { run, getLskConfig, shell, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  const config = getLskConfig();
  const ncu = (config && config.ncu) || {};
  const packages = ncu.packages || '/^@(lskjs)/.*$/';
  try {
    const params = [`--dep=${ncu.dep || 'prod,dev,peer,optional'}`, ncu.newest ? '--target newest' : ''].join(' ');
    await shell(`${findBin('ncu')} -u -l error -e 2 ${params} "${packages}"`, { fatal: 0, error: 0 });
  } catch (err) {
    if (err.code === 1) {
      await shell(`lsk run npm:install`);
      return;
    }
    throw err;
  }
};

run(main);
