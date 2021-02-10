#!/usr/bin/env node
const { shell, run, hasCra } = require('@lskjs/cli-utils')

const main = async () => {
  await shell('rm -rf release build node_modules');
  await shell('mkdir -p build');
  await shell('npm i');
  await shell('mkdir -p node_modules');
  await shell('cp -R package.json package-lock.json build');
  if (hasCra()) {
    await shell('lsk run bootstrap:cra');
  }
  if (process.env.NODE_ENV !== 'production') {
    await shell('lsk run npm:update:check');
    await shell('lsk run bootstrap:nodemodules');
  }
};

run(main);
