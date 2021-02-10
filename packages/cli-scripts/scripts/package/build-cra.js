#!/usr/bin/env node
/* eslint-disable no-console */

const { shell } = require('@lskjs/cli/utils')
const { run } = require('@lskjs/cli/utils')

const main = async () => {
  await shell('rm -rf cra/src');
  await shell('ln -s src cra/src');
  await shell('CI=false SKIP_PREFLIGHT_CHECK=true npm run build', { cwd: 'cra' });
  console.log('OK - cra build');
  await shell('mkdir -p public');
  await shell(`rsync -aEp cra/build/* public/`);
  await shell(`lsk run build:cra:extract`);
};

run(main);
