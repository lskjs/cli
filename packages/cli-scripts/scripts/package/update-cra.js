#!/usr/bin/env node
const { run, shell, findPath, packagePath } = require('@lskjs/cli-utils');

const main = async () => {
  const paths = [
    'scripts/assets/cra/package.json',
    'scripts/assets/cra/package-lock.json',
    'scripts/assets/cra/config-overrides.js',
  ]
    .map(findPath)
    .join(' ');

  await shell(`rsync -aEp ${paths} ${packagePath('cra')}`);
  await shell(`rsync -aEp ${findPath('scripts/assets/cra/public')} ${packagePath('cra/public')}`);
  await shell(`rsync -aEp ${findPath('scripts/assets/cra/public/index.html')} ${packagePath('cra/public/index.html')}`);
};
run(main);
